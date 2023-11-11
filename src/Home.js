import './Home.css';
import React, { useState } from 'react'; // Import useState
import home from './home.png';
import insight from './insight.png';
import history from './history.png';
import Data_table from './History.js';


export const Home = ({ switchScreen }) => {

    /*
        Need to insert these states so that it can communicate with history tab to add new infromation 
        in the table
    */
    const [amount_expense, setamount_expense] = useState('');

    const handle_expense_amount_change = (event) => {
        // Update the state with the current value of the input field
        setamount_expense(event.target.value);
    };
    // Functions to add expense to internal data
    const add_expense = () => {
        Data_table.add_expense(amount_expense, "Expense", "11/10/2023");
    }

    const [amount_income, setamount_income] = useState('');

    const handle_income_amount_change = (event) => {
        // Update the state with the current value of the input field
        setamount_income(event.target.value);
    };
    // Functions to add income to internal data
    const add_income = () => {
        Data_table.add_income(amount_income, "Income", "11/10/2023");
    }
        

    /*
        END
    */

    const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage menu toggle
    const [isCreateBudgetOpen, setIsCreateBudgetOpen] = useState(false);
    const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
    const [isAddIncomeOpen, setIsAddIncomeOpen] = useState(false);

    const toggleAddExpense = () => setIsAddExpenseOpen(!isAddExpenseOpen);
    const toggleAddIncome = () => setIsAddIncomeOpen(!isAddIncomeOpen);

    const toggleMenu = () => {setIsMenuOpen(!isMenuOpen);};
    const toggleCreateBudget = () => {setIsCreateBudgetOpen(!isCreateBudgetOpen);};
    

    return (
        <div id="root_container_home">
            <div id="home_screen">
                <div id="top_bar">
                    <h1>Hello Joe!</h1>
                    <button id="hamburger_button" onClick={toggleMenu}>
                    </button>
                </div>
                {/* Content of the home screen goes here */}
                {isMenuOpen && (
                    <div id="side_menu">
                        {/* Side menu content here */}
                    </div>
                )}
                <div className="buttons-container">
                    <button className={`green-button ${isCreateBudgetOpen ? 'expanded' : ''}`} onClick={toggleCreateBudget}>
                        {isCreateBudgetOpen ? 'Close' : 'Create Budget'}
                    </button>
                    {isCreateBudgetOpen && (
                        <div className="budget-creation-area">
                            <input type="text" placeholder="Budget Goal" />
                            <input type="date" />
                            <button className="create-budget-btn">Create Budget →</button>
                        </div>
                    )}
                    <button className={`green-button ${isAddExpenseOpen ? 'expanded' : ''}`} onClick={toggleAddExpense}>
                {isAddExpenseOpen ? 'Close' : 'Add Expense'}
            </button>
            {isAddExpenseOpen && (
                <div className="expense-creation-area">
                    <input type="text" placeholder="Expense Amount" value={amount_expense} onChange={handle_expense_amount_change}/>
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
                </div>
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
            </div>
        </div>
    );
}
