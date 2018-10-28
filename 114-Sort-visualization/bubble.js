function bubbleSort() {
  for (var i = 0; i < elements.length - 1; i++) {
    if (elements[i] > elements[i + 1]) {
      swap(i, i + 1);
      return;
    }
  }

  console.log("DONE!");
  stop();
}
