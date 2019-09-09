import React from 'react';

import mockAxios from 'axios';

import { getCities } from './CityProvider';


// First use case - Get cities
it('call cities mocking API and returns a list of cities - should success', async () => {
    // Arrange
    (mockAxios.get as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve(
            [
                {
                    "id": 1,
                    "name": "Barcelona"
                },
                {
                    "id": 2,
                    "name": "Amsterdam"
                },
                {
                    "id": 3,
                    "name": "Seville"
                },
                {
                    "id": 4,
                    "name": "London"
                },
                {
                    "id": 5,
                    "name": "London"
                },
                {
                    "id": 6,
                    "name": "Palma de Mallorca"
                },
                {
                    "id": 7,
                    "name": "Dusseldorf"
                },
                {
                    "id": 8,
                    "name": "Barcelona"
                },
                {
                    "id": 9,
                    "name": "Dusseldorf"
                },
                {
                    "id": 10,
                    "name": "Edimburg"
                }
            ]
        ));

    // Act
    const cities: any[] = await getCities();
    const barcelona = cities ? cities.find((city: any) => city.id === 1): null;

    // Assert
    expect(cities).toHaveLength(10);
    expect(barcelona).not.toBeNull();
    expect(barcelona.name).toBe('Barcelona');

});
