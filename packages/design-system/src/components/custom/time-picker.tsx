import React from 'react';

import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { cn } from '@/lib/utils';

type ITimePickerProps = {
  is24h?: boolean;
  // To style the colons if an alternate parent width is set
  separatorClassName?: string;
};

export const TimePicker = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'> & ITimePickerProps
>(({ className, is24h, separatorClassName, ...props }, ref) => {
  const [hours, setHours] = React.useState(is24h ? 0 : 12);
  const [minutes, setMinutes] = React.useState(0);
  const [seconds, setSeconds] = React.useState(0);
  const [amPm, setAmPm] = React.useState('AM');
  return (
    <div {...props} className={cn(className, 'flex flex-row items-center')} ref={ref}>
      <Select value={hours.toString()} onValueChange={(value) => setHours(Number.parseInt(value))}>
        <SelectTrigger
          hideIcon
          className={cn(
            'focus:border-0 focus:ring-2 relative',
            className,
            'min-h-none h-min py-2 pl-3 pr-1 border-r-0 rounded-none rounded-l-lg shadow-none'
          )}
        >
          <span className=''>{hours.toString().padStart(2, '0')}</span>
          <span
            className={cn(
              'absolute top-0 bottom-0 right-0 translate-x-0.5 translate-y-[7px] text-sm',
              separatorClassName
            )}
          >
            :
          </span>
        </SelectTrigger>
        <SelectContent className='max-h-[300px]'>
          {Array(is24h ? 24 : 12)
            .fill(0)
            .map((_v, i) => (is24h ? i : i + 1))
            .map((v, i) => (
              <SelectItem value={String(v)} key={i}>
                {v.toString().padStart(2, '0')}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
      <Select
        value={minutes.toString()}
        onValueChange={(value) => setMinutes(Number.parseInt(value))}
      >
        <SelectTrigger
          hideIcon
          className={cn(
            'focus:border-0 focus:ring-2 relative',
            className,
            'min-h-none h-min py-2 px-1 rounded-none border-x-0 shadow-none'
          )}
        >
          <span className=''>{minutes.toString().padStart(2, '0')}</span>
          <span
            className={cn(
              'absolute top-0 bottom-0 right-0 translate-x-0.5 translate-y-[7px] text-sm',
              separatorClassName
            )}
          >
            :
          </span>
        </SelectTrigger>
        <SelectContent className='max-h-[300px]'>
          {Array(60)
            .fill(0)
            .map((_v, i) => i)
            .map((v, i) => (
              <SelectItem value={String(v)} key={i}>
                {v.toString().padStart(2, '0')}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
      <Select
        value={seconds.toString()}
        onValueChange={(value) => setSeconds(Number.parseInt(value))}
      >
        <SelectTrigger
          hideIcon
          className={cn(
            'min-h-none h-min shadow-none focus:border-0 focus:ring-2',
            className,
            is24h
              ? 'pl-1 pr-3 border-l-0 rounded-none rounded-r-lg'
              : 'py-2 px-1 rounded-none border-x-0'
          )}
        >
          <span className=''>{seconds.toString().padStart(2, '0')}</span>
        </SelectTrigger>
        <SelectContent className='max-h-[300px]'>
          {Array(60)
            .fill(0)
            .map((_v, i) => i)
            .map((v, i) => (
              <SelectItem value={String(v)} key={i}>
                {v.toString().padStart(2, '0')}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
      {!is24h && (
        <Select value={amPm} onValueChange={setAmPm}>
          <SelectTrigger
            hideIcon
            className={cn(
              'focus:border-0 focus:ring-2',
              className,
              'min-h-none h-min py-2 pl-1 pr-3 border-l-0 rounded-none rounded-r-lg shadow-none'
            )}
          >
            <span className=''>{amPm}</span>
          </SelectTrigger>
          <SelectContent>
            {['AM', 'PM'].map((v, i) => (
              <SelectItem value={v} key={i}>
                {v}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </div>
  );
});
