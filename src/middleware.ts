export { default } from "next-auth/middleware";

export const config = { matcher: ["/profile", "/profile/edit"] }; // TODO use constants (PROFILE_PAGE_ROUTE, EDIT_PROFILE_PAGE_ROUTE)
