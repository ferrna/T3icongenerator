export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/collection", "/dashboard", "/checkout"],
};
