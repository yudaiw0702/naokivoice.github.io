$(document).ready(function () {
  $("#Button1").click(function () {
    inputText = $("#Text1").val();
    $("#output").text(inputText);

    let res = inputText.split("");

    /*for(let i = 0; i < res.length; i++) {
      let audioElem = new Audio();
      let list = "./mp3/naokiroid/"+res[i]+".m4a";
      $("#output").text(list);
      audioElem.src = list;  
      audioElem.play();
    }*/

    function doSomethingLoop(maxCount, i) {
      if (i <= maxCount) {
        let audioElem = new Audio();
        let list = "./mp3/naokiroid/"+res[i]+".m4a";
        $("#output").text(list);
        audioElem.src = list;  
        audioElem.play();
        setTimeout(function(){doSomethingLoop(maxCount, ++i)}, 1000);
      }
    }
    
    doSomethingLoop(res.length, 0);
  })
})