import axios from 'axios';

export async function getCities(): Promise<any> {
    return await axios.get('https://www.mocky.io/v2/5d76aea23200000462297c7f');
}
