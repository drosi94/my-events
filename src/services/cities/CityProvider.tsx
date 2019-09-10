import axios, { AxiosResponse, CancelToken } from 'axios';
import { ICity } from './ICity';

export async function getCities(cancelToken?: CancelToken): Promise<AxiosResponse<ICity[]>> {
    return await axios.get('https://www.mocky.io/v2/5d76aea23200000462297c7f', {
        cancelToken: cancelToken
    });
}
