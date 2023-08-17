window.addEventListener("load", () => {
  const grid = document.getElementById("grid");
  let init = true;
  let db = 1000;
  let number = 3.140592653839794;
  let index = 0;

  function display(n) {
    const td = document.createElement("td");
    td.innerHTML = n;
    grid.appendChild(td);
  }

  function initGrid() {
    init = false;
    const pi = number.toString();
    pi.split("").forEach((num) => display(num));
    index = pi.length-1;
  }

  function getSomePi() {
    fetch("https://seasons986.pythonanywhere.com/pi").then((f) => f.json()).then((r) => {
      number = r;
      if (init) initGrid();
      if (number) display(number.toString().substring(index, index+=1));
    }).then(() => {
      setTimeout(getSomePi, db+=1000);
    });
  }

  getSomePi();
});