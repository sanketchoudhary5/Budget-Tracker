"use strict";

const errorMesgEl = document.querySelector(".error_message");
const budgetInputEl = document.querySelector(".budget_input");
const expenseDesEl = document.querySelector(".expenses_input");
const expenseAmountEl = document.querySelector(".expenses_amount");
const tblRecordEl = document.querySelector(".tbl_data");
const cardsContainer = document.querySelector(".cards");

// Cards Content
const budgetCardEl = document.querySelector(".budget_card");
const expensesCardEl = document.querySelector(".expenses_card");
const balanceCardEl = document.querySelector(".balance_card");

let itemList = []; //itemList stores expense objects.

let itemId = 0;   //itemId provides a unique identifier for each expense.


// Button Event
function btnEvents() {
  const btnBudgetCal = document.querySelector("#btn_budget");
  const btnExpensesCal = document.querySelector("#btn_expenses");

  // Budget Event
  btnBudgetCal.addEventListener("click", (e) => {
    e.preventDefault();
    budgetFun();
  });

  // Expenses Event
  btnExpensesCal.addEventListener("click", (e) => {
    e.preventDefault();
    expensesFun();
  });
}

// Calling Buttons Event
document.addEventListener("DOMContentLoaded", btnEvents);

// Expenses Function
function expensesFun() {
  let expensesDescValue = expenseDesEl.value;
  let expensesAmountValue = expenseAmountEl.value;

  if (expensesDescValue === "" || expensesAmountValue === "" || parseInt(expensesAmountValue) < 0) {
    errorMessage("Please Enter Expenses Description or Expense Amount!");
  } else {
    let amount = parseInt(expensesAmountValue);
    expenseAmountEl.value = "";
    expenseDesEl.value = "";

    // Store the value inside the object
    let expenses = {
      id: itemId,
      title: expensesDescValue,
      amount: amount
    };
    itemId++;
    itemList.push(expenses);

    // Add expenses inside the HTML page
    addExpenses(expenses);
    showBalance();
  }
}

// Add Expenses
function addExpenses(expensesPara) {
  const html = `<ul class="tbl_tr_content" data-id="${expensesPara.id}">
                  <li>${expensesPara.id}</li>
                  <li>${expensesPara.title}</li>
                  <li><span>₹</span>${expensesPara.amount}</li>
                  <li>
                    <button type="button" class="btn_edit">Edit</button>
                    <button type="button" class="btn_delete">Delete</button>
                  </li>
                </ul>`;
  tblRecordEl.insertAdjacentHTML("beforeend", html);

  // Edit & Delete Button Event Listeners
  document.querySelectorAll(".btn_edit").forEach((btn) => {
    btn.addEventListener("click", editExpense);
  });

  document.querySelectorAll(".btn_delete").forEach((btn) => {
    btn.addEventListener("click", deleteExpense);
  });
}

// Edit Expense Function
function editExpense(e) {
  let element = e.target.parentElement.parentElement;
  let id = parseInt(element.dataset.id);

  let expenses = itemList.find((item) => item.id === id);

  if (expenses) {
    expenseDesEl.value = expenses.title;
    expenseAmountEl.value = expenses.amount;

    itemList = itemList.filter((item) => item.id !== id);
    element.remove();
    showBalance();
  }
}

// Delete Expense Function
function deleteExpense(e) {
  let element = e.target.parentElement.parentElement;
  let id = parseInt(element.dataset.id);
  itemList = itemList.filter((item) => item.id !== id);
  element.remove();
  showBalance();
}

// Budget Function
function budgetFun() {
  const budgetValue = budgetInputEl.value;

  // Error Message
  if (budgetValue === "" || budgetValue < 0) {
    errorMesgEl.innerHTML = "<p>Please Enter Budget Amount | More Than 0</p>";
    errorMesgEl.classList.add("error");
    setTimeout(() => {
      errorMesgEl.classList.remove("error");
    }, 2500);
  } else {
    budgetCardEl.textContent = budgetValue;
    budgetInputEl.value = "";
    showBalance();
  }
}

// Show Balance
function showBalance() {
  const expenses = totalExpenses();
  const total = parseInt(budgetCardEl.textContent) - expenses;
  balanceCardEl.textContent = total;
}

// Total Expenses
function totalExpenses() {
  let total = itemList.reduce((acc, curr) => acc + curr.amount, 0);
  expensesCardEl.textContent = total;
  return total;
}
