export interface ScenarioGroup {
  name: string;
  scenarios: string[];
}

export const availableScenarios: string[] = ['draft', 'phone', 'open', 'error', 'noquotes'];
