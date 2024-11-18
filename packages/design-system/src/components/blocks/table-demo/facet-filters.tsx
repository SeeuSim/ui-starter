import { FacetFilter } from '@/components/ui/data-table/faceted-filter';

import { priorities, statuses } from './schema';

export const facetFilters: Array<FacetFilter> = [
  {
    accessorKey: 'status',
    title: 'Status',
    options: statuses,
  },
  {
    accessorKey: 'priority',
    title: 'Priority',
    options: priorities,
  },
];
