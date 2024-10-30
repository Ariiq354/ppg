export default defineEventHandler(async (event) => {
  protectFunction(event);

  const res = await getGenerusByDaerah(event.context.user!.daerahId!);

  const data = res.map((item) => {
    return {
      id: item.id,
      foto: item.foto,
      gender: item.gender,
      nama: item.nama,
      kelasPengajian: item.kelasPengajian,
      kelasSekolah: item.kelasSekolah,
      namaOrtu: item.namaOrtu,
      tanggalLahir: item.tanggalLahir,
      tempatLahir: item.tempatLahir,
      daerahId: item.daerahId,
      desaId: item.desaId,
      kelompokId: item.kelompokId,
    };
  });

  return data;
});
