
import { healthDataExchangeProject } from './healthcare-integration';
import { mlPredictiveEngineProject } from './municipal-budget-dashboard';

export const caseStudiesData = [
  healthDataExchangeProject,
  mlPredictiveEngineProject,
];

export const getCaseStudyBySlug = (slug: string) => {
  return caseStudiesData.find(study => study.slug === slug);
};

export const getAllCaseStudies = () => {
  return caseStudiesData;
};

export type CaseStudy = typeof healthcareIntegrationCaseStudy;
