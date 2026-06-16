import { test } from '../fixtures/base.fixture';
import { expect } from '@playwright/test';

import { startTest, endTest, addRuntimeData, fetchRuntimeData, getTestDataFromDB, getTestDataFromFaker, getTestDataFromJsonFile } from '../../utils/utilities';
import dotenv from 'dotenv';
dotenv.config();

let filmUrl = '';
let filmTitle = '';
let starshipName = '';
let maxSpeed: string | number = '';

test.describe('TC_001 API TestCase Template', () => {


    test(`Cross-API data aggregation chain`, async ({ request }, testInfo) => {

        let status = 'passed';

        // Start the test
        const { logs, startTime } = await startTest("TC_001 API TestCase Template");

        let errorMessage: string | undefined;

        try {
            const personRes = await request.get('/api/people/1/');
            expect(personRes.status()).toBe(200);

            const person = await personRes.json();
            filmUrl = person.films[0];

            expect(Array.isArray(person.films)).toBeTruthy();
            expect(person.films.length).toBeGreaterThan(0);

        } catch (error: any) {
            status = 'failed';
            errorMessage = error.message;
            throw error;
        } finally {

            // End the test
            await endTest("TC_001 API TestCase Template", logs, startTime, status, testInfo, errorMessage,);

        }

    });

    test(`Starship`, async ({ request }, testInfo) => {

        // Add runtime data 
        //await addRuntimeData(testInfo.title, data);

        let status = 'passed';

        // Start the test
        const { logs, startTime } = await startTest("Starship");

        let errorMessage: string | undefined;

        try {
            const filmRes = await request.get(filmUrl);
            expect(filmRes.status()).toBe(200);

            const film = await filmRes.json();
            filmTitle = film.title;

            expect(film.title).toBeTruthy();
            expect(Array.isArray(film.starships)).toBeTruthy();
            expect(film.starships.length).toBeGreaterThan(0);


        } catch (error: any) {
            status = 'failed';
            errorMessage = error.message;
            throw error;
        } finally {

            // End the test
            await endTest("Starship", logs, startTime, status, testInfo, errorMessage,);

        }

    });

    test(`AIC API Validation`, async ({ request }, testInfo) => {

        let status = 'passed';

        // Start the test
        const { logs, startTime } = await startTest("AIC API Validation");

        let errorMessage: string | undefined;

        try {
            const aicRes = await request.get(process.env.api_base_URL + '/artworks?page=1&limit=3&fields=id,title');
            expect(aicRes.status()).toBe(200);
            const aicData = await aicRes.json();
            expect(Array.isArray(aicData.data)).toBeTruthy();
            expect(aicData.data.length).toBe(3);

        } catch (error: any) {
            status = 'failed';
            errorMessage = error.message;
            throw error;
        } finally {

            // End the test
            await endTest("AIC API Validation", logs, startTime, status, testInfo, errorMessage,);

        }

    });

    test(`POST to JSONPlaceholder`, async ({ request }, testInfo) => {

     
        let status = 'passed';

        // Start the test
        const { logs, startTime } = await startTest("POST to JSONPlaceholder");

        let errorMessage: string | undefined;

        try {
            const postRes = await request.post(process.env.jsonplaceholder_base_url + '/posts',
                {
                    data: {
                        filmTitle: filmTitle,
                        starshipName: starshipName,
                        maxSpeed: maxSpeed,
                    },
                }
            );

            expect(postRes.status()).toBe(201);


        } catch (error: any) {
            status = 'failed';
            errorMessage = error.message;
            throw error;
        } finally {

            // End the test
            await endTest("POST to JSONPlaceholder", logs, startTime, status, testInfo, errorMessage,);

        }

    });

    test(`SWAPI all starships statistical validation`, async ({ request }, testInfo) => {

        let status = 'passed';

        // Start the test
        const { logs, startTime } = await startTest("SWAPI all-starships statistical validation");

        let errorMessage: string | undefined;

        try {
            const res = await request.get('/api/starships/');
            expect(res.status()).toBe(200);

            const data = await res.json();

            const starships = Array.isArray(data) ? data : data.results;

            expect(Array.isArray(starships)).toBeTruthy();

            const speeds: number[] = [];

            for (const ship of starships) {

                const speed = ship.max_atmosphering_speed;

                // filter invalid values
                if (
                    speed &&
                    speed !== 'unknown' &&
                    speed !== 'n/a'
                ) {
                    const parsed = parseInt(speed, 10);

                    if (!isNaN(parsed)) {
                        speeds.push(parsed);
                    }
                }
            }

            // must have enough valid values
            expect(speeds.length).toBeGreaterThanOrEqual(5);

            const maxSpeed = Math.max(...speeds);

            expect(maxSpeed).toBeGreaterThan(1000);




        } catch (error: any) {
            status = 'failed';
            errorMessage = error.message;
            throw error;
        } finally {

            // End the test
            await endTest("SWAPI all-starships statistical validation", logs, startTime, status, testInfo, errorMessage,);

        }

    });

});