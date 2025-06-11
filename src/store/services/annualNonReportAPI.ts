import { baseAPI } from "./baseAPI";
import {
  annualNonReportInitialState,
  setAnnualNonReportState,
} from "../../store/features/annualNonReportSlice";

export const annualNonReportAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    fetchAnnualNonReport: builder.query({
      query: () => ({ url: "/v1/UBForms/staffReportByUser", method: "GET" }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          if (data?.data?.report.id)
            dispatch(setAnnualNonReportState(data?.data?.report));
        } catch (e) {
          console.error(e);
        }
      },
    }),
    updateAnnualNonReport: builder.mutation({
      query: (body: Partial<annualNonReportInitialState>) => ({
        url: "/v1/UBForms/staffReport",
        method: "PUT",
        body,
      }),
    }),
  }),
});

export const {
  useFetchAnnualNonReportQuery,
  useUpdateAnnualNonReportMutation,
} = annualNonReportAPI;
