
import { healthDataExchangeProject } from './healthcare-integration';
import { municipalBudgetDashboardCaseStudy } from './municipal-budget-dashboard';
import { salesPerformanceAnalyticsCaseStudy } from './sales-performance-analytics';

export const caseStudiesData = [
  healthcareIntegrationCaseStudy,
  municipalBudgetDashboardCaseStudy,
  salesPerformanceAnalyticsCaseStudy
];

export const getCaseStudyBySlug = (slug: string) => {
  return caseStudiesData.find(study => study.slug === slug);
};

export const getAllCaseStudies = () => {
  return caseStudiesData;
};

export type CaseStudy = typeof healthcareIntegrationCaseStudy;
