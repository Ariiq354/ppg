import type { H3Event } from "h3";

export function protectFunction(event: H3Event) {
  if (!event.context.session) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthenticated",
    });
  }
}

export function adminFunction(event: H3Event) {
  if (!event.context.session) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthenticated",
    });
  }

  if (event.context.user?.role !== 1) {
    throw createError({
      statusCode: 403,
      statusMessage: "Unauthorized",
    });
  }
}
