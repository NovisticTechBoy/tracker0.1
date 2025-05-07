const transactionNameInput = document.getElementById('transacName');
const transactionAmountInput = document.getElementById('expOrInc');
const transactionButton = document.getElementById('transactionBtn');
const transactionDivSpace = document.getElementById('transactionHist');
const totalTransaction = document.getElementById('balance');
const incomeDisplay = document.getElementById('income');
const expenseDisplay = document.getElementById('expense');

const currencyFormatter = new Intl.NumberFormat('en-NG' , {
    style : 'currency',
    currency : 'NGN',
}); 



// for the transactions
let theTransactions = [];
function addTransactions(transactionName, transactionAmount, type) {
    if (transactionName  !== '' && transactionAmount !== '') {
        theTransactions.push({transactionName, transactionAmount: parseFloat(transactionAmount), type});
        updatedTransactionsHistory();
        updateIncomeAndExpense();
    }
}

function updatedTransactionsHistory() {
    transactionDivSpace.innerHTML = '';

    theTransactions.forEach((text, index,) => {
        const transactionShower = document.createElement('p');
        if (text.type === 'income') {
        transactionShower.textContent = `${index + 1}: ${text.transactionName} ==> ${currencyFormatter.format(text.transactionAmount)} [INCOME]`;
        transactionShower.classList.add('income-styleType');
    } else {
            transactionShower.textContent = `${index + 1}: ${text.transactionName}==> ${currencyFormatter.format(text.transactionAmount)} [EXPENSE]`
            transactionShower.classList.add('expense-styleType');
        }
        transactionDivSpace.appendChild(transactionShower);
    });
}


transactionButton.addEventListener('click', (event) => {
    event.preventDefault();
    const nameOfTransaction = transactionNameInput.value.trim();
    const amountOfTransaction = transactionAmountInput.value.trim();
    const type = document.querySelector('input[name="type"]:checked').value;
    if (nameOfTransaction !== '' && amountOfTransaction !== '') {
        addTransactions(nameOfTransaction, amountOfTransaction, type);
        transactionNameInput.value = ''; // clears input of the transaction text area
        transactionAmountInput.value = ''; //clears input of the transaction amount area
    }
});


//targets INCOME AND EXPENSES
function updateIncomeAndExpense (){
    let totalIncome = 0;
    let totalExpense = 0;

    theTransactions.forEach((radioSelector) => {
        if (radioSelector.type === 'income') {
            totalIncome += radioSelector.transactionAmount;
        } else {
            totalExpense +=radioSelector.transactionAmount;
        }});

      //adjusting the income, expense
        incomeDisplay.textContent = currencyFormatter.format(totalIncome);
        expenseDisplay.textContent = currencyFormatter.format(totalExpense);
        totalTransaction.textContent = currencyFormatter.format(totalIncome - totalExpense);
};

// NEXT UPP....NAV BARS UPSTAIRS