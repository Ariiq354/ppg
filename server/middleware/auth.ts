import type { Session, UserLucia } from "../database/schema/auth";
import { sessionCookieName } from "../utils/lucia";

export default defineEventHandler(async (event) => {
  if (event.method !== "GET") {
    const originHeader = getHeader(event, "Origin") ?? null;
    const hostHeader = getHeader(event, "Host") ?? null;
    if (
      !originHeader ||
      !hostHeader ||
      !verifyRequestOrigin(originHeader, [hostHeader])
    ) {
      throw createError({
        statusCode: 403,
        statusMessage: "Unauthorized",
      });
    }
  }

  const sessionToken = getCookie(event, sessionCookieName) ?? null;
  if (!sessionToken) {
    event.context.session = null;
    event.context.user = null;
    return;
  }
  const { session, user } = await validateSessionToken(sessionToken);
  if (session !== null) {
    setSessionTokenCookie(event, sessionToken, session.expiresAt);
  } else {
    deleteSessionTokenCookie(event);
  }
  event.context.session = session;
  event.context.user = user;
});

declare module "h3" {
  interface H3EventContext {
    user: UserLucia | null;
    session: Session | null;
  }
}
