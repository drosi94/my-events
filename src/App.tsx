import React from 'react';
import './App.css';
import { NavBar } from './components/navbar/NavBar';
import { EventList } from './components/eventList/EventList';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { IEvent } from './services/events/IEvent';

const App: React.FC = () => {
    return (
        <Router>
            <div className="page">
                <NavBar />
                <Route exact path="/" component={AllEvents}></Route>
                <Route exact path="/events" component={AllEvents}></Route>
                <Route exact path="/myevents" component={MyEvents}></Route>
            </div>
        </Router>

    );
};
let myEvents: IEvent[];

const isSignedUp = (id: number): boolean => {
    return myEvents.some((event: IEvent) => event.id === id);
}

const onSignup = (event: IEvent) => {
    myEvents = localStorage.getItem('myEvents') ? JSON.parse(localStorage.getItem('myEvents') as string) : [];
    if (!isSignedUp(event.id)) {
        myEvents.push(event);
        localStorage.setItem('myEvents', JSON.stringify(myEvents));
    }
};

const onRemove = (event: IEvent) => {
    myEvents = localStorage.getItem('myEvents') ? JSON.parse(localStorage.getItem('myEvents') as string) : [];
    if (isSignedUp(event.id)) {
        myEvents.splice(myEvents.findIndex((myEvent: IEvent) => myEvent.id === event.id), 1);
        localStorage.setItem('myEvents', JSON.stringify(myEvents));
    }
};

const AllEvents: React.FC = () => {
    return <EventList onSignup={onSignup} onRemove={onRemove} />
}
const MyEvents: React.FC = () => {
    return <EventList
        events={JSON.parse(localStorage.getItem('myEvents') as string) as IEvent[]}
        onSignup={onSignup}
        onRemove={onRemove}
    />
}

export default App;
