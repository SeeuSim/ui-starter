import { addDays, format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import * as React from "react";
import { DateRange } from "react-day-picker";

import { TimePicker } from "@repo/design-system/components/custom/time-picker";
import { Button } from "@repo/design-system/components/ui/button";
import { Calendar } from "@repo/design-system/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@repo/design-system/components/ui/popover";
import { cn } from "@repo/design-system/lib/utils";

export function DatePickerWithRange({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: addDays(new Date(), -20),
    to: new Date(),
  });

  const setDateFrom = (newDate: Date) => {
    setDate((dateState) => ({
      ...dateState,
      from: newDate,
    }));
  };

  const setDateTo = (newDate: Date) => {
    setDate((dateState) =>
      dateState?.from
        ? {
            ...dateState,
            to: newDate,
          }
        : undefined,
    );
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "justify-start text-left font-normal",
              !date && "text-muted-foreground",
            )}
          >
            <CalendarIcon />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y h:mm:ss a")} -{" "}
                  {format(date.to, "LLL dd, y h:mm:ss a")}
                </>
              ) : (
                format(date.from, "LLL dd, y hh:mm:ss a")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
          <div className="grid grid-cols-2 gap-8 p-2 px-4">
            <div className="flex flex-col justify-start mr-auto gap-0.5">
              <label className="font-medium text-sm pl-1">From Time:</label>
              <TimePicker
                time={date?.from}
                onTimeChange={setDateFrom}
                className="w-min"
              />
            </div>
            <div className="flex flex-col justify-start mr-auto gap-0.5">
              <label className="font-medium text-sm pl-1">To Time:</label>
              <TimePicker
                className="w-min"
                time={date?.to}
                onTimeChange={setDateTo}
              />
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
