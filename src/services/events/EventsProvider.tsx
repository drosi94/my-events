import axios from 'axios';

import {Event} from './Event';

export async function getEvents(): Promise<Event[]> {
    return await axios.get('https://www.mocky.io/v2/5d76bb3f3200003473297cb1');
}
