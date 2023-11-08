import './Home.css';
import React, { useState } from 'react'; // Import useState
import home from './home.png';
import insight from './insight.png';
import history from './history.png';


export const Home = ({ switchScreen }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage menu toggle

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen); // Toggle the state
    };

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
