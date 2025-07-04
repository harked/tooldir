import { Tool, GetToolsParams, GetToolsResponse, ToolCategory, PricingModel, FetchInfoResponse } from '../types';

const MOCK_TOOLS: Tool[] = [
  { id: '1', name: 'Gemini', url: 'https://gemini.google.com', description: 'A powerful, multimodal AI model from Google.', category: ToolCategory.AIAssistant, tags: ['api', 'free', 'paid'], pricing_model: PricingModel.Freemium, image_url: 'https://picsum.photos/seed/gemini/400/300', submitted_by_user_id: 'user1', created_at: '2023-10-26T10:00:00Z', status: 'approved' },
  { id: '2', name: 'Midjourney', url: 'https://www.midjourney.com', description: 'An independent research lab exploring new mediums of thought and expanding the imaginative powers of the human species.', category: ToolCategory.ImageGeneration, tags: ['discord', 'paid'], pricing_model: PricingModel.Paid, image_url: 'https://picsum.photos/seed/midjourney/400/300', submitted_by_user_id: 'user1', created_at: '2023-10-25T11:30:00Z', status: 'approved' },
  { id: '3', name: 'HubSpot', url: 'https://www.hubspot.com', description: 'A CRM platform with all the software, integrations, and resources you need to connect marketing, sales, content management, and customer service.', category: ToolCategory.CRM, tags: ['marketing', 'sales', 'freemium'], pricing_model: PricingModel.Freemium, image_url: 'https://picsum.photos/seed/hubspot/400/300', submitted_by_user_id: 'user2', created_at: '2023-10-24T09:00:00Z', status: 'approved' },
  { id: '4', name: 'Webflow', url: 'https://webflow.com', description: 'Build responsive websites in your browser, then host with us or export your code to host wherever.', category: ToolCategory.NoCodeLowCode, tags: ['no-code', 'design', 'hosting'], pricing_model: PricingModel.Freemium, image_url: 'https://picsum.photos/seed/webflow/400/300', submitted_by_user_id: 'user2', created_at: '2023-10-23T14:00:00Z', status: 'approved' },
  { id: '5', name: 'Google Analytics', url: 'https://analytics.google.com', description: 'A web analytics service that tracks and reports website traffic.', category: ToolCategory.Analytics, tags: ['free', 'data', 'tracking'], pricing_model: PricingModel.Free, image_url: 'https://picsum.photos/seed/analytics/400/300', submitted_by_user_id: 'user1', created_at: '2023-10-22T16:45:00Z', status: 'approved' },
  { id: '6', name: 'VS Code', url: 'https://code.visualstudio.com', description: 'A free source-code editor made by Microsoft for Windows, Linux and macOS.', category: ToolCategory.DevelopmentTools, tags: ['open-source', 'free', 'ide'], pricing_model: PricingModel.OpenSource, image_url: 'https://picsum.photos/seed/vscode/400/300', submitted_by_user_id: 'user3', created_at: '2023-10-21T18:00:00Z', status: 'approved' },
  { id: '7', name: 'Zapier', url: 'https://zapier.com', description: 'Easy automation for busy people. Zapier moves info between your web apps automatically.', category: ToolCategory.MarketingAutomation, tags: ['integration', 'workflow'], pricing_model: PricingModel.Freemium, image_url: 'https://picsum.photos/seed/zapier/400/300', submitted_by_user_id: 'user3', created_at: '2023-10-20T12:10:00Z', status: 'approved' },
  { id: '8', name: 'Figma', url: 'https://www.figma.com', description: 'The collaborative interface design tool.', category: ToolCategory.DevelopmentTools, tags: ['design', 'ui', 'ux', 'collaboration'], pricing_model: PricingModel.Freemium, image_url: 'https://picsum.photos/seed/figma/400/300', submitted_by_user_id: 'user1', created_at: '2023-10-19T10:00:00Z', status: 'approved' },
  { id: '9', name: 'Notion', url: 'https://www.notion.so', description: 'The all-in-one workspace for your notes, tasks, wikis, and databases.', category: ToolCategory.Productivity, tags: ['collaboration', 'docs', 'freemium'], pricing_model: PricingModel.Freemium, image_url: 'https://picsum.photos/seed/notion/400/300', submitted_by_user_id: 'user2', created_at: '2023-10-18T15:20:00Z', status: 'approved' },
  { id: '10', name: 'Runway', url: 'https://runwayml.com/', description: 'AI video creation suite. Everything you need to make anything you want.', category: ToolCategory.VideoGeneration, tags: ['video', 'ai', 'creative'], pricing_model: PricingModel.Freemium, image_url: 'https://picsum.photos/seed/runway/400/300', submitted_by_user_id: 'user3', created_at: '2023-11-01T10:00:00Z', status: 'approved' },
  { id: '11', name: 'Bubble', url: 'https://bubble.io', description: 'The best way to build web apps without code.', category: ToolCategory.NoCodeLowCode, tags: ['no-code', 'app builder'], pricing_model: PricingModel.Paid, image_url: 'https://picsum.photos/seed/bubble/400/300', submitted_by_user_id: 'user1', created_at: '2023-11-02T11:00:00Z', status: 'approved' },
  { id: '12', name: 'Sentry', url: 'https://sentry.io', description: 'Application monitoring and error tracking software.', category: ToolCategory.DevelopmentTools, tags: ['monitoring', 'debugging', 'open-source'], pricing_model: PricingModel.Freemium, image_url: 'https://picsum.photos/seed/sentry/400/300', submitted_by_user_id: 'user2', created_at: '2023-11-03T12:00:00Z', status: 'approved' },
  { id: '13', name: 'Loom', url: 'https://www.loom.com', description: 'Video messaging for work.', category: ToolCategory.Productivity, tags: ['video', 'collaboration'], pricing_model: PricingModel.Freemium, image_url: 'https://picsum.photos/seed/loom/400/300', submitted_by_user_id: 'user3', created_at: '2023-11-04T13:00:00Z', status: 'approved' },
  { id: '14', name: 'Jasper', url: 'https://www.jasper.ai/', description: 'The AI Content Platform that helps you and your team break through creative blocks to create amazing, original content 10X faster.', category: ToolCategory.AIAssistant, tags: ['writing', 'content', 'paid'], pricing_model: PricingModel.Paid, image_url: 'https://picsum.photos/seed/jasper/400/300', submitted_by_user_id: 'user1', created_at: '2023-11-05T14:00:00Z', status: 'approved' },
  { id: '15', name: 'Tableau', url: 'https://www.tableau.com/', description: 'Leading data visualization software.', category: ToolCategory.Analytics, tags: ['data visualization', 'business intelligence'], pricing_model: PricingModel.Paid, image_url: 'https://picsum.photos/seed/tableau/400/300', submitted_by_user_id: 'user2', created_at: '2023-11-06T15:00:00Z', status: 'approved' },
];

const allTools: Tool[] = [...MOCK_TOOLS];

export const toolService = {
  async getTools(params: GetToolsParams): Promise<GetToolsResponse> {
    console.log("Fetching tools with params:", params);
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay

    let filteredTools = allTools.filter(tool => tool.status === 'approved');

    // Search filter
    if (params.search) {
      const searchTerm = params.search.toLowerCase();
      filteredTools = filteredTools.filter(
        tool =>
          tool.name.toLowerCase().includes(searchTerm) ||
          tool.description.toLowerCase().includes(searchTerm)
      );
    }

    // Category filter
    if (params.category && params.category !== 'all') {
      filteredTools = filteredTools.filter(tool => tool.category === params.category);
    }

    // Pricing filter
    if (params.pricing && params.pricing !== 'all') {
        filteredTools = filteredTools.filter(tool => tool.pricing_model === params.pricing);
    }

    // Tags filter
    if (params.tags && params.tags.length > 0) {
      filteredTools = filteredTools.filter(tool =>
        params.tags.every(tag => tool.tags.includes(tag))
      );
    }

    const totalCount = filteredTools.length;
    const totalPages = Math.ceil(totalCount / params.limit);
    const startIndex = (params.page - 1) * params.limit;
    const endIndex = startIndex + params.limit;
    const paginatedData = filteredTools.slice(startIndex, endIndex);

    return {
      data: paginatedData,
      totalPages,
      totalCount
    };
  },

  async getCategories(): Promise<ToolCategory[]> {
    await new Promise(resolve => setTimeout(resolve, 100));
    const categories = new Set(allTools.map(tool => tool.category));
    return Array.from(categories).sort();
  },
  
  async getPricingModels(): Promise<PricingModel[]> {
    await new Promise(resolve => setTimeout(resolve, 100));
    const pricingModels = new Set(allTools.map(tool => tool.pricing_model));
    return Array.from(pricingModels).sort();
  },

  async getTags(): Promise<string[]> {
    await new Promise(resolve => setTimeout(resolve, 100));
    const tags = new Set(allTools.flatMap(tool => tool.tags));
    return Array.from(tags).sort();
  },

  async fetchInfoFromUrl(url: string): Promise<FetchInfoResponse> {
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate fetching and parsing
    if (!url || !url.includes('.')) {
        throw new Error("Invalid URL provided.");
    }
    
    // Simulate parsing a real URL
    const domain = url.match(/:\/\/(.[^/]+)/);
    const name = domain ? domain[1].replace('www.', '').split('.')[0] : 'Fetched Tool';
    const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);


    return {
      name: `${capitalizedName}`,
      description: `This is an automatically fetched description for ${capitalizedName}. It's a fantastic tool that helps users achieve their goals efficiently.`,
      imageUrl: `https://picsum.photos/seed/${name}/400/300`,
    };
  },

  async addTool(toolData: Omit<Tool, 'id' | 'created_at' | 'status'>): Promise<Tool> {
    await new Promise(resolve => setTimeout(resolve, 700));
    const newTool: Tool = {
        ...toolData,
        id: new Date().getTime().toString(),
        created_at: new Date().toISOString(),
        status: 'approved', // Auto-approved for this mock
    };
    allTools.unshift(newTool); // Add to the beginning of the list
    return newTool;
  }
};
