import React from 'react';
import './App.css';
import { NavBar } from './components/navbar/NavBar';

const App: React.FC = () => {
    return (
        <div>
            <NavBar />
            <p>It works.</p>
        </div>
    );
};

export default App;
