import React from 'react';
import './App.css';
import { NavBar } from './components/navbar/NavBar';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import AllEvents from './pages/allEvents/AllEvents';
import MyEvents from './pages/myEvents/MyEvents';

const App: React.FC = () => {
    return (
        <Router>
            <div className="page">
                <NavBar />
                <Redirect from="/" to="/events" />
                <Switch>
                    <Route exact path="/events" component={AllEvents} />
                    <Route exact path="/myevents" component={MyEvents} />
                </Switch>
            </div>
        </Router>

    );
};

export default App;
