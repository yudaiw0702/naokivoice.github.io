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

          console.log(res)

          let x = i - 1;

          console.log(res[x]);
          
          if(res[x] == "あ" || "か" || "さ" || "た" || "な" || "は" || "ま" || "や" || "ら" || "わ"){
            list = "./mp3/naokiroid/あー.mp3";
          }else if(res[x] == "い" || "き" || "し" || "ち" || "に" || "ひ" || "み" || "い" || "り"){
            list = "./mp3/naokiroid/いー.mp3";
          }else if(res[x] == "う" || "く" || "す" || "つ" || "ぬ" || "ふ" || "む" || "ゆ" || "る"){
            list = "./mp3/naokiroid/うー.mp3";
          }else if(res[x] == "え" || "け" || "せ" || "て" || "ね" || "へ" || "め" || "え" || "れ"){
            list = "./mp3/naokiroid/えー.mp3";
          }else if(res[x] == "お" || "こ" || "そ" || "と" || "の" || "ほ" || "も" || "よ" || "ろ" || "を"){
            list = "./mp3/naokiroid/おー.mp3";
          }
        }
        
        audioElem.src = list; 
        console.log(list); 
        audioElem.play();
        setTimeout(function(){doSomethingLoop(maxCount, ++i)}, textspeed);
      }
    }
    
    doSomethingLoop(res.length, 0);
  })
})