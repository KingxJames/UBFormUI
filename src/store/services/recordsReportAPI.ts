import { baseAPI } from "./baseAPI";
import {
  RecordsReportState,
  setRecordReportState,
} from "../features/recordsReportSlice";

export const RecordsReportAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    fetchRecordsReport: builder.query({
      query: () => ({
        //check  url again
        url: "/v1/UBForms/recordsReportByUser",
        method: "GET",
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          if (data?.data?.report)
            dispatch(setRecordReportState(data.data.report));
        } catch (e) {
          console.error(e);
        }
      },
    }),
    updateRecordReport: builder.mutation({
      query: (body: Partial<RecordsReportState>) => ({
        //check URL
        url: "/v1/UBForms/recordsReport",
        method: "PUT",
        body,
      }),
    }),
  }),
});

export const { useFetchRecordsReportQuery, useUpdateRecordReportMutation } =
  RecordsReportAPI;
