/* eslint-disable import/no-anonymous-default-export */

export default {
  providers: [
    {
      domain: process.env.NEXT_PUBLIC_CLERK_FRONTEND_API,
      applicationID: "convex",
    },
  ],
};
