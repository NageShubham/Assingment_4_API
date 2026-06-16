import { test, expect } from '../fixtures/base.fixture';
import { AICVectorData } from '../data/test-vectors';
import { startTest, endTest, addRuntimeData, fetchRuntimeData, getTestDataFromDB, getTestDataFromFaker, getTestDataFromJsonFile } from '../../utils/utilities';
import dotenv from 'dotenv';
dotenv.config();

test.describe('TC_AIC_Tests', () => {


    for (const vector of AICVectorData) {
        test(`TC_AIC: artwork1 ${vector.artworkId} has correct artist`, async ({ aicRequest }, testInfo) => {

            let status = 'passed';

            // Start the test
            const { logs, startTime } = await startTest("TC_AIC: artwork ${vector.artworkId} has correct artist");

            let errorMessage: string | undefined;

            try {

                const response = await aicRequest.get(
                    `/api/v1/artworks/${vector.artworkId}?fields=id,title,artist_display`
                );

                expect(response.status()).toBe(200);

                const body = await response.json();
                expect(body.data.artist_display).toContain(vector.expectedArtistFragment);

            } catch (error: any) {
                status = 'failed';
                errorMessage = error.message;
                throw error;
            } finally {

                // End the test
                await endTest("TC_AIC: artwork ${vector.artworkId} has correct artist", logs, startTime, status, testInfo, errorMessage,);

            }

        });
    }

    //Verify the artwork title contains the expected title fragment
    for (const vector of AICVectorData) {
        test(`TC_AIC: artwork ${vector.artworkId} title matches`, async ({ aicRequest }, testInfo) => {


            let status = 'passed';

            // Start the test
            const { logs, startTime } = await startTest("TC_AIC: artwork ${vector.artworkId} title matches");

            let errorMessage: string | undefined;

            try {

                const response = await aicRequest.get(
                    `/api/v1/artworks/${vector.artworkId}?fields=id,title,artist_display`
                );

                expect(response.status()).toBe(200);

                const body = await response.json();
                expect(body.data.title).toContain(vector.expectedTitleFragment);

            } catch (error: any) {
                status = 'failed';
                errorMessage = error.message;
                throw error;
            } finally {

                // End the test
                await endTest("TC_AIC: artwork ${vector.artworkId} title matches", logs, startTime, status, testInfo, errorMessage,);

            }

        });
    }


    //Validate pagination structure on the first page
    test('TC_Validate_Pagination', async ({ aicRequest }, testInfo) => {


        let status = 'passed';

        // Start the test
        const { logs, startTime } = await startTest("TC_Validate_Pagination");

        let errorMessage: string | undefined;

        try {

            const response = await aicRequest.get(
                '/api/v1/artworks?page=1&limit=5&fields=id,title'
            );

            expect(response.status()).toBe(200);

            const body = await response.json();

            // Exactly 5 records on the first page
            expect(body.data).toHaveLength(5);

            // Pagination meta
            expect(body.pagination.total).toBeGreaterThan(100000);
            expect(body.pagination.total_pages).toBeGreaterThan(1);
            expect(body.pagination.current_page).toBe(1);

        } catch (error: any) {
            status = 'failed';
            errorMessage = error.message;
            throw error;
        } finally {

            // End the test
            await endTest("TC_Validate_Pagination", logs, startTime, status, testInfo, errorMessage,);

        }

    });



    //Artwork search returns relevant results
    test('TC_Artwork_Search_Res', async ({ aicRequest }, testInfo) => {

        // Add runtime data 
        //await addRuntimeData(testInfo.title, data);

        let status = 'passed';

        // Start the test
        const { logs, startTime } = await startTest("TC_Artwork_Search_Res");

        let errorMessage: string | undefined;

        try {

            const response = await aicRequest.get(
                '/api/v1/artworks/search?q=monet&fields=id,title,artist_display&limit=10'
            );

            expect(response.status()).toBe(200);

            const body = await response.json();
            expect(Array.isArray(body.data)).toBe(true);
            expect(body.data.length).toBeGreaterThan(0);

            // At least one result's artist_display must reference Monet
            const hasMonet = body.data.some(
                (artwork: { artist_display?: string }) =>
                    artwork.artist_display?.includes('Monet')
            );
            expect(hasMonet).toBe(true);

        } catch (error: any) {
            status = 'failed';
            errorMessage = error.message;
            throw error;
        } finally {

            // End the test
            await endTest("TC_Artwork_Search_Res", logs, startTime, status, testInfo, errorMessage,);

        }

    });
});