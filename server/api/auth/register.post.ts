import { hash } from "@node-rs/argon2";
import { z } from "zod";

const registerSchema = z
  .object({
    id: z.number().optional(),
    name: z.string(),
  })
  .strict();

export default eventHandler(async (event) => {
  const formData = await readBody(event);

  const res = registerSchema.parse(formData);

  async function createUsername(daerah: string) {
    const randomNumber = Math.floor(Math.random() * 999) + 1;
    const nama = "User" + daerah.replace(/\s+/g, "") + randomNumber;
    const exist = await getUserByUsername(nama);
    if (exist) {
      return createUsername(daerah);
    } else {
      return nama;
    }
  }

  // Buat Daerah
  if (!res.id) {
    const [resultDaerah] = await createDaerah({
      name: res.name
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" "),
    });
    res.id = resultDaerah!.insertedId;
  }

  const namaUser = await createUsername(res.name);

  const passwordHash = await hash(namaUser);

  const newData = {
    username: namaUser,
    password: passwordHash,
    daerahId: res.id,
  };
  await createUser(newData);

  return {
    username: namaUser,
    password: namaUser,
  };
});
