const billEl = document.querySelector("#bills");
const btnTips = document.querySelectorAll(".tips button");
const numberOfPpleEl = document.querySelector("#people");
const tipsAmountEL = document.querySelector("#tip-amount");
const totalTipsEL = document.querySelector("#tip-total");
const resetBtn = document.querySelector("#btn-reset");
const customInput = document.querySelector("#custom-tip");

console.log(customInput.value);
// console.log(tipsAmountEL, totalTipsEL);

let tipsArr = [];
let currentTipInPercent;
let tipInPercent;
let hasbtnBeenClicked = false;
let hasCustomInputBeenClicked = false;

for (const [id, tip] of btnTips.entries()) {
  hasbtnBeenClicked = true;
  tip.addEventListener("click", function (e) {
    tipInPercent = Number(e.target.id) / Number(100); //??
    // Number(customInput.value) / Number(100);
    console.log(tipInPercent);
    tipsArr.push(tipInPercent);

    currentTipInPercent = [...tipsArr].pop();
  });
}

customInput.addEventListener("keyup", function () {
  hasCustomInputBeenClicked = true;
  // console.log(customInput.value);
  if (hasbtnBeenClicked && hasCustomInputBeenClicked) {
    tipInPercent = Number(customInput.value) / Number(100);
    tipsArr.push(tipInPercent);

    currentTipInPercent = [...tipsArr].pop();
  }
  console.log(hasbtnBeenClicked);
});

numberOfPpleEl.addEventListener("keyup", function () {
  const error = document.querySelector(".error");
  if (!billEl.value && hasbtnBeenClicked) {
    return;
  } else if (numberOfPpleEl.value == 0) {
    error.textContent = "can't be zero";

    numberOfPpleEl.classList.remove("outline-emerald-400");

    numberOfPpleEl.classList.add("outline-red-400");
    totalTipsEL.textContent = "0.00";
    tipsAmountEL.textContent = "0.00";
  } else {
    error.textContent = "";

    numberOfPpleEl.classList.remove("outline-red-400");

    numberOfPpleEl.classList.add("outline-emerald-400");

    const bill = billEl.value;
    const people = numberOfPpleEl.value;

    calcTipAmount = (bill * currentTipInPercent) / people;
    tipAmount = calcTipAmount.toFixed(2);

    tipsAmountEL.textContent = tipAmount;

    console.log(tipAmount);

    calcTotalTip = bill / people + calcTipAmount;
    totalTip = calcTotalTip.toFixed(2);
    totalTipsEL.textContent = totalTip;

    console.log(totalTip);
  }
});
console.log(resetBtn);

resetBtn.addEventListener("click", function (e) {
  // error.textContent = "";
  tipsArr = [];
  currentTipInPercent = 0;
  tipInPercent = 0;
  tipsAmountEL.textContent = "0.00";
  totalTipsEL.textContent = "0.00";
  billEl.value = "";
  numberOfPpleEl.value = "";
});
