import { Table } from "@tanstack/react-table";
import { X } from "lucide-react";
import { Fragment } from "react";

import { Button } from "@repo/design-system/components/ui/button";
import { Input } from "@repo/design-system/components/ui/input";

import { TableCell, TableRow } from "../table";
import { DataTableFacetedFilter, FacetFilter } from "./faceted-filter";
import { DataTableViewOptions } from "./view-options";

interface DataTableToolbarProps<TData> {
  searchFilter?: {
    accessorKey: string;
    placeholderText: string;
  };
  facetFilters?: Array<FacetFilter>;
  table: Table<TData>;
  colSpan: number;
}

export function DataTableToolbar<TData>({
  facetFilters,
  searchFilter,
  colSpan,
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <TableRow className="hover:bg-background bg-background border-b-0">
      <TableCell
        colSpan={colSpan}
        className="bg-background hover:bg-background p-0 z-30 pb-4"
      >
        <div className="w-full bg-background flex">
          <div className="flex w-full items-center gap-2">
            {searchFilter && (
              <Input
                placeholder={searchFilter.placeholderText}
                value={
                  (table
                    .getColumn(searchFilter.accessorKey)
                    ?.getFilterValue() as string) ?? ""
                }
                onChange={(event) =>
                  table
                    .getColumn(searchFilter.accessorKey)
                    ?.setFilterValue(event.target.value)
                }
                className="h-8 w-[150px] lg:w-[250px] z-40"
              />
            )}
            {facetFilters &&
              facetFilters.map((filter, index) => (
                <Fragment key={index}>
                  {table.getColumn(filter.accessorKey) && (
                    <DataTableFacetedFilter
                      column={table.getColumn(filter.accessorKey)}
                      title={filter.title}
                      options={filter.options}
                    />
                  )}
                </Fragment>
              ))}

            {isFiltered && (
              <Button
                variant="ghost"
                onClick={() => table.resetColumnFilters()}
                className="h-8 px-2 lg:px-3"
              >
                Reset
                <X />
              </Button>
            )}
          </div>
          <DataTableViewOptions table={table} />
        </div>
      </TableCell>
    </TableRow>
  );
}
