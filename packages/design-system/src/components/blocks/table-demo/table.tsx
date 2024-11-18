import { useMemo } from 'react';

import { DataTable } from '@/components/ui/data-table';

import { columns } from './columns';
import { getData } from './data';
import { facetFilters } from './facet-filters';

export const TableDemo = () => {
  const data = useMemo(() => {
    return getData();
  }, []);
  return <DataTable columns={columns} data={data} facetFilters={facetFilters} />;
};
