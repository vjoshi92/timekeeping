import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export const TimesheetDashboardApi = createApi({
    reducerPath: "TimesheetDashboardApi",
    baseQuery,
    endpoints: (builder) => ({
        getDateWiseDetails: builder.query({
            query: ({ startDate, endDate }) => {
               const URL = `HCMFAB_TIMESHEET_MAINT_SRV/WorkCalendarCollection?$expand=TimeEntries&$filter=StartDate eq datetime'${startDate}' and EndDate eq datetime'${endDate}' and Pernr eq '09000993' and ProfileId eq 'ZJMA1'&$format=json`;

                return {
                    url: URL,
                    method: "GET",
                    headers: {
                        "Accept": "*/*"
                    }
                };
            }
        })
    })
});

export const { useGetDateWiseDetailsQuery,useLazyGetDateWiseDetailsQuery } = TimesheetDashboardApi;