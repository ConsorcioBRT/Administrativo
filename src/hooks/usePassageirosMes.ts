import { useEffect, useState } from "react";

export interface IndicadorSMB {
  categoria: string;
  indicador: string;
  brt: string;
  grupo: string;
  periodo: string;
  valor: number;
}

export function usePassageirosMes(filters: {
  categoria?: string;
  indicador?: string;
  brt?: string;
}) {
  const [data, setData] = useState<IndicadorSMB[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const params = new URLSearchParams();

      if (filters.categoria) params.append("categoria", filters.categoria);
      if (filters.indicador) params.append("indicador", filters.indicador);
      if (filters.brt) params.append("brt", filters.brt);

      params.append("grupo", "Mês");

      const res = await fetch(`/api/indicadores/passageiros-tipo?${params}`);
      const json = await res.json();

      setData(json);
      setLoading(false);
    }

    load();
  }, [filters.categoria, filters.indicador, filters.brt]);

  return { data, loading };
}
