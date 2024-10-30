import { verify } from "@node-rs/argon2";
import { z } from "zod";

const loginSchema = z
  .object({
    username: z.string(),
    password: z.string().min(8),
    rememberMe: z.boolean(),
  })
  .strict();

export default eventHandler(async (event) => {
  const formData = await readBody(event);

  const res = loginSchema.parse(formData);

  const existingUser = await getUserByUsername(res.username);

  if (!existingUser) {
    throw createError({
      statusCode: 400,
      message: "Username atau password salah",
      data: {
        message: "Username atau password salah",
      },
    });
  }

  const validPassword = await verify(existingUser.password, res.password);

  if (!validPassword) {
    throw createError({
      statusCode: 400,
      message: "Username atau password salah",
      data: {
        message: "Username atau password salah",
      },
    });
  }

  const session = await createSession(existingUser.id);
  if (res.rememberMe) {
    await extendSession(session.id, 1000 * 60 * 60 * 24 * 7);
  }
  setSessionTokenCookie(event, session.id, session.expiresAt);
});
