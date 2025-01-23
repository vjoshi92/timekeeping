import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export const TimesheetApi = createApi({
    reducerPath: "TimesheetApi",
    baseQuery,
    endpoints: (builder) => ({
        getUserData: builder.query({
            query: () => ({
                url: "/HCMFAB_COMMON_SRV/EmployeeDetailSet?$format=json",
                method: "GET",
            })
        }),
        getWbsData: builder.query({
            query: () => {
                const URL = "ZCATS_NOFO_TIMESHEET_SRV/WBSSet?$format=json";
                return {
                    url: URL,
                    method: "GET",
                    header: ("Accept", "*/*")
                }
            }
        }),
        getProjectData: builder.query({
            query: () => {
                const URL = "ZCATS_NOFO_TIMESHEET_SRV/ProjectsSet?$format=json";
                return {
                    url: URL,
                    method: "GET",
                    header: ("Accept", "*/*")
                }
            }
        }),
        makeBatchCall: builder.mutation({
            query: ({ body }) => {
                return {
                    url: "HCMFAB_TIMESHEET_MAINT_SRV/$batch",
                    method: 'POST',
                    headers: {
                        'Content-Type': 'multipart/mixed; boundary=batch'
                    },

                    body: body,
                };
            },
        }),

    })
})

export const { useGetUserDataQuery, useGetWbsDataQuery, useGetProjectDataQuery, useMakeBatchCallMutation } = TimesheetApi;