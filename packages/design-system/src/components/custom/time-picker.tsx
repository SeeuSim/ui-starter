import React, { useEffect } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@repo/design-system/components/ui/select";
import { cn } from "@repo/design-system/lib/utils";

type ITimePickerProps = {
  is24h?: boolean;
  // To style the colons if an alternate parent width is set
  separatorClassName?: string;
  time?: Date;
  onTimeChange?: (date: Date) => void;
};

export const TimePicker = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & ITimePickerProps
>(
  (
    { className, is24h, time, onTimeChange, separatorClassName, ...props },
    ref,
  ) => {
    const originalHours = time
      ? is24h
        ? time.getHours() // Just take the raw time value
        : time.getHours() > 12
          ? time.getHours() - 12 // 1pm to 12am (24pm)
          : time.getHours() || 12 // 1 - 12, or 12 for 0.
      : is24h
        ? 0
        : 12;

    const [hours, setHours] = React.useState(originalHours);
    const [minutes, setMinutes] = React.useState(time?.getMinutes() ?? 0);
    const [seconds, setSeconds] = React.useState(time?.getSeconds() ?? 0);
    const [amPm, setAmPm] = React.useState(
      time && time.getHours() >= 12 ? "PM" : "AM",
    );

    const hourRef = React.useRef<HTMLButtonElement>(null);
    const minuteRef = React.useRef<HTMLButtonElement>(null);
    const secondRef = React.useRef<HTMLButtonElement>(null);
    const amPmRef = React.useRef<HTMLButtonElement>(null);

    useEffect(() => {
      if (onTimeChange && time) {
        const actTime = new Date(time);
        const hoursIn24h = is24h
          ? hours
          : amPm === "AM"
            ? hours
            : (hours + 12) % 24;
        actTime.setHours(hoursIn24h, minutes, seconds, 0);
        onTimeChange(actTime);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hours, minutes, seconds, amPm]);

    useEffect(() => {
      if (time) {
        const hourState = time.getHours();
        setHours(
          is24h ? hourState : hourState > 12 ? hourState - 12 : hourState,
        );
        setMinutes(time.getMinutes());
        setSeconds(time.getSeconds());
        setAmPm(hourState >= 12 ? "PM" : "AM");
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [time]);

    return (
      <div
        {...props}
        className={cn(className, "flex flex-row items-center")}
        ref={ref}
      >
        <Select
          value={hours.toString()}
          onValueChange={(value) => setHours(Number.parseInt(value))}
        >
          <SelectTrigger
            ref={hourRef}
            hideicon="true"
            onKeyDown={(event) => {
              if (event.key === "ArrowRight") {
                minuteRef.current?.focus();
              }
            }}
            className={cn(
              "focus:border-0 focus:ring-2 relative",
              className,
              "min-h-none h-min py-2 pl-3 pr-1 border-r-0 rounded-none rounded-l-lg shadow-none",
            )}
          >
            <span className="">{hours.toString().padStart(2, "0")}</span>
            <span
              className={cn(
                "absolute top-0 bottom-0 right-0 translate-x-0.5 translate-y-[7px] text-sm",
                separatorClassName,
              )}
            >
              :
            </span>
          </SelectTrigger>
          <SelectContent className="max-h-[300px]">
            {Array(is24h ? 24 : 12)
              .fill(0)
              .map((_v, i) => (is24h ? i : i + 1)) // 24h: 00 - 23, 12h: 1 - 12
              .map((v, i) => (
                <SelectItem value={String(v)} key={i}>
                  {v.toString().padStart(2, "0")}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
        <Select
          value={minutes.toString()}
          onValueChange={(value) => setMinutes(Number.parseInt(value))}
        >
          <SelectTrigger
            ref={minuteRef}
            hideicon="true"
            onKeyDown={(event) => {
              if (event.key === "ArrowLeft") {
                hourRef.current?.focus();
              } else if (event.key === "ArrowRight") {
                secondRef.current?.focus();
              }
            }}
            className={cn(
              "focus:border-0 focus:ring-2 relative",
              className,
              "min-h-none h-min py-2 px-1 rounded-none border-x-0 shadow-none",
            )}
          >
            <span className="">{minutes.toString().padStart(2, "0")}</span>
            <span
              className={cn(
                "absolute top-0 bottom-0 right-0 translate-x-0.5 translate-y-[7px] text-sm",
                separatorClassName,
              )}
            >
              :
            </span>
          </SelectTrigger>
          <SelectContent className="max-h-[300px]">
            {Array(60)
              .fill(0)
              .map((_v, i) => i)
              .map((v, i) => (
                <SelectItem value={String(v)} key={i}>
                  {v.toString().padStart(2, "0")}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
        <Select
          value={seconds.toString()}
          onValueChange={(value) => setSeconds(Number.parseInt(value))}
        >
          <SelectTrigger
            ref={secondRef}
            hideicon="true"
            onKeyDown={(event) => {
              if (event.key === "ArrowLeft") {
                minuteRef.current?.focus();
              } else if (event.key === "ArrowRight" && !is24h) {
                amPmRef.current?.focus();
              }
            }}
            className={cn(
              "min-h-none h-min shadow-none focus:border-0 focus:ring-2",
              className,
              is24h
                ? "pl-1 pr-3 border-l-0 rounded-none rounded-r-lg"
                : "py-2 px-1 rounded-none border-x-0",
            )}
          >
            <span className="">{seconds.toString().padStart(2, "0")}</span>
          </SelectTrigger>
          <SelectContent className="max-h-[300px]">
            {Array(60)
              .fill(0)
              .map((_v, i) => i)
              .map((v, i) => (
                <SelectItem value={String(v)} key={i}>
                  {v.toString().padStart(2, "0")}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
        {!is24h && (
          <Select value={amPm} onValueChange={setAmPm}>
            <SelectTrigger
              ref={amPmRef}
              onKeyDown={(event) => {
                if (event.key === "ArrowLeft") {
                  secondRef.current?.focus();
                }
              }}
              hideicon="true"
              className={cn(
                "focus:border-0 focus:ring-2",
                className,
                "min-h-none h-min py-2 pl-1 pr-3 border-l-0 rounded-none rounded-r-lg shadow-none",
              )}
            >
              <span className="">{amPm}</span>
            </SelectTrigger>
            <SelectContent>
              {["AM", "PM"].map((v, i) => (
                <SelectItem value={v} key={i}>
                  {v}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>
    );
  },
);
