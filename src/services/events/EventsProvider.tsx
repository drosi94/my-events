import axios, { CancelToken, AxiosResponse } from 'axios';

import {IEvent} from './IEvent';

export async function getEvents(cancelToken?: CancelToken): Promise<AxiosResponse<IEvent[]>> {
    return await axios.get('https://www.mocky.io/v2/5d76bb3f3200003473297cb1', {
        cancelToken: cancelToken
    });
}
