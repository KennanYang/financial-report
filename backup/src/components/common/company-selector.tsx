'use client';

import { useState } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../ui/popover';
import { useFinancialStore } from '@/store/financial-store';
import { Company } from '@/lib/types';

export function CompanySelector() {
  const [open, setOpen] = useState(false);
  const { selectedCompany, companies, setSelectedCompany } = useFinancialStore();

  // 确保companies是数组
  const safeCompanies = Array.isArray(companies) ? companies : [];
  
  // 确保有选中的公司
  const currentCompany = selectedCompany || safeCompanies[0];

  const handleCompanySelect = (company: Company) => {
    setSelectedCompany(company);
    setOpen(false);
  };

  if (!safeCompanies.length) {
    return (
      <div className="flex items-center space-x-2">
        <div className="h-10 w-48 bg-muted animate-pulse rounded-md" />
      </div>
    );
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-48 justify-between"
        >
          {currentCompany ? (
            <>
              <span className="font-semibold">{currentCompany.symbol}</span>
              <span className="text-muted-foreground ml-2">-</span>
              <span className="text-muted-foreground ml-1 truncate">
                {currentCompany.name}
              </span>
            </>
          ) : (
            "选择公司..."
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-0">
        <Command>
          <CommandInput placeholder="搜索公司..." />
          <CommandList>
            <CommandEmpty>未找到公司。</CommandEmpty>
            <CommandGroup>
              {safeCompanies.map((company) => (
                <CommandItem
                  key={company.symbol}
                  value={company.symbol}
                  onSelect={() => handleCompanySelect(company)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      currentCompany?.symbol === company.symbol ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <div className="flex flex-col">
                    <span className="font-semibold">{company.symbol}</span>
                    <span className="text-sm text-muted-foreground truncate">
                      {company.name}
                    </span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
