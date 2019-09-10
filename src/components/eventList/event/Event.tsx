import React from 'react';
import { IEvent } from '../../../services/events/IEvent';
import './Event.css';
import { DateUtils } from '../../../utils/DateUtils';
import { ICity } from '../../../services/cities/ICity';

interface IProps {
    event: IEvent;
    onSignup: Function;
    onRemove: Function;
}

const Event: React.FC<Readonly<IProps>> = (props: IProps) => {
    let myEvents: IEvent[] = localStorage.getItem('myEvents') ? JSON.parse(localStorage.getItem('myEvents') as string) : [];

    const isSignedUp = (): boolean => {
        return myEvents.some((event: IEvent) => event.id === props.event.id);
    }

    const onSignup = () => {
        props.onSignup(props.event);
    };

    const onRemove = () => {
        props.onRemove(props.event);
    };

    return (
        <ul className="event">
            <li className="event--time">
                {DateUtils.extractOnlyTime(new Date(props.event.startDate))}
            </li>
            <li className="event--details">
                <span className="event--details-name">{props.event.name}
                    {props.event.isFree && <span className="event-free">Free!</span>}
                </span>
                <span className="event--details-city">{(props.event.city as ICity).name}&nbsp;-&nbsp;
                {DateUtils.durationInHoursAndMinutes(new Date(props.event.startDate), new Date(props.event.endDate))}
                </span>
            </li>
            <li className="event--buttons">
                {!isSignedUp() && <button className="button button-default" onClick={onSignup}>Signup</button>}
                {isSignedUp() && <button className="button button-default" onClick={onRemove}>Remove</button>}
            </li>
        </ul>
    );
}

export default Event;