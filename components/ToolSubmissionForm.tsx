import React, { useState, useEffect } from 'react';
import { Tool, ToolCategory, PricingModel } from '../types';
import { toolService } from '../services/toolService';
import { LinkIcon, LoaderIcon } from './icons/Icons';

interface ToolSubmissionFormProps {
  onCancel: () => void;
  onSuccess: () => void;
}

const ToolSubmissionForm: React.FC<ToolSubmissionFormProps> = ({ onCancel, onSuccess }) => {
  const [formData, setFormData] = useState<Omit<Tool, 'id' | 'created_at' | 'status' | 'submitted_by_user_id'>>({
    name: '',
    url: '',
    description: '',
    category: ToolCategory.AIAssistant,
    tags: [],
    pricing_model: PricingModel.Free,
    image_url: ''
  });
  
  const [tagsInput, setTagsInput] = useState('');
  const [isFetching, setIsFetching] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [availableCategories, setAvailableCategories] = useState<ToolCategory[]>([]);
  const [availablePricingModels, setAvailablePricingModels] = useState<PricingModel[]>([]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [cats, prices] = await Promise.all([
          toolService.getCategories(),
          toolService.getPricingModels(),
        ]);
        setAvailableCategories(cats);
        setAvailablePricingModels(prices);
      } catch (err) {
        setError("Failed to load form options.");
      }
    };
    fetchOptions();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagsInput(e.target.value);
    setFormData(prev => ({ ...prev, tags: e.target.value.split(',').map(tag => tag.trim()).filter(Boolean) }));
  };

  const handleFetchInfo = async () => {
    if (!formData.url) {
      setError('Please enter a URL first.');
      return;
    }
    setIsFetching(true);
    setError(null);
    try {
      const info = await toolService.fetchInfoFromUrl(formData.url);
      setFormData(prev => ({
        ...prev,
        name: info.name,
        description: info.description,
        image_url: info.imageUrl,
      }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch info from URL.');
    } finally {
      setIsFetching(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.url || !formData.description) {
        setError("Please fill in all required fields.");
        return;
    }
    setIsSubmitting(true);
    setError(null);
    try {
      await toolService.addTool({
        ...formData,
        submitted_by_user_id: 'mock_user_123', // Hardcoded for this mock
      });
      onSuccess();
    } catch (err) {
      setError('Failed to submit the tool. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-2xl animate-fade-in">
      <h2 className="text-3xl font-bold text-gray-800 mb-2">Submit a New Tool</h2>
      <p className="text-gray-500 mb-8">Share an awesome tool with the community. Make sure it's not already in the directory!</p>

      {error && <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert"><p>{error}</p></div>}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="url" className="block text-sm font-medium text-gray-700">Tool URL*</label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"><LinkIcon className="w-5 h-5"/></span>
            <input type="url" name="url" id="url" value={formData.url} onChange={handleChange} required className="flex-1 block w-full rounded-none border-gray-300 focus:ring-brand-primary focus:border-brand-primary sm:text-sm" placeholder="https://example.com" />
            <button type="button" onClick={handleFetchInfo} disabled={isFetching} className="inline-flex items-center px-4 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-wait">
              {isFetching ? <LoaderIcon className="w-5 h-5 animate-spin" /> : 'Fetch Info'}
            </button>
          </div>
        </div>

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Tool Name*</label>
          <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary sm:text-sm" placeholder="My Awesome Tool" />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description*</label>
          <textarea name="description" id="description" value={formData.description} onChange={handleChange} required rows={4} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary sm:text-sm" placeholder="A brief and clear description of what the tool does."></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category*</label>
                <select id="category" name="category" value={formData.category} onChange={handleChange} required className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm">
                    {availableCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
            </div>
            <div>
                <label htmlFor="pricing_model" className="block text-sm font-medium text-gray-700">Pricing Model*</label>
                <select id="pricing_model" name="pricing_model" value={formData.pricing_model} onChange={handleChange} required className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm">
                    {availablePricingModels.map(pm => <option key={pm} value={pm}>{pm}</option>)}
                </select>
            </div>
        </div>
        
        <div>
          <label htmlFor="tags" className="block text-sm font-medium text-gray-700">Tags (comma-separated)</label>
          <input type="text" name="tags" id="tags" value={tagsInput} onChange={handleTagsChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary sm:text-sm" placeholder="e.g. api, free, productivity" />
        </div>

        <div>
          <label htmlFor="image_url" className="block text-sm font-medium text-gray-700">Image URL</label>
          <input type="url" name="image_url" id="image_url" value={formData.image_url} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary sm:text-sm" placeholder="https://example.com/logo.png" />
        </div>

        <div className="flex justify-end gap-4 pt-4 border-t border-gray-200">
          <button type="button" onClick={onCancel} className="bg-gray-200 text-gray-800 font-bold py-2 px-6 rounded-lg hover:bg-gray-300 transition-colors">Cancel</button>
          <button type="submit" disabled={isSubmitting} className="bg-brand-secondary text-white font-bold py-2 px-6 rounded-lg hover:bg-green-600 transition-colors disabled:bg-green-300 disabled:cursor-not-allowed flex items-center gap-2">
            {isSubmitting && <LoaderIcon className="w-5 h-5 animate-spin" />}
            {isSubmitting ? 'Submitting...' : 'Submit Tool'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ToolSubmissionForm;
