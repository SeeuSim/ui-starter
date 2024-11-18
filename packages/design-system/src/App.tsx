import React from 'react';

import { TableDemo } from '@/components/blocks/table-demo';
import { HorizontalScrollSection } from '@/components/custom/horizontal-scroll-section';
import { TimePicker } from '@/components/custom/time-picker';
import { DatePickerWithRange } from '@/components/ui/date-range-picker';

function App() {
  const [dateTime, setDateTime] = React.useState(new Date());
  return (
    <div>
      <section className=''>
        <div className='h-screen bg-pink-300 grid place-items-center text-8xl font-bold'>
          VSection 1
        </div>
        <div className='h-screen bg-red-300 grid place-items-center text-8xl font-bold'>
          VSection 2
        </div>
      </section>
      <HorizontalScrollSection>
        <div className='h-screen w-screen bg-yellow-300 grid place-items-center'>
          <span className='text-8xl font-bold'>HSection 1</span>
          <div className='flex space-y-2 flex-col'>
            <TimePicker className='border-yellow-700 text-yellow-700 focus:ring-yellow-700' />
            <TimePicker
              className='border-yellow-700 text-yellow-700 focus:ring-yellow-700'
              separatorClassName='translate-x-[-2px]'
              is24h
            />
            <TimePicker
              className='border-yellow-700 text-yellow-700 focus:ring-yellow-700 w-min'
              is24h
            />
            <TimePicker
              time={dateTime}
              onTimeChange={setDateTime}
              className='border-yellow-700 text-yellow-700 focus:ring-yellow-700 w-min'
            />
            <TimePicker
              time={dateTime}
              onTimeChange={setDateTime}
              className='border-yellow-700 text-yellow-700 focus:ring-yellow-700 w-min'
              is24h
            />
          </div>
          <DatePickerWithRange className='' />
        </div>
        <div className='h-screen w-screen bg-green-300 grid place-items-center'>
          <span className='text-8xl font-bold'>HSection 2</span>
        </div>
      </HorizontalScrollSection>
      <section>
        <div className='bg-purple-300 h-screen grid place-items-center text-8xl font-bold'>
          VSection 3
        </div>
        <div className='bg-indigo-300 h-screen grid place-items-center text-8xl font-bold'>
          VSection 4
        </div>
        <div className='bg-background h-screen grid max-h-screen overflow-clip'>
          <div className='size-full flex flex-col'>
            <span className='flex text-8xl font-bold mx-auto text-center pt-4'>VSection 5</span>
            <div className='pb-4 px-4 flex flex-1 overflow-clip'>
              <TableDemo />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
