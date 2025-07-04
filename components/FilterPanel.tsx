import React, { useState } from 'react';
import { Filters, ToolCategory, PricingModel } from '../types';
import { SearchIcon, TagIcon, CategoryIcon, PriceTagIcon } from './icons/Icons';

interface FilterPanelProps {
  categories: ToolCategory[];
  tags: string[];
  pricingModels: PricingModel[];
  filters: Filters;
  onFilterChange: (newFilters: Partial<Filters>) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ categories, tags, pricingModels, filters, onFilterChange }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterChange({ search: searchTerm });
  };
  
  const handleTagToggle = (tag: string) => {
    const newTags = filters.tags.includes(tag)
      ? filters.tags.filter(t => t !== tag)
      : [...filters.tags, tag];
    onFilterChange({ tags: newTags });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
      <form onSubmit={handleSearchSubmit}>
        <label htmlFor="search" className="block text-lg font-semibold text-gray-800 mb-2">
          Search
        </label>
        <div className="relative">
          <input
            id="search"
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search by name or description..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent transition"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="w-5 h-5 text-gray-400" />
          </div>
        </div>
      </form>

      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2"><CategoryIcon className="w-5 h-5"/>Categories</h3>
        <select
          value={filters.category}
          onChange={e => onFilterChange({ category: e.target.value as ToolCategory | 'all' })}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent transition"
        >
          <option value="all">All Categories</option>
          {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2"><PriceTagIcon className="w-5 h-5"/>Pricing Model</h3>
        <div className="space-y-2">
            {['all', ...pricingModels].map(pm => (
                <div key={pm} className="flex items-center">
                    <input
                        type="radio"
                        id={`pricing-${pm}`}
                        name="pricing"
                        value={pm}
                        checked={filters.pricing === pm}
                        onChange={e => onFilterChange({ pricing: e.target.value as PricingModel | 'all' })}
                        className="h-4 w-4 text-brand-primary focus:ring-brand-primary border-gray-300"
                    />
                    <label htmlFor={`pricing-${pm}`} className="ml-3 block text-sm font-medium text-gray-700">
                      {pm === 'all' ? 'All Models' : pm}
                    </label>
                </div>
            ))}
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2"><TagIcon className="w-5 h-5"/>Tags</h3>
        <div className="flex flex-wrap gap-2">
          {tags.map(tag => (
            <button
              key={tag}
              onClick={() => handleTagToggle(tag)}
              className={`px-3 py-1 text-sm font-medium rounded-full transition-colors duration-200 ${
                filters.tags.includes(tag)
                  ? 'bg-brand-primary text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
