export default defineEventHandler(async (event) => {
  protectFunction(event);

  const res = await getPengajarByDaerah(event.context.user!.daerahId!);

  const data = res.map((item) => {
    return {
      id: item.id,
      foto: item.foto,
      gender: item.gender,
      nama: item.nama,
      noTelepon: item.noTelepon,
      pendidikan: item.pendidikan,
      status: item.status,
      tanggalLahir: item.tanggalLahir,
      tempatLahir: item.tempatLahir,
      tanggalTugas: item.tanggalTugas,
      daerahId: item.daerahId,
      desaId: item.desaId,
      kelompokId: item.kelompokId,
    };
  });

  return data;
});
