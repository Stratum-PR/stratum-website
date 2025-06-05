
import { Resource } from './types';
import { dataAnalyticsGuide } from './dataAnalyticsGuide';
import { customerServiceAutomationChecklist } from './customerServiceAutomationChecklist';
import { processAutomationWorksheet } from './processAutomationWorksheet';
import { aiImplementationToolkit } from './aiImplementationToolkit';

export const resourcesData = [
  dataAnalyticsGuide,
  customerServiceAutomationChecklist,
  processAutomationWorksheet,
  aiImplementationToolkit,
];

export const getResourceBySlug = (slug: string) => {
  return resourcesData.find(resource => resource.slug === slug);
};

export const getAllResources = () => {
  return resourcesData;
};

export type { Resource, ResourceContent } from './types';
