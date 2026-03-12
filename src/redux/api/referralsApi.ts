import { baseApi } from "./baseApi";

const referralsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getReferrals: builder.query({
      query: () => ({
        url: "/referrals",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetReferralsQuery } = referralsApi;
