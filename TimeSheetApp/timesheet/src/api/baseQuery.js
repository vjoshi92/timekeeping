import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setTokenExp } from 'store/slice/HomeSlice';
export const baseUrl = '/sap/opu/odata/sap/';

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
        let response = "";
        if (api?.endpoint === "makeBatchCall" || api?.endpoint === "makeApprovalBatchCall") {
            response = await metadataBaseQuery(args, api, extraOptions);
        } else {
            response = await customBaseQuery(args, api, extraOptions);
        }

        if (response?.error?.originalStatus === 403) {
            api.dispatch(setTokenExp(true));
        }

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
    prepareHeaders: async (headers) => {

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
        // headers.set("Accept", "application/json");
        headers.set('Accept', 'application/xml');
        return headers;
    },
});

export const metadataBaseQuery = async (args, api, extraOptions = {}) => {
    try {
        const response = await metaDataCustomBaseQuery(args, api, extraOptions);
        const statusCodes = [];
        if (api?.endpoint === "makeBatchCall" || api?.endpoint === "makeApprovalBatchCall"
            || api?.endpoint === "makeDeleteBatchCall") {
            if (response?.error) {
                const boundary = response?.error?.data.match(/boundary=(.*)/)[1];
                const parts = response?.error?.data.split(`--${boundary}`);
                parts.forEach(part => {
                    const match = part.match(/HTTP\/1\.1\s(\d{3})\s/);
                    if (match) {
                        statusCodes.push(parseInt(match[1], 10));
                    }
                });
            }
            if (statusCodes.length > 0) {
                const errorCodes = statusCodes.filter(x => (x === 400 || x === 404 || x === 500));
                if (errorCodes && errorCodes?.length > 0) {
                    return {
                        error: {
                            data: {
                                error: {
                                    message: {
                                        value:
                                            "An error occurred while processing your request. Please contact the support team for assistance."
                                    }

                                }
                            }
                        }
                    }
                }
                console.log(`Batch call: HTTP Status Code: ${statusCodes}`);
            }
        }

        return { data: response?.data?.d ?? response.data };
    } catch (error) {
        console.log('error', error);
    }
};
