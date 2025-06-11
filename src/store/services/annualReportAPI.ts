import { baseAPI } from "./baseAPI";
import {
  AnnualReportInitialState,
  setAnnualReportState,
} from "../../store/features/annualReportSlice";

export const annualReportAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    fetchAnnualReport: builder.query({
      query: () => ({ url: "/v1/UBForms/facultyReportByUser", method: "GET" }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          if (data?.data?.report.id) {
            dispatch(setAnnualReportState(data?.data?.report));
          }
        } catch (e) {
          console.error(e);
        }
      },
    }),
    updateAnnualReport: builder.mutation({
      query: (body: Partial<AnnualReportInitialState>) => ({
        url: "/v1/UBForms/facultyReport",
        method: "PUT",
        body,
      }),
    }),
  }),
});

export const { useFetchAnnualReportQuery, useUpdateAnnualReportMutation } =
  annualReportAPI;
