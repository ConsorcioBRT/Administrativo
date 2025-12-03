export async function getCarregadoresMapa() {
  const res = await fetch(
    "https://gonansen.com.br/endpoints/central-monitoring/chargers-group-map/",
    {
      headers: {
        accept: "application/json",
        Authorization: "d3d15c2effddf4e11ef9fbcfd066c62878b35039", // seu token aqui
      },
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("Erro ao buscar dados da API");
  }

  return res.json();
}
