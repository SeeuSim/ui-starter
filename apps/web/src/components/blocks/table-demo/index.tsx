import { useMemo } from "react";

import { DataTable } from "@repo/design-system/components/ui/data-table/table";

import { columns } from "./columns";
import { getData } from "./data";
import { facetFilters } from "./facet-filters";

export const TableDemo = () => {
  const data = useMemo(() => {
    return getData();
  }, []);
  return (
    <DataTable
      columns={columns}
      data={data}
      toolbarConfig={{
        facetFilters,
        searchFilter: {
          accessorKey: "title",
          placeholderText: "Filter tasks...",
        },
      }}
    />
  );
};
