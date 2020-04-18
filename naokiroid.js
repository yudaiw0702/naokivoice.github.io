$(document).ready(function () {
  $("#Button1").click(function () {
    inputText = $("#Text1").val();
    textspeed = $("#Text2").val();

    let res = inputText.split("");

    function doSomethingLoop(maxCount, i) {
      if (i <= maxCount) {
        let audioElem = new Audio();
        let list = "./mp3/naokiroid/"+res[i]+".m4a";
        audioElem.src = list;  
        audioElem.play();
        setTimeout(function(){doSomethingLoop(maxCount, ++i)}, textspeed);
      }
    }
    
    doSomethingLoop(res.length, 0);
  })

  //devaice select

  // Peer object
  const peer = new Peer({
    key:   '8f63227b-b9a8-4ac9-af19-203ebbacea1c',
    debug: 3,
  });

  let localStream;
  let existingCall;
  let selectors;

  function step1() {
    // Get audio/video stream
    const audioSource = $('#audioSource').val();
    const videoSource = $('#videoSource').val();
    const audioDevice = $('#audioDevice').val();
    const constraints = {
      audio: {deviceId: audioSource ? {exact: audioSource} : undefined},
      video: {deviceId: videoSource ? {exact: videoSource} : undefined},
    };

    navigator.mediaDevices.getUserMedia(constraints).then(stream => {
      $('#my-video').get(0).srcObject = stream;
      localStream = stream;

      if(selectors === undefined) {
          // set up audio and video input/output selectors
          const audioSelect = $('#audioSource');
          const videoSelect = $('#videoSource');
          const audioDeviceSelect = $('#audioDevice');
          selectors = [audioSelect, videoSelect, audioDeviceSelect];
          navigator.mediaDevices.enumerateDevices()
          .then(deviceInfos => {
            const values = selectors.map(select => select.val() || '');
            selectors.forEach(select => {
              const children = select.children(':first');
              while (children.length) {
                select.remove(children);
              }
            });
      
            for (let i = 0; i !== deviceInfos.length; ++i) {
              const deviceInfo = deviceInfos[i];
              const option = $('<option>').val(deviceInfo.deviceId);
      
              if (deviceInfo.kind === 'audioinput') {
                option.text(deviceInfo.label ||
                  'Microphone ' + (audioSelect.children().length + 1));
                audioSelect.append(option);
              } else if (deviceInfo.kind === 'videoinput') {
                option.text(deviceInfo.label ||
                  'Camera ' + (videoSelect.children().length + 1));
                videoSelect.append(option);
              } else if (deviceInfo.kind === 'audiooutput') {
                option.text(deviceInfo.label ||
                  'Output device ' + (audioDeviceSelect.children().length + 1));
                audioDeviceSelect.append(option);             
              }
            }
      
            selectors.forEach((select, selectorIndex) => {
              if (Array.prototype.slice.call(select.children()).some(n => {
                return n.value === values[selectorIndex];
              })) {
                select.val(values[selectorIndex]);
              }
            });
            
            videoSelect.on('change', step1);
            audioSelect.on('change', step1);
            audioDeviceSelect.on('change', step1);
          });
      }

      if (existingCall) {
        existingCall.replaceStream(stream);
        return;
      }

      step2();
    }).catch(err => {
      $('#step1-error').show();
      console.error(err);
    });

    if(audioDevice){
      $('#their-video').get(0).setSinkId(audioDevice);
    }

  }

  function step2() {
    $('#step1, #step3').hide();
    $('#step2').show();
    $('#callto-id').focus();
  }

  function step3(call) {
    // Hang up on an existing call if present
    if (existingCall) {
      existingCall.close();
    }
    // Wait for stream on the call, then set peer video display
    call.on('stream', stream => {
      const el = $('#their-video').get(0);
      el.srcObject = stream;
      el.play();
    });

    // UI stuff
    existingCall = call;
    $('#their-id').text(call.remoteId);
    call.on('close', step2);
    $('#step1, #step2').hide();
    $('#step3').show();
  }
})