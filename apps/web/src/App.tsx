import React from "react";

import { DatePickerWithRange } from "@repo/design-system/components/custom/date-range-picker";
import { HorizontalScrollSection } from "@repo/design-system/components/custom/horizontal-scroll-section";
import { TimePicker } from "@repo/design-system/components/custom/time-picker";

import { TableDemo } from "@/components/blocks/table-demo";

function App() {
  const [dateTime, setDateTime] = React.useState(new Date());

  return (
    <div>
      <section className="">
        <div className="h-screen bg-pink-300 grid place-items-center text-8xl font-bold">
          VSection 1
        </div>
        <div className="h-screen bg-red-300 grid place-items-center text-8xl font-bold">
          VSection 2
        </div>
      </section>
      <HorizontalScrollSection>
        <div className="h-screen w-screen bg-yellow-300 grid place-items-center">
          <span className="text-8xl font-bold">HSection 1</span>
          <div className="flex space-y-2 flex-col">
            <TimePicker className="border-yellow-700 text-yellow-700 focus:ring-yellow-700" />
            <TimePicker
              className="border-yellow-700 text-yellow-700 focus:ring-yellow-700"
              separatorClassName="translate-x-[-2px]"
              is24h
            />
            <TimePicker
              className="border-yellow-700 text-yellow-700 focus:ring-yellow-700 w-min"
              is24h
            />
            <TimePicker
              time={dateTime}
              onTimeChange={setDateTime}
              className="border-yellow-700 text-yellow-700 focus:ring-yellow-700 w-min"
            />
            <TimePicker
              time={dateTime}
              onTimeChange={setDateTime}
              className="border-yellow-700 text-yellow-700 focus:ring-yellow-700 w-min"
              is24h
            />
          </div>
          <DatePickerWithRange />
        </div>
        <div className="h-screen w-screen bg-green-300 grid place-items-center">
          <span className="text-8xl font-bold">HSection 2</span>
        </div>
      </HorizontalScrollSection>
      <section className="">
        <div className="h-screen bg-purple-300 grid place-items-center text-8xl font-bold">
          VSection 3
        </div>
        <div className="h-screen bg-indigo-300 grid place-items-center text-8xl font-bold">
          VSection 4
        </div>
        <div className="size-full h-screen flex flex-col p-4 gap-4 basis-0">
          <span className="text-center text-8xl font-bold">VSection 5</span>
          <div
            id="table-container"
            className="flex flex-1 p-4 overflow-auto max-w-screen-xl min-h-[250px] mx-auto"
          >
            <TableDemo />
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
