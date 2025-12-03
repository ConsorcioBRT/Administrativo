// hooks/useFiltros.ts
import { useEffect, useState } from "react";

export interface FiltrosDB {
  categorias: string[];
  indicadores: string[];
  brts: string[];
  grupos: string[];
}

export function useFiltros() {
  const [filtros, setFiltros] = useState<FiltrosDB>({
    categorias: [],
    indicadores: [],
    brts: [],
    grupos: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const res = await fetch("/api/indicadores/passageiros-tipo/filtros");
      const json = await res.json();
      setFiltros(json);
      setLoading(false);
    }
    load();
  }, []);

  return { filtros, loading };
}
