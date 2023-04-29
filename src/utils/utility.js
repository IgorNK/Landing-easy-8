function shuffle(inArray) {
  const array = inArray.slice();
  let idx = array.length;
  let randomIdx;

  while (idx != 0) {
    randomIdx = Math.floor(Math.random() * idx);
    idx -= 1;
    [array[idx], array[randomIdx]] = [array[randomIdx], array[idx]];
  }

  return array;
}

function difference(arrayA, arrayB) {
  return arrayA
    .concat(arrayB)
    .filter((item) => !arrayA.includes(item) || !arrayB.includes(item));
}

export { shuffle, difference };
