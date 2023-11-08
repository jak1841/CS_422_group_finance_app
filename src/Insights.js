import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import './Insights.css'; // Make sure this path is correct
import 'react-datepicker/dist/react-datepicker.css';
import image1 from './image1.png';
import image2 from './image2.png';
import image3 from './image3.png'
import logo from './rise.png';
import home from './home.png';
import insight from './insight.png';
import history from './history.png';

export const Insights_screen = ({ switchScreen }) => {
  
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [startPickerOpen, setStartPickerOpen] = useState(false);
  const [endPickerOpen, setEndPickerOpen] = useState(false);

  const handleStartClick = () => {
    setStartPickerOpen(!startPickerOpen);
    if (endPickerOpen) setEndPickerOpen(false);
  };

  // Function to handle end date picker visibility and disabling start date picker
  const handleEndClick = () => {
    setEndPickerOpen(!endPickerOpen);
    if (startPickerOpen) setStartPickerOpen(false);
  };

  

  return (
    <div id="root_container_insight">
      <div id="home_screen">
      <div id="spending_header">
               <h1>Your Spending</h1>
                <img src={logo} alt="Logo" id="header_logo" style={{ width: '20px', height: '20px' }} />
          </div>
      
          <div id="button_container">
            <div className="date-picker-container">
            <button type="button" id="start_button" onClick={handleStartClick} disabled={endPickerOpen}>
                {startDate ? startDate.toLocaleDateString() : "Start Date"}
            </button>
            {startPickerOpen && (
              <div className="date-picker-overlay">
                <DatePicker
                    selected={startDate}
                    onChange={(date) => {
                    setStartDate(date);
                    setStartPickerOpen(false);
                  }}
                    onSelect={() => setEndPickerOpen(false)}
                    inline
                />
                </div>
            )}
            </div>

          <div className="date-picker-container">
           <button type="button" id="end_button" onClick={handleEndClick} disabled={startPickerOpen}>
            {endDate ? endDate.toLocaleDateString() : "End Date"}
           </button>
            {endPickerOpen && (
           <div className="date-picker-overlay">
             <DatePicker
                 selected={endDate}
                 onChange={(date) => {
                 setEndDate(date);
                 setEndPickerOpen(false);
                 }}
                 minDate={startDate && new Date(startDate)} // Set minDate only if startDate is not null
                 highlightDates={startDate ? [startDate] : []} // Highlight the start date only if it's not null
                 onSelect={() => setStartPickerOpen(false)}
                 inline
             />
            </div>
        )}
        </div>
            </div>

            <div id="spending_charts">
                <img src={image1} alt="Spending vs Earning" style={{ width: '130px', height: '130px' }} />
                <img src={image2} alt="Spending Overtime" style={{ width: '130px', height: '130px' }} />
            </div>
      
            <div id="chart2">
                <img src={image3} alt="Top Spending Categories" style={{ width: '90%', height: '260px' }} />
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