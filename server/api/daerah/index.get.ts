export default defineEventHandler(async () => {
  const res = await getAllDaerah();
  const data = res.map((item) => {
    return {
      id: item.id,
      name: item.name,
    };
  });

  return data;
});
