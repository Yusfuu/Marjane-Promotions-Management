import { ironSession } from "iron-session/express";

export const session: any = ironSession({
  cookieName: "marjan",
  password: process.env.SESSION_SECRET as string,
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
});