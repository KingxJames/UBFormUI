import { baseAPI } from "./baseAPI";
import {
  setFinanceReport,
  IFinanceReportState,
} from "../features/financeReportSlice";

export const financeReportAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    fetchFinanceReport: builder.query({
      query: () => ({
        //check  url again
        url: "/v1/UBForms/financeReportByUser",
        method: "GET",
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          if (data?.data?.report.id)
            dispatch(setFinanceReport(data.data.report));
        } catch (e) {
          console.error(e);
        }
      },
    }),
    updateFinanceReport: builder.mutation({
      query: (body: Partial<IFinanceReportState>) => ({
        //check URL
        url: "/v1/UBForms/financeReport",
        method: "PUT",
        body,
      }),
    }),
  }),
});

export const { useFetchFinanceReportQuery, useUpdateFinanceReportMutation } =
  financeReportAPI;
