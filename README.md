# Currency_Converter
This is Currency Converter project made through HTML, CSS and JAVASCRIPT.






HTML Code

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Currency Converter</title>
    <link href="style.css" rel="stylesheet" />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
      integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
      crossorigin="anonymous"
      referrerpolicy="no-referrer"
    />
  </head>
  <body>
    <div class="container">
      <h2>Currency Converter</h2>
      <form>
        <div class="amount">
          <p>Enter Amount</p>
          <input value="1" type="text" />
        </div>
        <div class="dropdown">
          <div class="from">
            <p>From</p>
            <div class="select-container">
              <img src="https://flagsapi.com/US/flat/64.png" />
              <select name="from"></select>
            </div>
          </div>
          <i class="fa-solid fa-arrow-right-arrow-left"></i>
          <div class="to">
            <p>To</p>
            <div class="select-container">
              <img src="https://flagsapi.com/IN/flat/64.png" />
              <select name="to"></select>
            </div>
          </div>
        </div>
        <div class="msg">1USD = 80INR</div>
        <button>Get Exchange Rate</button>
      </form>
    </div>
    <script src="codes.js"></script>
    <script src="app.js"></script>
  </body>
</html>



CSS Code

* {
  margin: 0;
  padding: 0;
}

body {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f4e4ba;
}

.container {
  background-color: #fff;
  padding: 2rem;
  border-radius: 1rem;
  min-height: 45vh;
  width: 40vh;
}

form {
  margin: 2rem 0 1rem 0;
}

form select,
button,
input {
  width: 100%;
  border: none;
  outline: none;
  border-radius: 0.75rem;
}

form input {
  border: 1px solid lightgray;
  font-size: 1rem;
  height: 3rem;
  padding-left: 0.5rem;
}

.dropdown {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
}

.dropdown i {
  font-size: 1.5rem;
  margin-top: 1rem;
}

.select-container img {
  max-width: 2rem;
}

.select-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 6rem;
  border-radius: 0.5rem;
  border: 1px solid lightgray;
}

.select-container select {
  font-size: 1rem;
  width: auto;
}

.msg {
  margin: 2rem 0 2rem 0;
}

form button {
  height: 3rem;
  background-color: #af4d98;
  color: #fff;
  font-size: 1.15rem;
  cursor: pointer;
}






Javascript Code

const BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }
  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
  let response = await fetch(URL);
  let data = await response.json();
  let rate = data[toCurr.value.toLowerCase()];

  let finalAmount = amtVal * rate;
  msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
};

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

window.addEventListener("load", () => {
  updateExchangeRate();
});