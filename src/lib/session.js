import { ironSession } from "iron-session/express";

export const session = ironSession({
  cookieName: "marjan",
  password: process.env.SESSION_SECRET,
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
});