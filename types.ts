export enum PricingModel {
  Free = 'Free',
  Freemium = 'Freemium',
  Paid = 'Paid',
  ContactForPrice = 'Contact for Price',
  OpenSource = 'Open Source',
}

export enum ToolCategory {
  AIAssistant = 'AI Assistant',
  ImageGeneration = 'Image Generation',
  CRM = 'CRM',
  MarketingAutomation = 'Marketing Automation',
  DevelopmentTools = 'Development Tools',
  Analytics = 'Analytics',
  NoCodeLowCode = 'No-Code/Low-Code',
  Productivity = 'Productivity',
  VideoGeneration = 'Video Generation',
}

export interface Tool {
  id: string;
  name: string;
  url: string;
  description: string;
  category: ToolCategory;
  tags: string[];
  pricing_model: PricingModel;
  image_url: string;
  submitted_by_user_id: string; // Mock user ID
  created_at: string;
  status: 'approved' | 'pending' | 'rejected';
}

export interface FetchInfoResponse {
  name: string;
  description: string;
  imageUrl: string;
}

export interface Filters {
  search: string;
  category: ToolCategory | 'all';
  tags: string[];
  pricing: PricingModel | 'all';
}

export interface GetToolsParams extends Filters {
  page: number;
  limit: number;
}

export interface GetToolsResponse {
  data: Tool[];
  totalPages: number;
  totalCount: number;
}
