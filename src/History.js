import './History.css';
import React, { useState } from 'react'; // Import useState
import home from './home.png';
import insight from './insight.png';
import history from './history.png';
import red_trash from './images/Red_trash_Can.svg';
import write_symbol from './images/Write_symbol.svg';
import filter_icon from './images/Filter_icon.svg'

// Overall screen structure 
export const History = ({ switchScreen }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage menu toggle

    const [isFilterPopUp_visible, setisFilterPopUp_visible] = useState(false);

    const handle_filterPopUp = () => {
        setisFilterPopUp_visible(!isFilterPopUp_visible); // Toggle the visibility state
    };

    
    return (
        <div id="root_container_History">
            <div id="history_screen">
                <div id="top_bar_history">
                    <h1>History</h1>
                    <div id="filter_icon_container"role="button" onClick={handle_filterPopUp} >
                        <img src={filter_icon} style={{width: "3rem", height: "3rem"}} />
                    </div>
                </div>
                
            <Finance_table /> 
            {isFilterPopUp_visible && <Filter_pop_up/>}
            
                          
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

// Filter pop up
const Filter_pop_up = () => {
    return (
        <div id="filter_pop_up_root_container">
            <p>Choose your filter</p>
            <DropdownMenu/>
            <div id="filter_pop_up_button_container">
                <button id="button_pop_up_cancel">Cancel</button>
                <button id="button_pop_up_save">Save</button>


            </div>
        </div>
    );
}
// Drop down menu for filter butotn
const DropdownMenu = () => {
    const [selectedOption, setSelectedOption] = useState('');
  
    const handleSelectChange = (event) => {
      setSelectedOption(event.target.value);
    };
  
    return (
      <div>
        <select id="dropdown" value={selectedOption} onChange={handleSelectChange}>
          <option value="">-- Select --</option>
          <option value="option1">Sort By Price &uarr;</option>
          <option value="option2">Sort By Price &darr;</option>
          <option value="option3">Sort By Time &uarr;</option>
          <option value="option4">Sort By Time &darr;</option>
          <option value="option5">Group By Category</option>
        </select>        
      </div>
    );
};
  




