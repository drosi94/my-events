import React from 'react';
import { IEvent } from '../../../services/events/IEvent';
import './Event.css';
import { DateUtils } from '../../../utils/DateUtils';
import { ICity } from '../../../services/cities/ICity';
import ReactModal from 'react-modal';

ReactModal.setAppElement(document.getElementById('root') as HTMLElement);

interface IState {
    modalIsOpen: boolean;
    refreshEvents: boolean;
}

interface IProps {
    event: IEvent;
    onSignup: Function;
    onRemove: Function;
}


export default class Event extends React.Component<IProps, IState> {
    readonly initialState: Readonly<IState> = {
        modalIsOpen: false,
        refreshEvents: false
    }

    constructor(props: IProps) {
        super(props);
        this.state = this.initialState;
    }

    isSignedUp = (): boolean => {
        const myEvents: IEvent[] = localStorage.getItem('myEvents') ? JSON.parse(localStorage.getItem('myEvents') as string) : [];
        return myEvents.some((event: IEvent) => event.id === this.props.event.id);
    }


    onSignup = () => {
        this.props.onSignup(this.props.event);
        this.setState({
            ...this.state,
            refreshEvents: true
        });
        this.closeModal();
    };

    onRemove = () => {
        this.props.onRemove(this.props.event);
        this.setState({
            ...this.state,
            refreshEvents: true
        });
    };

    openModal = () => {
        this.setState({
            ...this.state,
            modalIsOpen: true
        });
    }

    closeModal = () => {
        this.setState({
            ...this.state,
            modalIsOpen: false
        });
    }

    generateModalBodyText(): string {
        return `
            You're about to sign up for ${this.props.event.name}. This event takes place the ${DateUtils.extractOnlyDate(new Date(this.props.event.startDate))}
             in ${(this.props.event.city as ICity).name}
        `;
    }

    render() {
        return (
            <div>
                <ul className="event">
                    <li className="event--time">
                        {DateUtils.extractOnlyTime(new Date(this.props.event.startDate))}
                    </li>
                    <li className="event--details">
                        <span className="event--details-name">{this.props.event.name}
                            {this.props.event.isFree && <span className="event-free">Free!</span>}
                        </span>
                        <span className="event--details-city">{(this.props.event.city as ICity).name}&nbsp;-&nbsp;
                {DateUtils.durationInHoursAndMinutes(new Date(this.props.event.startDate), new Date(this.props.event.endDate))}
                        </span>
                    </li>
                    <li className="event--buttons">
                        {!this.isSignedUp() && <button className="button button-default" onClick={this.openModal}>Signup</button>}
                        {this.isSignedUp() && <button className="button button-default" onClick={this.onRemove}>Remove</button>}
                    </li>
                </ul>
                <ReactModal
                    isOpen={this.state.modalIsOpen}
                    contentLabel="Join event"
                    shouldCloseOnOverlayClick={true}
                    shouldCloseOnEsc={true}
                    className="modal">
                    <div className="modal--title">
                        <span className="label">Join to event</span>
                        <span className="times" onClick={this.closeModal}>x</span>
                    </div>
                    <div className="modal--body">
                        <span className="text">
                            {this.generateModalBodyText()}
                            <p>Are you sure?</p>
                        </span>
                    </div>
                    <div className="modal--footer">
                        <button className="button button-default" onClick={this.closeModal}>Cancel</button>
                        <button className="button button-default" onClick={this.onSignup}>Join</button>
                    </div>
                </ReactModal>
            </div >
        );
    }
}