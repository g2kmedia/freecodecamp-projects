// Variables for testing
let price = 19.5;
let cid = [
    ["PENNY", 0.5],
    ["NICKEL", 0],
    ["DIME", 0],
    ["QUARTER", 0],
    ["ONE", 0],
    ["FIVE", 0],
    ["TEN", 0],
    ["TWENTY", 0],
    ["ONE HUNDRED", 0]
];

const drawer = document.getElementById("drawer");
const total = document.getElementById("total");
const changeDue = document.getElementById("change-due");
const purchaseBtn = document.getElementById("purchase-btn");
const changeInDrawer = document.getElementById("change-in-drawer");

const currencyUnits = {
    "ONE HUNDRED": 100,
    "TWENTY": 20,
    "TEN": 10,
    "FIVE": 5,
    "ONE": 1,
    "QUARTER": 0.25,
    "DIME": 0.1,
    "NICKEL": 0.05,
    "PENNY": 0.01,
};

let changeDueResult = [];

const updateTotalDisplay = (currentPrice) => {
    total.innerHTML = `Total: $${currentPrice}`;
};

updateTotalDisplay(price);

const updateDrawer = (cidCurrent) => {
    changeInDrawer.textContent = "Change in drawer:";

    cidCurrent.forEach((item) => {
        const name = item[0].charAt(0) + item[0].slice(1).toLowerCase();
        let amount = item[1].toFixed(2);

        amount = amount.toString().replace(/\.?0*$/, "");

        changeInDrawer.innerHTML += `<div class="no-styling">${name}: $${amount}</div>`;
    });
};

updateDrawer(cid);

const convertToNumber = (valueToConvert) => {
    valueToConvert = Number(valueToConvert);
    valueToConvert = parseFloat(valueToConvert.toFixed(2));
    return valueToConvert;
}

const resetCashInput = () => {
    document.getElementById("cash").value = "";
}

purchaseBtn.addEventListener("click", () => {
    changeDueResult = [];

    let cash = document.getElementById("cash").value;
    cash = convertToNumber(cash);

    if (cash < price) {
        alert("Customer does not have enough money to purchase the item");
        resetCashInput();
        return;
    }

    if (cash === price) {
        changeDue.textContent = "No change due - customer paid with exact cash";
        resetCashInput();
        return;
    }

    const cidValuesOnly = cid.map(subarray => subarray[1]);

    let drawerTotal = cidValuesOnly.reduce((accumulator, currentValue) => accumulator + currentValue);

    drawerTotal = convertToNumber(drawerTotal);

    let change = cash - price;
    change = convertToNumber(change);

    if (change > drawerTotal) {
        changeDue.innerHTML = `<div class="status">Status: INSUFFICIENT_FUNDS</div>`;
        return;
    } else if (change === drawerTotal) {
        changeDue.innerHTML = `<div class="status">Status: CLOSED</div>`;
    } else {
        changeDue.innerHTML = `<div class="status">Status: OPEN</div>`;
    }

    let cidCopy = cid.reverse();

    for (let elem of cidCopy) {

        let changeForCustomer = [elem[0], 0];

        while (change >= currencyUnits[elem[0]] && elem[1] > 0) {
            change -= currencyUnits[elem[0]];
            change = convertToNumber(change);

            elem[1] -= currencyUnits[elem[0]];

            changeForCustomer[1] += currencyUnits[elem[0]];
        }

        if (changeForCustomer[1] > 0) {
            changeDueResult.push(changeForCustomer);
        }
    }

    for (let elem of changeDueResult) {

        if (elem[1] < change) {
            changeDue.innerHTML = `<div class="status">Status: INSUFFICIENT_FUNDS</div>`;
            return;
        }
    }

    const displayChangeDue = (cidChange) => {

        cidChange.forEach((item) => {
            const name = item[0];
            let amount = item[1].toFixed(2);

            amount = amount.toString().replace(/\.?0*$/, "");

            changeDue.innerHTML += `<div>${name}: $${amount}</div>`;
        });
    }

    displayChangeDue(changeDueResult);

    cidCopy.forEach((elem) => {
        elem[1] = convertToNumber(elem[1]);
    })

    updateDrawer(cidCopy = cidCopy.reverse());

    resetCashInput();

});
