import { expect, test } from '../../utils/fixtures';
import {SWVectorsData } from "../../tests/data/test-vectors";
//import { startTest, endTest } from '../../utils/utilities';
import { startTest, endTest, addRuntimeData, fetchRuntimeData, getTestDataFromDB, getTestDataFromFaker, getTestDataFromJsonFile } from '../../utils/utilities';
import dotenv from 'dotenv';
dotenv.config();

test.describe('SWAPI Tests', () => {

    // Film count validation (5 sub-tests)

    for (const swVector of SWVectorsData) {

        test(`T1 (film count): ${swVector.personName}`, async ({ request: swapiRequest }, testInfo) => {

            let status = 'passed';
            const { logs, startTime } = await startTest(`T1_${swVector.personName}`);
            let errorMessage: string | undefined;

            try {
                const res = await swapiRequest.get(`/api/people/${swVector.personId}/`);
                expect(res.status()).toBe(200);
                const data = await res.json();

                expect(data.name).toBe(swVector.personName);
                expect(data.films.length).toBe(swVector.filmCount);

            } catch (error: any) {
                status = 'failed';
                errorMessage = error.message;
                throw error;
            } finally {
                await endTest(`T1_${swVector.personName}`, logs, startTime, status, testInfo, errorMessage);
            }
        });

    }


    // Homeworld validation (5 sub-tests)

    for (const swVector of SWVectorsData) {

        test(`T2 (homeworld): ${swVector.personName}`, async ({ request: swapiRequest }, testInfo) => {

            let status = 'passed';
            const { logs, startTime } = await startTest(`T2_${swVector.personName}`);
            let errorMessage: string | undefined;

            try {
                const res = await swapiRequest.get(`/api/people/${swVector.personId}/`);
                expect(res.status()).toBe(200);

                const person = await res.json();

                const hwRes = await swapiRequest.get(person.homeworld);
                expect(hwRes.ok()).toBeTruthy();

                const planet = await hwRes.json();

                expect(typeof planet.name).toBe('string');
                expect(planet.name.length).toBeGreaterThan(0);
                expect(typeof planet.population).toBe('string');

            } catch (error: any) {
                status = 'failed';
                errorMessage = error.message;
                throw error;
            } finally {
                await endTest(`T2_${swVector.personName}`, logs, startTime, status, testInfo, errorMessage);
            }
        });

    }


    //  Starship validation (5 sub // =========================
    for (const swVector of SWVectorsData) {

        test(`T3 (starships): ${swVector.personName}`, async ({ request: swapiRequest }, testInfo) => {

            let status = 'passed';
            const { logs, startTime } = await startTest(`T3_${swVector.personName}`);
            let errorMessage: string | undefined;

            try {
                const res = await swapiRequest.get(`/api/people/${swVector.personId}/`);
                expect(res.status()).toBe(200);

                const data = await res.json();

                expect(data.starships.length).toBe(swVector.pilotedStarships);

            } catch (error: any) {
                status = 'failed';
                errorMessage = error.message;
                throw error;
            } finally {
                await endTest(`T3_${swVector.personName}`, logs, startTime, status, testInfo, errorMessage);
            }
        });

    }



    //  All people validation

    test('SWAPI: all people have required fields', async ({ request: swapiRequest }, testInfo) => {

        let status = 'passed';
        const { logs, startTime } = await startTest("T4_all_people");
        let errorMessage: string | undefined;

        try {
            const res = await swapiRequest.get('/api/people/');
            expect(res.ok()).toBeTruthy();

            const data = await res.json();

            const people = Array.isArray(data) ? data : data.results;

            expect(Array.isArray(people)).toBeTruthy();

            // requirement: array length > 80
            expect(people.length).toBeGreaterThan(80);

            people.forEach((person: any) => {
                expect(person).toHaveProperty('name');
                expect(person).toHaveProperty('films');
                expect(person).toHaveProperty('starships');
                expect(person).toHaveProperty('vehicles');
                expect(person).toHaveProperty('homeworld');
            });

        } catch (error: any) {
            status = 'failed';
            errorMessage = error.message;
            throw error;
        } finally {
            await endTest("T4_all_people", logs, startTime, status, testInfo, errorMessage);
        }
    });

});