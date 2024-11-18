import { faker } from '@faker-js/faker';

import type { Task } from './columns';
import { labels, priorities, statuses } from './schema';

export function getData(): Task[] {
  // Fetch data from your API here.
  return Array.from({ length: 100 }, () => ({
    id: `TASK-${faker.number.int({ min: 1000, max: 9999 })}`,
    title: faker.hacker.phrase().replace(/^./, (letter) => letter.toUpperCase()),
    status: faker.helpers.arrayElement(statuses).value,
    label: faker.helpers.arrayElement(labels).value,
    priority: faker.helpers.arrayElement(priorities).value,
  }));
}
