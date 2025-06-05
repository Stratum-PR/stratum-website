import { Resource } from './types';
import { dataAnalyticsGuide } from './dataAnalyticsGuide';

export const resourcesData = [
  dataAnalyticsGuide,
  // Add more resources here
];

export const getResourceBySlug = (slug: string) => {
  return resourcesData.find(resource => resource.slug === slug);
};

export const getAllResources = () => {
  return resourcesData;
};

export type { Resource, ResourceContent } from './types'; 