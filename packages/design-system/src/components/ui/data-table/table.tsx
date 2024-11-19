import {
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
  type VisibilityState,
} from "@tanstack/react-table";
import * as React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/design-system/components/ui/table";

import { FacetFilter } from "./faceted-filter";
import { DataTablePagination } from "./pagination";
import { DataTableToolbar } from "./toolbar";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  facetFilters?: Array<FacetFilter>;
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  facetFilters,
  data,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <div className="size-full relative flex flex-col">
      <Table className="border-none border-separate border-spacing-0">
        <TableHeader className="sticky top-0 bg-background bg-opacity-100 z-40 [&_tr]:border-b-0">
          <tr
            id="padding-blocker-top"
            className="absolute w-full h-4 translate-y-[-16px] z-10 bg-background"
          />
          <DataTableToolbar
            table={table}
            facetFilters={facetFilters}
            colSpan={columns.length}
          />

          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              className="border border-t border-border bg-background bg-opacity-100 rounded-t-lg z-40"
              key={headerGroup.id}
            >
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    colSpan={header.colSpan}
                    className="bg-background border-y border-x-0 first:rounded-tl-lg first:border-l last:border-r last:rounded-tr-lg z-[100]"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className="[&_tr:last-child]:border [&_tr:last-child]:border-b-0 z-0">
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                className="[&>td]:border-b [&:last-child>td]:border-b-0 border-b-0"
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    className="z-0 first:border-l last:border-r"
                    key={cell.id}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        <TableFooter className="sticky bottom-0 z-40 p-0 bg-inherit border-none border-t-0">
          <tr
            id="padding-blocker-bottom"
            className="absolute w-full h-4 translate-y-[66px] z-10 bg-background"
          />
          <TableRow className="bg-transparent hover:bg-transparent border-none border-b-0 p-0">
            <TableCell
              className="bg-background hover:bg-background p-0"
              colSpan={columns.length}
            >
              <DataTablePagination table={table} />
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
