import React from 'react';
import axios, { CancelTokenSource, AxiosResponse } from 'axios';

import './EventList.css';

import { getEvents } from '../../services/events/EventsProvider'
import { Event } from '../../services/events/Event';

interface IState {
    isFetchingData: boolean;
    events: Event[];
}

interface IProps {
    events?: Event[];
}

export class EventList extends React.Component<IProps, IState> {
    readonly initialState: Readonly<IState>;

    private _source: CancelTokenSource | undefined;

    constructor(props: IProps) {
        super(props);
        this.initialState = {
            isFetchingData: false,
            events: this.props.events || []
        }
        this.state = this.initialState;
    }

    render() {
        return (
            <div className="events-list">
                <ul>
                    {this.state.events.map((event: Event) => {
                        return <li key={event.id}>{event.name}</li>
                    })}
                </ul>
            </div>
        );
    }

    async componentDidMount() {
        if (!this.props.events){
            await this.fetchAllEvents();
        }
    }

    private async fetchAllEvents() {
        try {
            this.setState({
                ...this.state,
                isFetchingData: true
            });
            this._source = axios.CancelToken.source();
            const response: AxiosResponse<Event[]> = await getEvents(this._source.token);
            this.setState({
                ...this.state,
                isFetchingData: false,
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

    componentWillUnmount() {
        if (this._source) {
            this._source.cancel('Operation Cancelled');
        }
    }
}