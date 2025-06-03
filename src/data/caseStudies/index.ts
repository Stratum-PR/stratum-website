
import { healthDataExchangeProject } from './healthDataExchangeProject';
import { mlPredictiveEngineProject } from './mlPredictiveEngineProject';

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

export type CaseStudy = typeof healthDataExchangeProject;
