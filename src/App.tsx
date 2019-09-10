import React from 'react';
import './App.css';
import { NavBar } from './components/navbar/NavBar';
import { AllEvents } from './components/allEvents/AllEvents';

const App: React.FC = () => {
    return (
        <div>
            <NavBar />
            <AllEvents />
        </div>
    );
};

export default App;
