import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const baseUrl = '/sap/opu/odata/sap/ZCO_CAPEX_V1_SRV/';

const customBaseQuery = fetchBaseQuery({
    baseUrl,
    prepareHeaders: async (headers, { type }) => {
        if (type === "mutation") {
            const response = await fetch(
                `${baseUrl}/User_DetailsSet`,
                {
                    method: "GET",
                    headers: {
                        "X-CSRF-Token": "Fetch",
                    },
                }
            );

            headers.set("X-CSRF-Token", response.headers.get("X-CSRF-Token"));
        }
        headers.set("Accept", "application/json");

        return headers;
    },
});

export const baseQuery = async (args, api, extraOptions = {}) => {
    try {
        const response = await customBaseQuery(args, api, extraOptions);

        return {
            data: response?.data?.d ?? response.data,
            meta: response.meta,
            error: response?.error?.data?.error?.message?.value,
        };
    } catch (error) {
        console.log('error', error);
    }
};

export const metaDataCustomBaseQuery = fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
        headers.set('Accept', 'application/xml');
        return headers;
    },
});

export const metadataBaseQuery = async (args, api, extraOptions = {}) => {
    try {
        const response = await metaDataCustomBaseQuery(args, api, extraOptions);
        return { data: response?.data?.d ?? response.data };
    } catch (error) {
        console.log('error', error);
    }
};
