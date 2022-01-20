function blocksGen(amount) {
  let a = [];
  for (let i = 0; i < 11; i++) {
    const o = {
    };
    ['gym', 'store', 'pool', 'office', 'school'].forEach((s) => {
      const r = Math.random();
      if (r < 0.5) {
        o[s] = true;
      }
      else {
        o[s] = false;
      }
    });
    a.push(o);
  }
  return a;
}

console.log(blocksGen(11));