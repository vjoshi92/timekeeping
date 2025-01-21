import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export const TimesheetApi = createApi({
    reducerPath: "TimesheetApi",
    baseQuery,
    endpoints: (builder) => ({
        getUserData: builder.query({
            query: () => ({
                url: "/HCMFAB_COMMON_SRV/EmployeeDetailSet",
                method: "GET",
            })
        }),
        getWbsData: builder.query({
            query: () => {
                // Access the baseUrl from baseQuery configuration
                const baseUrl = baseQuery.baseUrl;
                const endpointUrl = "ZCATS_NOFO_TIMESHEET_SRV/WBSSet?$format=json";
                const fullUrl = `${baseUrl}${endpointUrl}`;

                console.log("Base URL:", baseUrl);
                console.log("Endpoint URL:", endpointUrl);
                console.log("Full constructed URL:", fullUrl);

                return {
                    url: endpointUrl,
                    method: "GET",
                    header:("Accept", "*/*")
                }
            }
        })
    })
})

export const { useGetUserDataQuery, useGetWbsDataQuery } = TimesheetApi;