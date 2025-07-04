import React from 'react';
import { Tool } from '../types';
import { LinkIcon, PriceTagIcon, CategoryIcon } from './icons/Icons';

interface ToolCardProps {
  tool: Tool;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 animate-slide-in-up">
      <img className="w-full h-48 object-cover" src={tool.image_url} alt={`${tool.name} logo`} />
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{tool.name}</h3>
        <p className="text-gray-600 text-sm flex-grow mb-4">{tool.description}</p>
        
        <div className="mb-4 space-y-2">
            <div className="flex items-center text-sm text-gray-500">
                <CategoryIcon className="w-4 h-4 mr-2 text-brand-primary" />
                <span>{tool.category}</span>
            </div>
            <div className="flex items-center text-sm text-gray-500">
                <PriceTagIcon className="w-4 h-4 mr-2 text-brand-secondary" />
                <span>{tool.pricing_model}</span>
            </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {tool.tags.slice(0, 3).map(tag => (
            <span key={tag} className="bg-brand-accent/10 text-brand-accent text-xs font-semibold px-2.5 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
        
        <div className="mt-auto pt-4 border-t border-gray-200">
            <a
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 bg-brand-primary text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary"
            >
                <LinkIcon className="w-5 h-5" />
                Visit Website
            </a>
        </div>
      </div>
    </div>
  );
};

export default ToolCard;
