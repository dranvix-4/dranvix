import { useState, useMemo } from "react";

export function useMedicineSearch(medicines) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return medicines;
    return medicines.filter((m) =>
      `${m.name ?? ""} ${m.batch_no ?? ""} ${m.generic_name ?? ""} ${m.supplier ?? ""}`.toLowerCase().includes(needle)
    );
  }, [medicines, query]);

  return { query, setQuery, filtered };
}
