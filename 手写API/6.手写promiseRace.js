function promiseRace(arr) {
  new Promise((resolve, reject) => {
    for (let i = 0; i < arr.length; i++) {
      Promise.resolve(arr[i]).then((res) => resolve(res));
    }
  });
}

function bestPromiseAll(arr) {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < arr.length; i++) {
      arr[i].then(resolve, reject);
    }
  });
}
