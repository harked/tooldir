import React, { useState, useEffect, useCallback } from 'react';
import { Tool, Filters, ToolCategory, PricingModel, GetToolsResponse } from './types';
import { toolService } from './services/toolService';
import Header from './components/Header';
import ToolCard from './components/ToolCard';
import SkeletonCard from './components/SkeletonCard';
import FilterPanel from './components/FilterPanel';
import Pagination from './components/Pagination';
import ToolSubmissionForm from './components/ToolSubmissionForm';

type View = 'DIRECTORY' | 'SUBMIT_TOOL';

const App: React.FC = () => {
  const [view, setView] = useState<View>('DIRECTORY');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [tools, setTools] = useState<Tool[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  const [filters, setFilters] = useState<Filters>({
    search: '',
    category: 'all',
    tags: [],
    pricing: 'all',
  });

  const [availableCategories, setAvailableCategories] = useState<ToolCategory[]>([]);
  const [availableTags, setAvailableTags] = useState<string[]>([]);
  const [availablePricingModels, setAvailablePricingModels] = useState<PricingModel[]>([]);

  const loadInitialFilters = useCallback(async () => {
    try {
      const [cats, tags, prices] = await Promise.all([
        toolService.getCategories(),
        toolService.getTags(),
        toolService.getPricingModels(),
      ]);
      setAvailableCategories(cats);
      setAvailableTags(tags);
      setAvailablePricingModels(prices);
    } catch (err) {
      setError('Failed to load filter options.');
    }
  }, []);
  
  useEffect(() => {
    loadInitialFilters();
  }, [loadInitialFilters]);

  const fetchTools = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const params = { ...filters, page: currentPage, limit: 9 };
      const response: GetToolsResponse = await toolService.getTools(params);
      setTools(response.data);
      setTotalPages(response.totalPages);
      setTotalCount(response.totalCount);
    } catch (err) {
      setError('Failed to fetch tools. Please try again later.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [filters, currentPage]);

  useEffect(() => {
    // Using eslint-disable because we want to control fetching explicitly
    // This effect should run when filters or currentPage change
    fetchTools();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, currentPage, fetchTools]);

  const handleFilterChange = (newFilters: Partial<Filters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setCurrentPage(1); // Reset to first page on filter change
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };
  
  const handleShowSubmitForm = () => {
    setView('SUBMIT_TOOL');
  };

  const handleToolSubmitted = () => {
    setView('DIRECTORY');
    setFilters({ search: '', category: 'all', tags: [], pricing: 'all' }); // Reset filters to show the new tool
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header
        isLoggedIn={isLoggedIn}
        onLoginToggle={() => setIsLoggedIn(!isLoggedIn)}
        onSubmitToolClick={handleShowSubmitForm}
        onLogoClick={() => setView('DIRECTORY')}
      />
      <main className="container mx-auto px-4 py-8">
        {view === 'DIRECTORY' ? (
          <div className="lg:grid lg:grid-cols-4 lg:gap-8">
            <aside className="lg:col-span-1 mb-8 lg:mb-0">
              <FilterPanel
                categories={availableCategories}
                tags={availableTags}
                pricingModels={availablePricingModels}
                filters={filters}
                onFilterChange={handleFilterChange}
              />
            </aside>
            <div className="lg:col-span-3">
              <div className="flex justify-between items-center mb-4">
                 <h2 className="text-xl font-bold text-gray-700">
                    {isLoading ? 'Searching tools...' : `${totalCount} Tools Found`}
                 </h2>
              </div>
              {error && <p className="text-red-500 bg-red-100 p-4 rounded-lg">{error}</p>}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 animate-fade-in">
                {isLoading
                  ? Array.from({ length: 9 }).map((_, index) => <SkeletonCard key={index} />)
                  : tools.map(tool => <ToolCard key={tool.id} tool={tool} />)}
              </div>
              {!isLoading && tools.length === 0 && !error && (
                <div className="text-center py-16 bg-white rounded-lg shadow-md">
                    <h3 className="text-2xl font-semibold text-gray-700">No Tools Found</h3>
                    <p className="text-gray-500 mt-2">Try adjusting your search or filter criteria.</p>
                </div>
              )}
              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </div>
          </div>
        ) : (
          <ToolSubmissionForm 
            onCancel={() => setView('DIRECTORY')} 
            onSuccess={handleToolSubmitted}
          />
        )}
      </main>
      <footer className="bg-brand-dark text-white text-center p-4 mt-8">
        <p>&copy; {new Date().getFullYear()} AI & SaaS Tools Directory. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
