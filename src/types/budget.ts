export type BudgetSummary = {
  projectType: string;
  totalValue: string;
  estimatedTimeline: string;
  paymentSchedule: string;
};

export type BudgetSection = {
  title: string;
  description?: string;
  items?: string[];
};

export type Budget = {
  title: string;
  client: string;
  developer: string;
  date: string;
  validity: string;
  summary: BudgetSummary;
  sections: BudgetSection[];
};
