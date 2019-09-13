import React from "react";

import { IEvent } from "../../services/events/IEvent";
import { EventList } from "../../components/eventList/EventList";

const AllEvents: React.FC = () => {
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
    return <EventList onSignup={onSignup} onRemove={onRemove} />
}

export default AllEvents;