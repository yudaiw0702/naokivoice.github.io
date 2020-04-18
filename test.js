function doSomethingLoop(maxCount, i) {
  if (i <= maxCount) {
    console.log("あ")
    setTimeout(function(){doSomethingLoop(maxCount, ++i)}, 1000);
  }
}

doSomethingLoop(10, 0);