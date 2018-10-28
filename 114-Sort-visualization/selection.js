var selectionAlreadySortedIdx = -1;

function selectionSort() {
  var minIdx = -1;

  for (var i = selectionAlreadySortedIdx; i < elements.length; i++) {
    if (elements[i] < elements[minIdx]) {
      minIdx = i;
    }
  }

  if (selectionAlreadySortedIdx == elements.length - 1) {
    console.log("DONE!");
    stop();
    return;
  }

  swap(minIdx, selectionAlreadySortedIdx);
  selectionAlreadySortedIdx += 1;
}
