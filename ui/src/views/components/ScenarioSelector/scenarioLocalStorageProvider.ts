import { ScenarioGroup } from './scenario-models';

const SCENARIO_GROUPS = 'scenarioGroups';
const SELECTED_SCENARIO_GROUP = 'selectedScenarioGroup';

export const getSelectedScenario = () => {
  const selectedScenarioGroup = window.localStorage.getItem(SELECTED_SCENARIO_GROUP);
  return selectedScenarioGroup ? (JSON.parse(selectedScenarioGroup) as ScenarioGroup) : null;
};

export const addScenario = (scenario: ScenarioGroup) => {
  let allSceanrios = getScenarios();
  allSceanrios.push(scenario);
  window.localStorage.setItem(SCENARIO_GROUPS, JSON.stringify(allSceanrios));
};

export const setCurrentScenario = (scenario: ScenarioGroup) => {
  window.localStorage.setItem(SELECTED_SCENARIO_GROUP, JSON.stringify(scenario));
};

export const getScenarios = () => {
  const allSceanrionString = window.localStorage.getItem(SCENARIO_GROUPS) || '[]';
  return JSON.parse(allSceanrionString) as ScenarioGroup[];
};
