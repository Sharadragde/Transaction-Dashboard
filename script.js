let data = [];
const totalSales = document.getElementById("total-sales");
const totalSoldItem = document.getElementById("sold-item");
const totalNotSold = document.getElementById("not-sold-item");
var monthTwo = document.getElementById("month-name");

fetch("file.json")
  .then(function (responce) {
    return responce.json();
  })

  .then(function (products) {
    data = products;
    showData(products);
  });

const input = document.getElementById("month");

function handleChange() {
  const filteredData = data.filter((item) => {
    let price = item.price + "";
    return (
      item.title.includes(input.value) ||
      item.description.includes(input.value) ||
      price.includes(input.value)
    );
  });

  showData(filteredData);

  input.value = "";
}

function showData(products) {
  let placeholder = document.querySelector(".data-output");

  out = "";

  for (let product of products) {
    out += `
         
                   <tr>
                        <td>${product.id}</td>
                        <td>${product.title}</td>
                        <td>${product.price}</td>
                        <td>${product.description}</td>
                        <td>${product.category}</td>
                        <td><img src="${product.image}"></td>
                        <td>${product.sold}</td>
                        <td>${product.dateOfSale}</td>
                    </tr>
            `;
  }
  placeholder.innerHTML = out;
  changeTrue();
  AddPrice();
  displayBarData();
  trackRecord();
}

var monthSelect = document.getElementById("monthSelect");

function monthChange() {
  const filteredDataNew = data.filter((item) => {
    let dateOfSale = item.dateOfSale + "";

    return item.dateOfSale.includes(monthSelect.value);
  });

  showData(filteredDataNew);
  AddPrice();
  displayBarData();
  trackRecord();
}

function changeTrue() {
  var tables = document.getElementById("my-table");

  for (var i = 1; i < tables.rows.length; i++) {
    var cell = tables.rows[i].cells[6];

    if (cell.textContent === "true") {
      cell.textContent = "Yes";
    } else if (cell.textContent === "false") {
      cell.textContent = "No";
    }
  }
}

function AddPrice() {
  var tables = document.getElementById("my-table");
  var sum = 0;
  for (var i = 1; i < tables.rows.length; i++) {
    var cell = tables.rows[i].cells[2].textContent;
    sum += parseFloat(cell);
  }
  totalSales.innerText = sum;
}

function trackRecord() {
  var tables = document.getElementById("my-table");
  var pn = 0;
  var rn = 0;
  for (var i = 1; i < tables.rows.length; i++) {
    var cell = tables.rows[i].cells[6].textContent;

    if (cell === "Yes") {
      pn++;
    } else if (cell === "No") {
      rn++;
    }
  }
  totalSoldItem.innerText = pn;
  totalNotSold.innerText = rn;
}

function displayBarData() {
  var tables = document.querySelector("#my-table");
  let a = 0;
  let b = 0;
  let c = 0;
  let d = 0;
  let e = 0;
  let f = 0;
  let g = 0;
  let h = 0;
  let j = 0;
  let k = 0;

  for (var i = 1; i < tables.rows.length; i++) {
    var cell = tables.rows[i].cells[2].textContent;

    if (cell <= 100) {
      a = Number(a + 1);
    } else if (cell <= 200) {
      b = Number(b + 1);
    } else if (cell <= 300) {
      c = Number(c + 1);
    } else if (cell <= 400) {
      d = Number(d + 1);
    } else if (cell <= 500) {
      e = Number(e + 1);
    } else if (cell <= 600) {
      f = Number(f + 1);
    } else if (cell <= 700) {
      g = Number(g + 1);
    } else if (cell <= 800) {
      h = Number(h + 1);
    } else if (cell <= 900) {
      j = Number(j + 1);
    } else {
      k = Number(k + 1);
    }
  }

  const yValues = [];
  yValues.push(a, b, c, d, e, f, g, h, j, k);

  const xValues = [
    "0-100",
    "100-200",
    "200-300",
    "300-400",
    "400-500",
    "500-600",
    "600-700",
    "700-800",
    "800-900",
    "900-above",
  ];

  const barColors = [
    "#4CC9FE",
    "#4CC9FE",
    "#4CC9FE",
    "#4CC9FE",
    "#4CC9FE",
    "#4CC9FE",
    "#4CC9FE",
    "#4CC9FE",
    "#4CC9FE",
    "#4CC9FE",
  ];

  new Chart("myChart", {
    type: "bar",
    data: {
      labels: xValues,
      datasets: [
        {
          backgroundColor: barColors,
          data: yValues,
        },
      ],
    },

    options: {
      legend: { display: false },
      title: {
        display: true,
        text: "Statisticsof Products",
      },
    },
  });
}
