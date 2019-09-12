import React from 'react';
import './App.css';
import { NavBar } from './components/navbar/NavBar';
import { EventList } from './components/eventList/EventList';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { IEvent } from './services/events/IEvent';

const App: React.FC = () => {
    return (
        <Router>
            <div className="page">
                <NavBar />
                <Redirect exact from="/" to="/events" />
                <Switch>
                    <Route exact path="/events" component={AllEvents} />
                    <Route exact path="/myevents" component={MyEvents} />
                    <Route component={NoMatchPage} />
                </Switch>
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
class MyEvents extends React.Component<any, any> {
    readonly intialState: any = {
        events: JSON.parse(localStorage.getItem('myEvents') as string) as IEvent[]
    };

    constructor(props: any) {
        super(props);
        this.state = this.intialState;
    }

    onSignup = (event: IEvent) => {
        myEvents = localStorage.getItem('myEvents') ? JSON.parse(localStorage.getItem('myEvents') as string) : [];
        if (!isSignedUp(event.id)) {
            myEvents.push(event);
            localStorage.setItem('myEvents', JSON.stringify(myEvents));
            this.setState({
                ...this.state,
                events: myEvents
            });
        }
    };

    onRemove = (event: IEvent) => {
        myEvents = localStorage.getItem('myEvents') ? JSON.parse(localStorage.getItem('myEvents') as string) : [];
        if (isSignedUp(event.id)) {
            myEvents.splice(myEvents.findIndex((myEvent: IEvent) => myEvent.id === event.id), 1);
            localStorage.setItem('myEvents', JSON.stringify(myEvents));

            this.setState({
                ...this.state,
                events: myEvents
            });
        }
    };

    render() {
        return (<EventList
            myEvents={true}
            events={this.state.events ? this.state.events : []}
            onSignup={this.onSignup}
            onRemove={this.onRemove}
        />)
    }
}

const NoMatchPage = () => {
    return (
        <h3>404 - Not found</h3>
    );
};

export default App;
