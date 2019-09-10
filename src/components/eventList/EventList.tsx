import React from 'react';
import axios, { CancelTokenSource, AxiosResponse } from 'axios';

import './EventList.css';

import { getEvents } from '../../services/events/EventsProvider'
import { IEvent } from '../../services/events/IEvent';
import Event from '../event/Event';


interface IState {
    isFetchingData: boolean;
    events: IEvent[];
}

interface IProps {
    events?: IEvent[];
}

export class EventList extends React.Component<IProps, IState> {
    readonly initialState: Readonly<IState>;

    private _source: CancelTokenSource | undefined;

    private eventsByDay: { [key: number]: IEvent[] };

    constructor(props: IProps) {
        super(props);
        this.initialState = {
            isFetchingData: false,
            events: this.props.events || []
        }
        this.state = this.initialState;
        this.eventsByDay = {};
    }

    render() {
        const hasMoreThanOneEvent: boolean = this.state.events.length > 1;
        return (
            <div>
                {Object.keys(this.eventsByDay).map((key1: any) => {
                    return (
                        <div key={key1} className="events-list">
                            <ul>
                                {this.eventsByDay[key1].map((event: IEvent) => {
                                    return (
                                        <li key={event.id} className={`${hasMoreThanOneEvent ? 'events-list--border ' : ''}`}>
                                            <Event event={event} />
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    )
                })}
            </div>
        );
    }

    async componentDidMount() {
        if (!this.props.events) {
            await this.fetchAllEvents();
        }
        this.groupByDate();
        this.setState({
            ...this.state,
            isFetchingData: false
        });
    }

    private async fetchAllEvents() {
        try {
            this.setState({
                ...this.state,
                isFetchingData: true
            });
            this._source = axios.CancelToken.source();
            const response: AxiosResponse<IEvent[]> = await getEvents(this._source.token);
            this.setState({
                ...this.state,
                events: response.data
            });
        } catch (error) {
            if (axios.isCancel(error)) {
                console.log('Request canceled', error);
            } else {
                console.log(error);
            }
        }
    }

    private groupByDate(): void {
        this.state.events.forEach((event: IEvent, index: number) => {
            let d: Date = new Date(event.startDate);
            const date: number = Math.floor(d.getTime() / (1000 * 60 * 60 * 24));
            this.eventsByDay[date] = this.eventsByDay[date] || [];
            this.eventsByDay[date].push(event);
            this.eventsByDay = Object.keys(this.eventsByDay).reduce((a: any, c: any) => (a[c] = this.eventsByDay[c], a), {});
        });
    }

    componentWillUnmount() {
        if (this._source) {
            this._source.cancel('Operation Cancelled');
        }
    }
}