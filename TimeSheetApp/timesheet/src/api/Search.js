import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './baseQuery';

const readService = 'ZBOON_NCMR_API';

export const searchNotificationApi = createApi({
  reducerPath: 'searchNotificationApi',
  baseQuery,
  endpoints: (builder) => ({
    getNotificationList: builder.query({
      query: ({ skip = 0, top = 5, filters, sorters }) => {
        let url = `${readService}/notificationList?$format=json&$inlinecount=allpages&$top=${top}&$skip=${skip}`;
        if (filters && filters?.length > 0) {
          url = `${url}&$filter=${filters} and notificationType eq 'ZN'`;
        } else {
          url = `${url}&$filter=notificationType eq 'ZN'`;
        }
        if (sorters) {
          url = `${url}&$orderby=${sorters}`;
        }
        return url;
      },
    }),
  }),
});

export const { useGetNotificationListQuery, useLazyGetNotificationListQuery } =
  searchNotificationApi;
