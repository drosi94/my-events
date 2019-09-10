import React from 'react';
import axios, { CancelTokenSource, AxiosResponse } from 'axios';

import './EventList.css';

import { getEvents } from '../../services/events/EventsProvider'
import { IEvent } from '../../services/events/IEvent';
import Event from './event/Event';
import { DateUtils } from '../../utils/DateUtils';
import { getCities } from '../../services/cities/CityProvider';
import { ICity } from '../../services/cities/ICity';


interface IState {
    isFetchingData: boolean;
    events: IEvent[];
    cities: ICity[];
}

interface IProps {
    events?: IEvent[];
}

export class EventList extends React.Component<IProps, IState> {
    readonly initialState: Readonly<IState>;

    private _sourceEvents: CancelTokenSource | undefined;
    private _sourceCities: CancelTokenSource | undefined;

    private eventsByDay: { [key: number]: IEvent[] };

    constructor(props: IProps) {
        super(props);
        this.initialState = {
            isFetchingData: false,
            events: this.props.events || [],
            cities: []
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
                                <span className="events-list--date">{DateUtils.extractOnlyDate(new Date(this.eventsByDay[key1][0].startDate))}</span>
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
            await this.fetchAllCities();
            await this.fetchAllEvents();
        }
        this.groupByDate();
        this.setState({
            ...this.state,
            isFetchingData: false
        });
    }

    private async fetchAllCities() {
        try {
            this._sourceCities = axios.CancelToken.source();
            const response: AxiosResponse<ICity[]> = await getCities(this._sourceCities.token);
            this.setState({
                ...this.state,
                cities: response.data
            })
        } catch(error) {
            if (axios.isCancel(error)) {
                console.log('Request canceled', error);
            } else {
                console.log(error);
            }
        }
    }

    private async fetchAllEvents() {
        try {
            this.setState({
                ...this.state,
                isFetchingData: true
            });
            this._sourceEvents = axios.CancelToken.source();
            const response: AxiosResponse<IEvent[]> = await getEvents(this._sourceEvents.token);
            this.setState({
                ...this.state,
                events: response.data.map((event: IEvent) => {
                    event.city = this.state.cities.find((city: ICity) => city.id === event.city);
                    return event;
                })
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
        if (this._sourceEvents) {
            this._sourceEvents.cancel('Operation Cancelled');
        }

        if (this._sourceCities) {
            this._sourceCities.cancel('Operation Cancelled');
        }
    }
}