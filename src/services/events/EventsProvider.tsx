import axios, { CancelToken, AxiosResponse } from 'axios';

import {IEvent} from './IEvent';

export async function getEvents(cancelToken?: CancelToken): Promise<AxiosResponse<IEvent[]>> {
    if (navigator.onLine) {
        const response: AxiosResponse<IEvent[]> = await axios.get('https://www.mocky.io/v2/5d76bb3f3200003473297cb1', {
            cancelToken: cancelToken
        });
        localStorage.setItem('allEvents', JSON.stringify(response));
        return response;
    }
    return JSON.parse((localStorage.getItem('allEvents') ? localStorage.getItem('allEvents') : {}) as string);
}