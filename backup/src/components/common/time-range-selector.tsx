'use client';

import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from '../ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../ui/popover';
import { useFinancialStore } from '@/store/financial-store';
import { TIME_RANGES } from '@/lib/constants';
import { useState } from 'react';

export function TimeRangeSelector() {
  const { timeframe, setTimeframe } = useFinancialStore();
  const [open, setOpen] = useState(false);

  const currentTimeframe = TIME_RANGES.find(t => t.value === timeframe) || TIME_RANGES[0];

  const handleTimeframeSelect = (value: string) => {
    setTimeframe(value as '1M' | '3M' | '6M' | '1Y' | '3Y');
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-32 justify-between"
        >
          {currentTimeframe.label}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-32 p-0">
        <Command>
          <CommandList>
            <CommandEmpty>未找到时间范围。</CommandEmpty>
            <CommandGroup>
              {TIME_RANGES.map((timeframe) => (
                <CommandItem
                  key={timeframe.value}
                  value={timeframe.value}
                  onSelect={() => handleTimeframeSelect(timeframe.value)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      currentTimeframe.value === timeframe.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {timeframe.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
