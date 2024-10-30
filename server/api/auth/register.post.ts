import { hash } from "@node-rs/argon2";
import { z } from "zod";

const registerSchema = z
  .object({
    daerah: z.object({
      id: z.coerce.number().optional(),
      name: z.string(),
    }),
    desa: z.object({
      id: z.coerce.number().optional(),
      name: z.string().optional(),
    }),
    kelompok: z.object({
      id: z.coerce.number().optional(),
      name: z.string().optional(),
    }),
  })
  .strict();

export default eventHandler(async (event) => {
  const formData = await readBody(event);

  const res = registerSchema.parse(formData);

  let count = 0;

  async function createUsername() {
    count++;
    let nama = "";
    if (res.kelompok.name) {
      nama = convertToNameFormat(res.kelompok.name) + count;
    } else if (res.desa.name) {
      nama = convertToNameFormat(res.desa.name) + count;
    } else {
      nama = convertToNameFormat(res.daerah.name) + count;
    }
    const exist = await getUserByUsername(nama);
    if (exist) {
      return createUsername();
    } else {
      return nama;
    }
  }

  // Buat Daerah
  if (!res.daerah.id) {
    const [resultDaerah] = await createDaerah({
      name: res.daerah.name
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" "),
    });
    res.daerah.id = resultDaerah!.insertedId;
  }

  if (res.desa.name && !res.desa.id) {
    const [resultDesa] = await createDesa({
      name: res.desa.name
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" "),
      daerahId: res.daerah.id,
    });
    res.desa.id = resultDesa!.insertedId;
  }
  if (res.kelompok.name && !res.kelompok.id) {
    const [resultKelompok] = await createKelompok({
      name: res.kelompok.name
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" "),
      desaId: res.desa!.id!,
    });
    res.kelompok.id = resultKelompok!.insertedId;
  }

  const namaUser = await createUsername();

  const passwordHash = await hash(namaUser);

  let role = 2;
  if (res.kelompok.name) {
    role = 4;
  } else if (res.desa.name) {
    role = 3;
  }

  const newData = {
    username: namaUser,
    password: passwordHash,
    daerahId: res.daerah.id,
    desaId: res.desa?.id,
    kelompokId: res.kelompok?.id,
    role,
  };
  await createUser(newData);

  return {
    username: namaUser,
    password: namaUser,
  };
});

function convertToNameFormat(input: string) {
  const numberWords = [
    "nol",
    "satu",
    "dua",
    "tiga",
    "empat",
    "lima",
    "enam",
    "tujuh",
    "delapan",
    "sembilan",
  ];

  return input
    .replace(/\d/g, (digit) => numberWords[parseInt(digit)])
    .replace(/\s+/g, "")
    .toLowerCase();
}
