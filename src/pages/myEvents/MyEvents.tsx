import React from "react";

import { IEvent } from "../../services/events/IEvent";
import { EventList } from "../../components/eventList/EventList";

export default class MyEvents extends React.Component<any, any> {
    readonly intialState: any = {
        events: JSON.parse(localStorage.getItem('myEvents') as string) as IEvent[]
    };

    private myEvents: IEvent[];

    constructor(props: any) {
        super(props);
        this.state = this.intialState;
        this.myEvents = localStorage.getItem('myEvents') ? JSON.parse(localStorage.getItem('myEvents') as string) : [];
    }

    private isSignedUp = (id: number): boolean => {
        return this.myEvents.some((event: IEvent) => event.id === id);
    }

    onSignup = (event: IEvent) => {
        this.myEvents = localStorage.getItem('myEvents') ? JSON.parse(localStorage.getItem('myEvents') as string) : [];
        if (!this.isSignedUp(event.id)) {
            this.myEvents.push(event);
            localStorage.setItem('myEvents', JSON.stringify(this.myEvents));
            this.setState({
                ...this.state,
                events: this.myEvents
            });
        }
    };

    onRemove = (event: IEvent) => {
        this.myEvents = localStorage.getItem('myEvents') ? JSON.parse(localStorage.getItem('myEvents') as string) : [];
        if (this.isSignedUp(event.id)) {
            this.myEvents.splice(this.myEvents.findIndex((myEvent: IEvent) => myEvent.id === event.id), 1);
            localStorage.setItem('myEvents', JSON.stringify(this.myEvents));

            this.setState({
                ...this.state,
                events: this.myEvents
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