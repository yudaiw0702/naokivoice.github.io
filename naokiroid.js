$(document).ready(function () {
  $("#Button1").click(function () {
    inputText = $("#Text1").val();
    textspeed = $("#Text2").val();

    let res = inputText.split("");

    function doSomethingLoop(maxCount, i) {
      if (i <= maxCount) {
        let audioElem = new Audio();

        let list = "./mp3/naokiroid/"+res[i]+".mp3";

        if (res[i] == "ー"){
          
          if(res[i-1] == "あ" || "か" || "さ" || "た" || "な" || "は" || "ま" || "や" || "ら" || "わ"){
            list = "./mp3/naokiroid/あー.mp3";
          }else if(res[i-1] == "い" || "き" || "し" || "ち" || "に" || "ひ" || "み" || "い" || "り"){
            list = "./mp3/naokiroid/いー.mp3";
          }else if(res[i-1] == "う" || "く" || "す" || "つ" || "ぬ" || "ふ" || "む" || "ゆ" || "る"){
            list = "./mp3/naokiroid/うー.mp3";
          }else if(res[i-1] == "え" || "け" || "せ" || "て" || "ね" || "へ" || "め" || "え" || "れ"){
            list = "./mp3/naokiroid/えー.mp3";
          }else if(res[i-1] == "お" || "こ" || "そ" || "と" || "の" || "ほ" || "も" || "よ" || "ろ" || "を"){
            list = "./mp3/naokiroid/おー.mp3";
          }
        }
        
        audioElem.src = list;  
        audioElem.play();
        setTimeout(function(){doSomethingLoop(maxCount, ++i)}, textspeed);
      }
    }
    
    doSomethingLoop(res.length, 0);
  })
})