import React from 'react';
import { IEvent } from '../../../services/events/IEvent';
import './Event.css';
import { DateUtils } from '../../../utils/DateUtils';

interface IProps {
    event: IEvent;
}

const Event: React.FC<Readonly<IProps>> = (props: IProps) => {
    return (
        <ul className="event">
            <li className="event--time">
                {DateUtils.extractOnlyTime(new Date(props.event.startDate))}
            </li>
            <li className="event--details">
                <span className="event--details-name">{props.event.name}
                    {props.event.isFree && <span className="event-free">Free!</span>}
                </span>
                <span className="event--details-city">{props.event.city}
                    <span className="event--details-duration">
                        {DateUtils.durationInHoursAndMinutes(new Date(props.event.startDate), new Date(props.event.endDate))}
                    </span>
                </span>
            </li>
            <li className="event--buttons">
                <button>Signup</button>
            </li>
        </ul>
    );
}

export default Event;