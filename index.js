window.addEventListener("load", () => {
  const grid = document.getElementById("grid");
  let db = 0;
  let index = 3;

  function display(n) {
    const td = document.createElement("td");
    td.innerHTML = n;
    grid.appendChild(td);
  }

  function initGrid() {
    fetch(`https://seasons986.pythonanywhere.com/pi`).then((r) => r.json()).then((i) => {
      if (i) index = i;
      fetch(`https://api.pi.delivery/v1/pi?start=0&numberOfDigits=${index}&radix=10`).then((f) => f.json()).then((r) => {
        if (!r || !r.content) return;
        const pi = r.content;
        pi.split("").forEach((num, _) => {
          if (_ == 1) display(".");
          display(num);
        });
        return index = pi.length-1;
      }).then(() => {
        getSomePi();
      });
    })
    
  }

  function getSomePi() {
    fetch(`https://api.pi.delivery/v1/pi?start=${index}&numberOfDigits=1&radix=10`).then((f) => f.json()).then((r) => {
      number = r.content;
      index += 1;
      if (number) display(number);
      fetch(`https://seasons986.pythonanywhere.com/pi?update=${index}`);
    }).then(() => {
      setTimeout(getSomePi, db+=1000);
    });
  }

  initGrid();
});