export default defineEventHandler(async (event) => {
  protectFunction(event);

  let res;

  if (event.context.user?.role === 1) {
    res = await getAllPengajar();
  } else {
    res = await getPengajarByDaerah(event.context.user!.daerahId!);
  }

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
      namaKelompok: item.kelompok?.name,
    };
  });

  return data;
});
