import { baseAPI } from "./baseAPI";
import { setHRReportState, IHRReportState } from "../features/HRReportSlice";

export const HRReportAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    fetchHRReport: builder.query({
      query: () => ({ url: "/v1/UBForms/HRReportByUser", method: "GET" }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          if (data?.data?.report)
            dispatch(setHRReportState(data.data.report));
        } catch (e) {
          console.error(e);
        }
      },
    }),
    updateHRReport: builder.mutation({
      query: (body: Partial<IHRReportState>) => ({
        url: "/v1/UBForms/HRReport",
        method: "PUT",
        body,
      }),
    }),
  }),
});

export const { useFetchHRReportQuery, useUpdateHRReportMutation } = HRReportAPI;
