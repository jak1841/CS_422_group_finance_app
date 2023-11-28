import './History.css';
import React, {createContext, useContext, useState } from 'react'; // Import useState
import home from './home.png';
import insight from './insight.png';
import history from './history.png';
import red_trash from './images/Red_trash_Can.svg';
import write_symbol from './images/Write_symbol.svg';
import filter_icon from './images/Filter_icon.svg';
import green_checkmark_icon from './images/GreenCheckMarkSVG.svg';
import { func } from 'prop-types';

const MyContext = React.createContext(); // This will be where the global states will be located

let Data_table = {
    data: [
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
    ],

    current_id: 12,

    add_income(amount_, category_, date_){
        this.data.push({id:this.current_id, amount:"+$" + amount_, category: category_, date: date_})
        this.current_id+=1;
    },

    add_expense(amount_, category_, date_){
        this.data.push({id:this.current_id, amount:"-$" + amount_, category: category_, date: date_})
        this.current_id+=1;
    },

    sortByPriceAscending() {
        // Compares 
        const compareAmount = (a, b) => {
            const numA = parseFloat(a.amount.replace(/[^0-9.-]+/g, ''));
            const numB = parseFloat(b.amount.replace(/[^0-9.-]+/g, ''));
            return numB - numA;
        };

        this.data.sort(compareAmount);
    }, 

    sortByPriceDescending() {
        // Compares 
        const compareAmount = (a, b) => {
            const numA = parseFloat(a.amount.replace(/[^0-9.-]+/g, ''));
            const numB = parseFloat(b.amount.replace(/[^0-9.-]+/g, ''));
            return numA - numB;
        };

        this.data.sort(compareAmount);
    }, 

    sortByDateAscending() {
        // Custom compare function for sorting by date
        const compareDate = (a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateB - dateA;
        };

        this.data.sort(compareDate);
    }, 

    sortByDateDescending() {
        // Custom compare function for sorting by date
        const compareDate = (a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateA - dateB;
        };

        this.data.sort(compareDate);
    }, 

    groupByCategory() {
        const groupedByCategory = this.data.reduce((grouped, item) => {
            const category = item.category;
          
            // If the category doesn't exist in the grouped object, create an empty array
            grouped[category] = grouped[category] || [];
          
            // Push the current item to the array corresponding to its category
            grouped[category].push(item);
          
            return grouped;
          }, {});

          const collapsedArray = Object.values(groupedByCategory).flat();
          
          this.data = collapsedArray;
    }, 

    // Given a index and a amount, category, and date will replace that particular indexes values 
    updateIndex(index, amount, category, date) {
        this.data[index].amount = amount;
        this.data[index].category = category;
        this.data[index].date = date;
    },

    // Returns a true if date is in format
    isValidDateString(dateString) {
        // Use the Date object to check if the date is valid
        const date = new Date(dateString);
        return !isNaN(date.getTime());
    },

    // Returns true if amount is in correct format
    isValidAmountFormat(input){
        // Use a regular expression to check if the input matches the desired format
        const currencyRegex = /^[-+]?\$\d+$/;
        return currencyRegex.test(input);
    },
    
}

export default Data_table;


// Overall screen structure 
export const History = ({ switchScreen }) => {
    // Refreshes all components 
    const [refreshFlag, setRefreshFlag] = useState(false);
    const refreshAllComponents = () => {
        setRefreshFlag(!refreshFlag);
    };

    // Needed to get reference to the row that will be doing the editing
    const [ChosenRowToEdit, setChosenRowToEdit] = useState(-1);
    const ChosenRowEditContext = {
        ChosenRowToEdit:ChosenRowToEdit, 
        setChosenRowToEdit:setChosenRowToEdit
    } 
    

    // State for handling whether the filter pop up will be seen 
    const [isFilterPopUp_visible, setisFilterPopUp_visible] = useState(false);
    const handle_filterPopUp = () => {
        setisFilterPopUp_visible(!isFilterPopUp_visible); 
    };

    // Keeps track of when pop up for delete entry should become available
    const [isDeleteEntry_PopUP_visible,setisDeleteEntry_PopUP_visible ] = useState(false);
    const handle_delete_entry_pop_up = () => {
        setisDeleteEntry_PopUP_visible(!isDeleteEntry_PopUP_visible);
    }

    // Functions will be passed through to MyContext provider so that children components can use them
    const functions = {
        handle_delete_entry_pop_up:handle_delete_entry_pop_up,
        refreshAllComponents:refreshAllComponents,
        handle_filterPopUp:handle_filterPopUp
    }

    

    
    return (
        <MyContext.Provider value={{function:functions, ChosenRowEditContext:ChosenRowEditContext}}>
            <div id="root_container_History">
                <div id="history_screen">
                    <div id="top_bar_history">
                        <button className="menu_button_history" onClick={() => switchScreen('home')}>
                            <img className="menus_buttons_image_history" src={home} alt="Home" />
                        </button>
                        <h1>History</h1>
                        <div id="filter_icon_container"role="button" onClick={handle_filterPopUp} >
                            <img src={filter_icon} style={{width: "3rem", height: "3rem"}} />
                        </div>
                    </div>
                    
                    <Finance_table refreshFlag={refreshFlag} /> 
                    {isFilterPopUp_visible && <Filter_pop_up/>}
                    {isDeleteEntry_PopUP_visible && <Red_trash_can_delete_entry_pop_up />}  
                </div>
                {/* <div id="bottom_menu_history">
                        <button className="menu_button_history" onClick={() => switchScreen('insights')}>
                            <img className="menus_buttons_image_history" src={insight} alt="Insights" />
                        </button>
                        <button className="menu_button_history" onClick={() => switchScreen('home')}>
                            <img className="menus_buttons_image_history" src={home} alt="Home" />
                        </button>
                        <button className="menu_button_history" onClick={() => switchScreen('history')}>
                            <img className="menus_buttons_image_history" src={history} alt="History" />
                        </button>
                    </div>      */}
                
            </div>
        </MyContext.Provider>
    );
}

const Finance_table = () => {


    const contextValues = useContext(MyContext);
    let  ChosenRowToEdit = contextValues.ChosenRowEditContext.ChosenRowToEdit;
    
    

    

    let tableRows = Data_table.data.map((item, index) => {
        const rowStyle = ChosenRowToEdit == index ? { backgroundColor: "#ffffff" } : {};

        

        

        
        let readOnlyRow = (
            <tr key={item.id}>
                <td>{item.amount}</td>
                <td>{item.category}</td>
                <td>
                    <div className='date_cell_container'>
                        {item.date}
                        <Item_edit_button index={index}/>
                    </div>
                </td>
            </tr>
        );

        if (ChosenRowToEdit == index) {
            return <Editable_Finance_table_row index={index} item={item}/>;
        } 
        return readOnlyRow;

        
    });
      
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

// This will be the table row where edits will occur
const Editable_Finance_table_row = (props) => {
    let item = props.item;
    let index = props.index;


    const [amount, setAmount] = useState(item.amount);
    const [category, setCategory] = useState(item.category);
    const [date, setdate] = useState(item.date);

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    };

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };

    const handleDateChange = (e) => {
        setdate(e.target.value);
    };


    let RowContext = {
        amount:amount, 
        category:category, 
        date:date
    }    

    return (        
        <tr key={item.id}>
            <td>
                <input className='EditableRowCell'
                    type="text"
                    value={amount}
                    onChange={handleAmountChange}
                />

            </td>
            <td>
                <input className='EditableRowCell'
                    type="text"
                    value={category}
                    onChange={handleCategoryChange}
                />
            </td>
            <td>
                <div className='date_cell_container'>
                    <input className='EditableRowCell'
                        type="text"
                        value={date}
                        onChange={handleDateChange}
                    />
                    <Item_Green_check_mark_button index={index} RowContext={RowContext}/>
                </div>
            </td>
        </tr>
    );
}

const Item_edit_button = (props) => {
    const [isDivVisible, setDivVisible] = useState(false);

    const toggleDiv = () => {
        setDivVisible(!isDivVisible);
    };


    const contextValues = useContext(MyContext);
    let functions = contextValues.function;
    let index = props.index;

    // Deletes the current entry from datatable
    const deleteEntry = () => {
        Data_table.data.splice(index, 1);
        functions.refreshAllComponents();
        setDivVisible(false);
    }

    const editEntry = () => {
        contextValues.ChosenRowEditContext.setChosenRowToEdit(index)
    }
    
    

    return(
    <div>
        <button className='date_cell_3_dots_button' onClick={toggleDiv}>
            &#8942;
        </button>

        {isDivVisible && (
        <div className='edit_button_pop_up_container'>
            <div className='edit_button_container'>
                <div className='edit_buttons_image_container' role='button' onClick={deleteEntry}> 
                    <img style={{width: "1.5rem", height: "1.25rem"}} src={red_trash}/>
                </div>
                <div className='edit_buttons_image_container' role='button' onClick={editEntry}>
                    <img style={{width: "1.5rem", height: "1.5rem"}} src={write_symbol}/>
                </div>
            </div>
        </div>
        )}
    </div>
   
    
    );
}

// This will display a green check mark button
const Item_Green_check_mark_button = (props) => {

    const contextValues = useContext(MyContext);
    let functions = contextValues.function;
    let index = props.index;
    let RowContext = props.RowContext;


    // This is what happens to the function 
    const onSaveEdit = () => {
        contextValues.ChosenRowEditContext.setChosenRowToEdit(-1); // Removes green checkmark and restores it
        if (Data_table.isValidAmountFormat(RowContext.amount) == false){
            alert("not in valid format for amount, must be in -$x or +$x but got " + RowContext.amount);
            return;
        }

        if (Data_table.isValidDateString(RowContext.date) == false){
            alert("not in valid format, must be in yyyy-mm-dd " + RowContext.date,);
            return;
        }


        Data_table.updateIndex(index, RowContext.amount, RowContext.category, RowContext.date);
        functions.refreshAllComponents();
    }

    return(
        <div>
            <div className='edit_buttons_image_container' role='button' onClick={onSaveEdit}> 
                    <img style={{width: "1.5rem", height: "1.25rem"}} src={green_checkmark_icon}/>
            </div>
        </div>
    );
}


// Filter pop up
const Filter_pop_up = () => {
    const contextValues = useContext(MyContext);
    let functions = contextValues.function;

    return (
        <div id="filter_pop_up_root_container">
            <p>Choose your filter</p>
            <Filter_DropdownMenu/>
            <div id="filter_pop_up_button_container">
                <button id="button_pop_up_cancel" onClick={functions.handle_filterPopUp}>Exit</button>
            </div>
        </div>
    );
}
// Drop down menu for filter butotn
const Filter_DropdownMenu = () => {
    const [selectedOption, setSelectedOption] = useState('');
    
    const contextValues = useContext(MyContext);
    let functions = contextValues.function;
  
    const handleSelectChange = (event) => {
      setSelectedOption(event.target.value);
      if (event.target.value == "Price_Ascending"){
        Data_table.sortByPriceAscending();
      } else if (event.target.value == "Price_Descending"){
        Data_table.sortByPriceDescending();
      } else if (event.target.value == "Time_Ascending"){
        Data_table.sortByDateAscending();
      } else if (event.target.value == "Time_Descending"){
        Data_table.sortByDateDescending();
      } else if (event.target.value == "GroupByCategory"){
        Data_table.groupByCategory();
      }

      functions.refreshAllComponents();
    };
  
    return (
      <div>
        <select id="dropdown" value={selectedOption} onChange={handleSelectChange}>
          <option value="">-- Select --</option>
          <option value="Price_Ascending">Sort By Price &uarr;</option>
          <option value="Price_Descending">Sort By Price &darr;</option>
          <option value="Time_Ascending">Sort By Time &uarr;</option>
          <option value="Time_Descending">Sort By Time &darr;</option>
          <option value="GroupByCategory">Group By Category</option>
        </select>        
      </div>
    );
};
  
// This for when someone clicks the red trash can this pop up displays
const Red_trash_can_delete_entry_pop_up = () => {
    return (
        <div id="delete_entry_pop_up_root_container">
            <p>Are you sure you want to delete?</p>
            <div id="delete_entry_button_container">
                <button className='delete_entry_buttons'>Yes</button>
                <button className='delete_entry_buttons'>No</button>
            </div>
        </div>
    );
}



