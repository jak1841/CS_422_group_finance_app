import './History.css';
import React, { useState } from 'react'; // Import useState
import home from './home.png';
import insight from './insight.png';
import history from './history.png';
import red_trash from './images/Red_trash_Can.svg';
import write_symbol from './images/Write_symbol.svg';

export const History = ({ switchScreen }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage menu toggle

    
    return (
        <div id="root_container_History">
            <div id="history_screen">
                <div id="top_bar_history">
                    <h1>History</h1>
                </div>
                
                <Finance_table /> 
                          
            </div>
            <div id="bottom_menu_history">
                    <button className="menu_button_history" onClick={() => switchScreen('insights')}>
                        <img className="menus_buttons_image_history" src={insight} alt="Insights" />
                    </button>
                    <button className="menu_button_history" onClick={() => switchScreen('home')}>
                        <img className="menus_buttons_image_history" src={home} alt="Home" />
                    </button>
                    <button className="menu_button_history" onClick={() => switchScreen('history')}>
                        <img className="menus_buttons_image_history" src={history} alt="History" />
                    </button>
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
          <td>
            <div className='date_cell_container'>
                {item.date}
                <Item_edit_button/>
            </div>
          </td>
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


const Item_edit_button = () => {
    const [isDivVisible, setDivVisible] = useState(false);

    const toggleDiv = () => {
        setDivVisible(!isDivVisible);
    };

    return(
    <div>
        <button className='date_cell_3_dots_button' onClick={toggleDiv}>
            &#8942;
        </button>

        {isDivVisible && (
        <div className='edit_button_pop_up_container'>
            <div className='edit_button_container'>
                <img style={{width: "1.5rem", height: "1.25rem"}} src={red_trash}/>
                <img style={{width: "1.5rem", height: "1.5rem"}} src={write_symbol}/>
            </div>
        </div>
        )}
    </div>
   
    
    );
}

