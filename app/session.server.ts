import { createCookieSessionStorage } from "@remix-run/node";

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
	cookie: {
  	name: "__session",
  	httpOnly: true,
  	path: "/",
  	sameSite: "lax",
  //	secrets: [process.env.SESSION_SECRET!],
  	secrets: ["secret"],
  	secure: process.env.NODE_ENV === "production",
	},
  });

export { getSession, commitSession, destroySession };
