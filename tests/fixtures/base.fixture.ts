import { test as base, APIRequestContext } from "../../utils/fixtures";
import { request } from "@playwright/test";
export { expect } from '@playwright/test'


type Fixtures = {
    swapiRequest: APIRequestContext;
    aicRequest: APIRequestContext;
};

export const test = base.extend<Fixtures>({
    swapiRequest: async ({ }, use) => {
        const swapiRequest = await request.newContext({
            baseURL: "https://swapi.info",
            extraHTTPHeaders: {
                Accept: "application/json",
            },
        });

        await use(swapiRequest);
        await swapiRequest.dispose();
    },

    aicRequest: async ({ }, use) => {
        const aicRequest = await request.newContext({
            baseURL: "https://api.artic.edu",
            extraHTTPHeaders: {
                Accept: "application/json",
            },
        });

        await use(aicRequest);
        await aicRequest.dispose();
    },

});
