import axios from 'axios';

export async function getEvents(): Promise<any> {
    return await axios.get('https://www.mocky.io/v2/5d76bb3f3200003473297cb1');
}
