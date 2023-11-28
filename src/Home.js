import './Home.css';
import React, { useState, useEffect } from 'react'; // Import useState
import home from './home.png';
import insight from './insight.png';
import history from './history.png';
import Data_table from './History.js';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);


export const Home = ({ switchScreen }) => {

    //budget logic

    const [budgetGoal, setBudgetGoal] = useState('');
    const [targetDate, setTargetDate] = useState('');
    const [showPieChart, setShowPieChart] = useState(false);
    const [dailySavingsBudget, setDailySavingsBudget] = useState(0);
    const [totalExpenses, setTotalExpenses] = useState(0);
    const [totalIncome, setTotalIncome] = useState(0);
    const [dailyAvailableAmount, setDailyAvailableAmount] = useState(0);

    const track_expense = () => {
        const expenseAmount = parseFloat(amount_expense);
        setTotalExpenses(prevExpenses => prevExpenses + expenseAmount);
    };

    const track_income = () => {
        const incomeAmount = parseFloat(amount_income);
        setTotalIncome(prevIncome => prevIncome + incomeAmount);
    };

    useEffect(() => {
        const daysUntilGoal = Math.ceil((new Date(targetDate) - new Date()) / (1000 * 60 * 60 * 24)) || 1;
        const dailyIncome = totalIncome / daysUntilGoal;
        setDailyAvailableAmount(dailyIncome - dailySavingsBudget);
    }, [totalIncome, dailySavingsBudget, targetDate]);

    const handleBudgetGoalChange = (event) => {
        setBudgetGoal(event.target.value);
    };

    const handleTargetDateChange = (event) => {
        setTargetDate(event.target.value);
    };

    const calculateDailySavingsBudget = () => {
        const startDate = new Date(); // Today's date
        startDate.setHours(0, 0, 0, 0); // Reset time to start of the day
        const endDate = new Date(targetDate); // Target date from input
        if (endDate < startDate) {
            // Show an alert if the end date is before today's date
            alert("The selected date is invalid. Please choose a date after today.");
            return 0; // Return 0 or handle this case as needed
        }
        const diffTime = Math.abs(endDate - startDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1; // Ensure no division by zero
        return budgetGoal / diffDays;
    };

    const onCreateBudget = () => {
        const daily = calculateDailySavingsBudget();
        setDailySavingsBudget(daily);
        setShowPieChart(true);
        setIsCreateBudgetOpen(false); // Close the budget creation area
    };

    // end of budget logic

    /*
        Need to insert these states so that it can communicate with history tab to add new infromation 
        in the table
    */
    const [amount_expense, setamount_expense] = useState('');

    const handle_expense_amount_change = (event) => {
        // Update the state with the current value of the input field
        setamount_expense(event.target.value);
    };


    /* 
        Keeps track of selecting category state
    */

    const [selectCategory, setSelectCategory] = useState('');

    const handleSelectCategoryChange = (event) => {
        const value = event.target.value;
        setSelectCategory(value);
    };



    // Functions to add expense to internal data
    const add_expense = () => {
        const todayDate = new Date();
        const dateString = todayDate.toLocaleDateString();

        Data_table.add_expense(amount_expense, selectCategory, dateString);
        toggleAddExpense();
        alert("Added Expense");
        
    }

    const [amount_income, setamount_income] = useState('');

    const handle_income_amount_change = (event) => {
        // Update the state with the current value of the input field
        setamount_income(event.target.value);
    };
    // Functions to add income to internal data
    const add_income = () => {
        const todayDate = new Date();
        const dateString = todayDate.toLocaleDateString();
        Data_table.add_income(amount_income, selectCategory, dateString);
        toggleAddIncome();
        alert("Added income");
        
    }


    const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage menu toggle
    const [isCreateBudgetOpen, setIsCreateBudgetOpen] = useState(false);
    const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
    const [isAddIncomeOpen, setIsAddIncomeOpen] = useState(false);

    const toggleAddExpense = () => setIsAddExpenseOpen(!isAddExpenseOpen);
    const toggleAddIncome = () => setIsAddIncomeOpen(!isAddIncomeOpen);

    const toggleMenu = () => { setIsMenuOpen(!isMenuOpen); };
    const toggleCreateBudget = () => { setIsCreateBudgetOpen(!isCreateBudgetOpen); };


    return (
        <div id="root_container_home">
            <div id="home_screen">
                <div id="top_bar">
                    <h1>Hello Joe!</h1>
                    <button id="hamburger_button" onClick={() => switchScreen('history')}>
                        <img src={history} alt="History" style={{ width: '100%', height: '100%' }} />
                    </button>
                </div>
            
                <div className="buttons-container">

                    {showPieChart ? (
                        <div className="pie-chart-container">
                            {/* Insert your Pie Chart Component here with the data */}
                            <p>Daily Savings to reach budget: ${dailySavingsBudget.toFixed(2)}</p>
                            {showPieChart && (
                                <div>
                                    {/* ... other components ... */}
                                    <p>Daily Available Spending: ${dailyAvailableAmount.toFixed(2)}</p>
                                    <Pie data={{
                                        labels: ['Available Amount', 'Expenses', 'Income'],
                                        datasets: [{
                                            data: [dailyAvailableAmount, totalExpenses, totalIncome],
                                            backgroundColor: ['green', 'red', 'blue'],
                                        }]
                                    }} />
                                </div>
                            )}

                            <button className={`sub-green-button ${isAddExpenseOpen ? 'expanded' : ''}`} onClick={toggleAddExpense}>
                                {isAddExpenseOpen ? 'Close' : 'Add Expense'}
                            </button>
                            {isAddExpenseOpen && (
                                <div className="expense-creation-area">
                                    <input type="text" placeholder="Expense Amount" value={amount_expense} onChange={handle_expense_amount_change} />
                                    <select name="category" value={selectCategory} onChange={handleSelectCategoryChange}>
                                        <option value="">Select Category</option>
                                        <option value="Food">Food</option>
                                        <option value="Transport">Transport</option>
                                        <option value="Utilities">Utilities</option>
                                    </select>
                                    <div className="checkbox-container">
                                        <input type="checkbox" id="recurringExpense" />
                                        <label htmlFor="recurringExpense">Recurring</label>
                                    </div>
                                    <button className="insert-expense-btn" onClick={add_expense}>Insert Expense →</button>
                                </div>
                            )}

                            <button className={`sub-green-button ${isAddIncomeOpen ? 'expanded' : ''}`} onClick={toggleAddIncome}>
                                {isAddIncomeOpen ? 'Close' : 'Add Income'}
                            </button>
                            {isAddIncomeOpen && (
                                <div className="income-creation-area">
                                    <input type="text" placeholder="Income Amount" value={amount_income} onChange={handle_income_amount_change} />
                                    <select name="category" value={selectCategory} onChange={handleSelectCategoryChange} >
                                        <option value="">Select Category</option>
                                        <option value="Salary">Salary</option>
                                        <option value="Investment">Investment</option>
                                        <option value="Gift">Gift</option>
                                    </select>
                                    <div className="checkbox-container">
                                        <input type="checkbox" id="recurringExpense" />
                                        <label htmlFor="recurringExpense">Recurring</label>
                                    </div>
                                    <button className="insert-income-btn" onClick={add_income}>Insert Income →</button>
                                </div>
                            )}


                        </div>


                    ) : (
                        <button className={`green-button ${isCreateBudgetOpen ? 'expanded' : ''}`} onClick={toggleCreateBudget}>
                            {isCreateBudgetOpen ? 'Close' : 'Create Budget'}
                        </button>
                    )}
                    {isCreateBudgetOpen && (
                        <div className="budget-creation-area">
                            <input type="text" placeholder="Budget Goal" value={budgetGoal} onChange={handleBudgetGoalChange} />
                            <input type="date" value={targetDate} onChange={handleTargetDateChange} />
                            <button className="create-budget-btn" onClick={onCreateBudget}>Create Budget →</button>
                        </div>
                    )}
                    {/*}
                    <button className={`green-button ${isAddExpenseOpen ? 'expanded' : ''}`} onClick={toggleAddExpense}>
                        {isAddExpenseOpen ? 'Close' : 'Add Expense'}
                    </button>
                    {isAddExpenseOpen && (
                        <div className="expense-creation-area">
                            <input type="text" placeholder="Expense Amount" value={amount_expense} onChange={handle_expense_amount_change} />
                            <select name="category">
                                <option value="">Select Category</option>
                                <option value="food">Food</option>
                                <option value="transport">Transport</option>
                                <option value="utilities">Utilities</option>
                            </select>
                            <div className="checkbox-container">
                                <input type="checkbox" id="recurringExpense" />
                                <label htmlFor="recurringExpense">Recurring</label>
                            </div>
                            <button className="insert-expense-btn" onClick={add_expense}>Insert Expense →</button>
                        </div>
                    )}

                    <button className={`green-button ${isAddIncomeOpen ? 'expanded' : ''}`} onClick={toggleAddIncome}>
                        {isAddIncomeOpen ? 'Close' : 'Add Income'}
                    </button>
                    {isAddIncomeOpen && (
                        <div className="income-creation-area">
                            <input type="text" placeholder="Income Amount" value={amount_income} onChange={handle_income_amount_change} />
                            <select name="category">
                                <option value="">Select Category</option>
                                <option value="salary">Salary</option>
                                <option value="investment">Investment</option>
                                <option value="gift">Gift</option>
                            </select>
                            <div className="checkbox-container">
                                <input type="checkbox" id="recurringExpense" />
                                <label htmlFor="recurringExpense">Recurring</label>
                            </div>
                            <button className="insert-income-btn" onClick={add_income}>Insert Income →</button>
                        </div>
                    )}
                    */}

                </div>
                {/*
                <div id="bottom_menu">
                    <button className="menu_button" onClick={() => switchScreen('insights')}>
                        <img src={insight} alt="Insights" style={{ width: '100%', height: '100%' }} />
                    </button>
                    <button className="menu_button" onClick={() => switchScreen('home')}>
                        <img src={home} alt="Home" style={{ width: '100%', height: '100%' }} />
                    </button>
                    <button className="menu_button" onClick={() => switchScreen('history')}>
                        <img src={history} alt="History" style={{ width: '100%', height: '100%' }} />
                    </button>
                </div>
                */}
            </div>
        </div>
    );
}
