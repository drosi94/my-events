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
    eventsByDay: { [key: number]: IEvent[] };
    cities: ICity[];
}

interface IProps {
    events?: IEvent[];
    myEvents?: boolean;
    onSignup: Function;
    onRemove: Function;
}

export class EventList extends React.Component<IProps, IState> {
    readonly initialState: Readonly<IState>;

    private _sourceEvents: CancelTokenSource | undefined;
    private _sourceCities: CancelTokenSource | undefined;

    constructor(props: IProps) {
        super(props);
        this.initialState = {
            isFetchingData: false,
            events: this.props.events || [],
            eventsByDay: {},
            cities: []
        }
        this.state = this.initialState;
    }

    onSignup = (event: IEvent) => {
        this.props.onSignup(event);
    }

    onRemove = (event: IEvent) => {
        this.props.onRemove(event);
    }

    componentDidUpdate(prevProps: IProps, prevState: IState, snapshot: any) {
        if (this.state.events !== this.props.events && this.props.myEvents) {
            this.setState({
                ...this.state,
                events: this.props.events as IEvent[],
                eventsByDay: this.groupByDate(this.props.events ? this.props.events : [] as IEvent[])
            })
        }
    }

    render() {
        const hasMoreThanOneEvent: boolean = this.state.events.length > 1;
        return (
            <div>
                {Object.keys(this.state.eventsByDay).map((key1: any) => {
                    return (
                        <div key={key1} className="events-list">
                            <ul>
                                {
                                    this.state.eventsByDay[key1] &&
                                    <span className="events-list--date">{DateUtils.extractOnlyDate(new Date(this.state.eventsByDay[key1][0].startDate))}</span>
                                }
                                {this.state.eventsByDay[key1].map((event: IEvent) => {
                                    return (
                                        <li key={event.id} className={`${hasMoreThanOneEvent ? 'events-list--border ' : ''}`}>
                                            <Event event={event} onSignup={this.onSignup} onRemove={this.onRemove} />
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
            this.setState({
                ...this.state,
                isFetchingData: true
            });
            await this.fetchAllCities();
            await this.fetchAllEvents();
        }
        this.setState({
            ...this.state,
            eventsByDay: this.groupByDate(this.state.events),
            isFetchingData: false,
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
        } catch (error) {
            if (axios.isCancel(error)) {
                console.log('Request canceled', error);
            } else {
                console.log(error);
            }
        }
    }

    private async fetchAllEvents() {
        try {
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

    private groupByDate(events: IEvent[]): { [key: number]: IEvent[] } {
        let eventsByDay: { [key: number]: IEvent[] } = {};
        events.forEach((event: IEvent) => {
            let d: Date = new Date(event.startDate);
            const date: number = Math.floor(d.getTime() / (1000 * 60 * 60 * 24));
            eventsByDay[date] = eventsByDay[date] || [];
            eventsByDay[date].push(event);
            eventsByDay = Object.keys(eventsByDay).reduce((a: any, c: any) => (a[c] = eventsByDay[c], a), {});
        });
        this.setState({
            ...this.state,
            eventsByDay
        });
        return eventsByDay;
    }

    componentWillUnmount() {
        if (this._sourceEvents) {
            this._sourceEvents.cancel('GET Events - Operation Cancelled');
        }

        if (this._sourceCities) {
            this._sourceCities.cancel('GET Cities - Operation Cancelled');
        }
    }
}