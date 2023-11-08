import './History.css';
import React, { useState } from 'react'; // Import useState

export const History = ({ switchScreen }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage menu toggle

    
    return (
        <div id="root_container_History">
            <div id="history_screen">
                <div id="top_bar_history">
                    <h1>History</h1>
                    
                </div>
                
                <Finance_table />

                <div id="bottom_menu_history">
                    <button className="menu_button_history" onClick={() => switchScreen('insights')}>Insights</button>
                    <button className="menu_button_history" onClick={() => switchScreen('home')}>Home</button>
                    <button className="menu_button_history" onClick={() => switchScreen('history')}>History</button>
                </div>
                
            </div>
        </div>
    );
}

const Finance_table = () => {
    const data = [
        { id:1, amount: "-$10", category: "Fast Food", date: "2023-10-15" },
        { id:2, amount: "+$500", category: "Bonus", date: "2023-10-15" },
        { id:3, amount: "-$250", category: "Utilities", date: "2023-10-16" },
        { id:4, amount: "-$300", category: "Groceries", date: "2023-10-16" },
        { id:5, amount: "-$50", category: "Dinner", date: "2023-10-16" },
        { id:6, amount: "-$120", category: "Groceries", date: "2023-10-17" },
        { id:7, amount: "-$20", category: "Uber", date: "2023-10-17" },
        { id:8, amount: "-$20", category: "Uber", date: "2023-10-17" },
        { id:9, amount: "-$20", category: "Uber", date: "2023-10-17" },
        { id:10, amount: "-$20", category: "Uber", date: "2023-10-17" },
        { id:11, amount: "-$20", category: "Uber", date: "2023-10-17" },        
      ];

    const tableRows = data.map((item) => (
        <tr key={item.id}>
          <td>{item.amount}</td>
          <td>{item.category}</td>
          <td>{item.date}</td>
        </tr>
      ));
      
    return (
        <div id="fincial_table_container">
           <table>
                <thead>
                    <th>Amount</th>
                    <th>Category</th>
                    <th>Date</th>
                </thead>
                <tbody>
                    {tableRows}
                </tbody>
            </table>
        </div>
        
    );
    
}

