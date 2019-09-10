import React from 'react';
import './App.css';
import { NavBar } from './components/navbar/NavBar';
import { EventList } from './components/eventList/EventList';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const App: React.FC = () => {
    return (
        <Router>
            <div>
                <NavBar />
                <Route exact path="/" component={AllEvents}></Route>
                <Route exact path="/events" component={AllEvents}></Route>
                <Route exact path="/myevents" component={MyEvents}></Route>
            </div>
        </Router>

    );
};

const AllEvents: React.FC = () => {
    return <EventList />
}
const MyEvents: React.FC = () => {
    return <EventList events={[{
        "id": 0,
        "isFree": true,
        "name": "CSS Grids: fact or fiction",
        "city": 9,
        "startDate": "2019-07-14T02:00:00+00:00",
        "endDate": "2019-07-14T03:00:00+00:00"
    }]} />
}

export default App;
