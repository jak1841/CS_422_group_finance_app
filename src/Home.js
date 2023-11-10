import './Home.css';
import React, { useState } from 'react'; // Import useState
import home from './home.png';
import insight from './insight.png';
import history from './history.png';


export const Home = ({ switchScreen }) => {
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
                    <input type="text" placeholder="Expense Amount" />
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
                    <button className="insert-expense-btn">Insert Expense →</button>
                </div>
            )}

            <button className={`green-button ${isAddIncomeOpen ? 'expanded' : ''}`} onClick={toggleAddIncome}>
                {isAddIncomeOpen ? 'Close' : 'Add Income'}
            </button>
            {isAddIncomeOpen && (
                <div className="income-creation-area">
                    <input type="text" placeholder="Income Amount" />
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
                    <button className="insert-income-btn">Insert Income →</button>
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
