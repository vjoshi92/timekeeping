import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const baseUrl = '/sap/opu/odata/sap/';

// https://jmwwdad1.jmawireless.com/sap/opu/odata/sap/HCMFAB_COMMON_SRV/EmployeeDetailSet?$format=json

console.log("baseUrl" , baseUrl)

const customBaseQuery = fetchBaseQuery({
    baseUrl,
    prepareHeaders: async (headers, { type }) => {
        if (type === "mutation") {
            const response = await fetch(
                `${baseUrl}HCMFAB_COMMON_SRV/EmployeeDetailSet?$format=json`,
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

        // console.log("response" ,response)

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
