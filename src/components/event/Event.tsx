import React from 'react';
import { IEvent } from '../../services/events/IEvent';
import './Event.css';
interface IProps {
    event: IEvent;
}

const Event: React.FC<Readonly<IProps>> = (props: IProps) => {
    return (
            <ul className="event">
                <li className="event--time">{props.event.startDate}</li>
                <li className="event--name">{props.event.name}</li>
                <li className="event--buttons">
                    <button>Signup</button>
                </li>
            </ul>
    );
}

export default Event;