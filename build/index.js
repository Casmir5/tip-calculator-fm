const billEl = document.querySelector("#bills");
const btnTips = document.querySelectorAll(".tips button");
const numberOfPpleEl = document.querySelector("#people");
const tipsAmountEL = document.querySelector("#tip-amount");
const totalTipsEL = document.querySelector("#tip-total");
const resetBtn = document.querySelector("#btn-reset");
const customInput = document.querySelector("#custom-tip");

let tipsArr,
  tipInPercent,
  calcTipInPercent,
  hasbtnBeenClicked,
  hasCustomInputBeenClicked,
  areAllFieldfilled;

const init = function () {
  tipsArr = [];
  tipInPercent = 0;
  calcTipInPercent = 0;
  tipsAmountEL.textContent = "0.00";
  totalTipsEL.textContent = "0.00";
  billEl.value = "";
  numberOfPpleEl.value = "";
  (hasbtnBeenClicked = false),
    (hasCustomInputBeenClicked = false),
    (areAllFieldfilled = false);
};

init();

// buttons
for (const [id, tip] of btnTips.entries()) {
  hasbtnBeenClicked = true;

  tip.addEventListener("click", function (e) {
    customInput.value = "";
    calcTipInPercent = Number(e.target.id) / Number(100);
    console.log(calcTipInPercent);
    tipsArr.push(calcTipInPercent);

    tipInPercent = [...tipsArr].pop();
  });
}

// custom button
customInput.addEventListener("keyup", function () {
  hasCustomInputBeenClicked = true;

  if (hasbtnBeenClicked && hasCustomInputBeenClicked) {
    calcTipInPercent = Number(customInput.value) / Number(100);
    tipsArr.push(tipInPercent);

    tipInPercent = [...tipsArr].pop();
  }
});

// people input
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
    resetBtn.setAttribute("disabled", "");
  } else {
    areAllFieldfilled = true;
    error.textContent = "";

    numberOfPpleEl.classList.remove("outline-red-400");

    numberOfPpleEl.classList.add("outline-emerald-400");

    const bill = billEl.value;
    const people = numberOfPpleEl.value;

    calcTipAmount = (bill * tipInPercent) / people;
    tipAmount = calcTipAmount.toFixed(2);

    tipsAmountEL.textContent = tipAmount;

    calcTotalTip = bill / people + calcTipAmount;
    totalTip = calcTotalTip.toFixed(2);
    totalTipsEL.textContent = totalTip;

    if (areAllFieldfilled) {
      resetBtn.removeAttribute("disabled");
    }
  }
});

// resetBtn
resetBtn.addEventListener("click", function (e) {
  resetBtn.removeAttribute("disabled");
  init();
});
