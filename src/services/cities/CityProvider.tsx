import axios, { AxiosResponse, CancelToken } from 'axios';
import { ICity } from './ICity';

export async function getCities(cancelToken?: CancelToken): Promise<AxiosResponse<ICity[]>> {
    if (navigator.onLine) {
        const response: AxiosResponse<ICity[]> = await axios.get('https://www.mocky.io/v2/5d76aea23200000462297c7f', {
            cancelToken: cancelToken
        });
        localStorage.setItem('allCities', JSON.stringify(response));
        return response;
    }
    return JSON.parse((localStorage.getItem('allCities') ? localStorage.getItem('allCities') : {}) as string);
}
