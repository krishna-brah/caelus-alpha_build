import React from 'react';
import { MagnifyingGlassIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';
import { Button } from './Button';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onFilter?: () => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  onFilter,
  placeholder = 'Search unique designs...',
}) => {
  const [query, setQuery] = React.useState('');
  const [isFocused, setIsFocused] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`relative group max-w-2xl mx-auto transition-all duration-300 ${
        isFocused ? 'scale-[1.02]' : 'scale-100'
      }`}
    >
      <div
        className={`relative flex items-center gap-2 p-2 bg-white dark:bg-neutral-900 rounded-2xl
          ${
            isFocused
              ? 'shadow-lg ring-2 ring-primary-500/50 dark:ring-primary-400/50'
              : 'shadow-soft hover:shadow-lg'
          }
        `}
      >
        <MagnifyingGlassIcon className="w-5 h-5 text-neutral-400 dark:text-neutral-500 ml-3" />
        
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="flex-1 bg-transparent border-none focus:outline-none text-base
            text-neutral-900 dark:text-neutral-100 placeholder-neutral-400
            dark:placeholder-neutral-500"
        />

        {query && (
          <Button
            type="submit"
            variant="default"
            size="sm"
            className="mr-1"
          >
            Search
          </Button>
        )}

        {onFilter && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onFilter}
            className="!px-3"
          >
            <AdjustmentsHorizontalIcon className="w-5 h-5" />
          </Button>
        )}
      </div>

      {/* Search suggestions - can be expanded based on needs */}
      {isFocused && query && (
        <div className="absolute top-full left-0 right-0 mt-2 p-2 bg-white dark:bg-neutral-900 rounded-xl shadow-xl border border-neutral-200 dark:border-neutral-800 z-50">
          <div className="p-2 text-sm text-neutral-500 dark:text-neutral-400">
            Popular searches...
          </div>
        </div>
      )}
    </form>
  );
};