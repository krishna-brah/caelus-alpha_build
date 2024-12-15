import React from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface FiltersState {
  search: string;
  fabricCategory: string;
  fabricVariant: string;
  pattern: string;
}

interface FabricFiltersProps {
  filters: FiltersState;
  onFilterChange: (field: string, value: string) => void;
  fabricCategories: Record<string, string[]>;
  availableVariants: string[];
}

const FabricFilters: React.FC<FabricFiltersProps> = ({
  filters,
  onFilterChange,
  fabricCategories,
  availableVariants,
}) => {
  return (
    <div className="space-y-8 relative z-50">
      {/* Search */}
      <div className="relative">
        <div className="relative group">
          <MagnifyingGlassIcon className="absolute left-4 top-4 h-6 w-6 text-cosmic-300 group-focus-within:text-cosmic-500 transition-colors duration-200 pointer-events-none" />
          <input
            type="text"
            placeholder="Search fabrics by name, category, or pattern..."
            value={filters.search}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            onChange={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onFilterChange('search', e.target.value);
            }}
            className="w-full h-14 bg-white/5 border border-white/10 rounded-xl pl-14 pr-4 text-white placeholder-cosmic-300 focus:outline-none focus:ring-2 focus:ring-cosmic-500/50 text-lg shadow-xl backdrop-blur-sm relative z-50"
          />
        </div>
      </div>

      {/* Filter Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Material Type */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-cosmic-100">
            Material Type
          </label>
          <select
            value={filters.fabricCategory}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            onChange={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onFilterChange('fabricCategory', e.target.value);
            }}
            className="w-full h-11 bg-white/5 border border-white/10 rounded-lg px-4 text-white focus:outline-none focus:ring-2 focus:ring-cosmic-500/50 relative z-50"
          >
            <option value="">All Categories</option>
            {Object.keys(fabricCategories).map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Fabric Variant */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-cosmic-100">
            Fabric Variant
          </label>
          <select
            value={filters.fabricVariant}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            onChange={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onFilterChange('fabricVariant', e.target.value);
            }}
            className="w-full h-11 bg-white/5 border border-white/10 rounded-lg px-4 text-white focus:outline-none focus:ring-2 focus:ring-cosmic-500/50 disabled:opacity-50 disabled:cursor-not-allowed relative z-50"
            disabled={!filters.fabricCategory}
          >
            <option value="">All Variants</option>
            {availableVariants.map((variant) => (
              <option key={variant} value={variant}>
                {variant}
              </option>
            ))}
          </select>
        </div>

        {/* Pattern Type */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-cosmic-100">
            Pattern Type
          </label>
          <select
            value={filters.pattern}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            onChange={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onFilterChange('pattern', e.target.value);
            }}
            className="w-full h-11 bg-white/5 border border-white/10 rounded-lg px-4 text-white focus:outline-none focus:ring-2 focus:ring-cosmic-500/50 relative z-50"
          >
            <option value="">All Patterns</option>
            <option value="Solid">Solid</option>
            <option value="Print">Print</option>
            <option value="Floral">Floral</option>
            <option value="Geometric">Geometric</option>
            <option value="Striped">Striped</option>
            <option value="Textured">Textured</option>
            <option value="Jacquard">Jacquard</option>
            <option value="Herringbone">Herringbone</option>
            <option value="Plaid">Plaid</option>
            <option value="Houndstooth">Houndstooth</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FabricFilters;