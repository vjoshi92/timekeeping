import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export const TimesheetApi = createApi({
  reducerPath: "TimesheetApi",
  baseQuery,
  tagTypes: ["Get_Timesheet"],

  endpoints: (builder) => ({
    getUserData: builder.query({
      query: () => ({
        url: "/HCMFAB_COMMON_SRV/EmployeeDetailSet?$format=json",
        method: "GET",
      }),
    }),
    getWbsData: builder.query({
      query: () => {
        const URL = "ZCATS_NOFO_TIMESHEET_SRV/WBSSet?$format=json";
        return {
          url: URL,
          method: "GET",
          header: ("Accept", "*/*"),
        };
      },
    }),
    getProjectData: builder.query({
      query: () => {
        const URL = "ZCATS_NOFO_TIMESHEET_SRV/ProjectsSet?$format=json";
        return {
          url: URL,
          method: "GET",
          header: ("Accept", "*/*"),
        };
      },
    }),
    makeBatchCall: builder.mutation({
      query: ({ body }) => {
        return {
          url: "HCMFAB_TIMESHEET_MAINT_SRV/$batch",
          method: "POST",
          headers: {
            "Content-Type": "multipart/mixed; boundary=batch",
          },

          body: body,
        };
      },
      invalidatesTags: ["Get_Timesheet"],
    }),
    makeApprovalBatchCall: builder.mutation({
      query: ({ body }) => {
        return {
          url: "HCMFAB_APR_TIMESHEET_SRV/$batch",
          method: "POST",
          headers: {
            "Content-Type": "multipart/mixed; boundary=batch",
          },

          body: body,
        };
      },
      invalidatesTags: ["Get_Timesheet"],
    }),
    getDateWiseDetails: builder.query({
      query: ({ startDate, endDate, pernr }) => {
        const URL = `HCMFAB_TIMESHEET_MAINT_SRV/WorkCalendarCollection?$expand=TimeEntries&$filter=StartDate eq datetime'${startDate}' and EndDate eq datetime'${endDate}' and Pernr eq '${pernr}' and ProfileId eq 'ZJMA1'&$format=json`;

        return {
          url: URL,
          method: "GET",
          headers: {
            Accept: "*/*",
          },
        };
      },
      providesTags: ["Get_Timesheet"],
    }),
    getReporteeList: builder.query({
      query: () => {
        const URL = `HCMFAB_APR_TIMESHEET_SRV/ApprovalListSet?$format=json`;
        return {
          url: URL,
          method: "GET",
        };
      }
    }),
  }),
});

export const {
  useGetUserDataQuery,
  useGetWbsDataQuery,
  useGetProjectDataQuery,
  useMakeBatchCallMutation,
  useMakeApprovalBatchCallMutation,
  useGetDateWiseDetailsQuery,
  useLazyGetDateWiseDetailsQuery,
  useGetReporteeListQuery,
} = TimesheetApi;
