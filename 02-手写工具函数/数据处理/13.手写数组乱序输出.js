function shuffle(arr) {
  for (let i = 0; i < arr.length; i++) {
    const randomIndex = Math.floor(Math.random() * (arr.length - 1));
    [arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]];
  }
  return arr;
}

console.log(shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));
