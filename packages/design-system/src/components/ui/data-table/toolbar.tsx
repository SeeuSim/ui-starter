'use client';

import { Table } from '@tanstack/react-table';
import { X } from 'lucide-react';
import { Fragment } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { TableCell, TableRow } from '../table';
import { DataTableFacetedFilter, FacetFilter } from './faceted-filter';
import { DataTableViewOptions } from './view-options';

interface DataTableToolbarProps<TData> {
  facetFilters?: Array<FacetFilter>;
  table: Table<TData>;
  numColumns: number;
}

export function DataTableToolbar<TData>({
  facetFilters: filters,
  numColumns,
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <TableRow className=''>
      <TableCell colSpan={numColumns} className='hover:bg-background p-0 pb-4'>
        <div className='w-full flex'>
          <div className='flex w-full items-center gap-2'>
            <Input
              placeholder='Filter tasks...'
              value={(table.getColumn('title')?.getFilterValue() as string) ?? ''}
              onChange={(event) => table.getColumn('title')?.setFilterValue(event.target.value)}
              className='h-8 w-[150px] lg:w-[250px]'
            />
            {filters &&
              filters.map((filter, index) => (
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
                variant='ghost'
                onClick={() => table.resetColumnFilters()}
                className='h-8 px-2 lg:px-3'
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