import {
  Button,
  Checkbox,
  Input,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import React, { useState } from 'react';
import { ScenarioGroup } from './scenario-models';
import styles from './ScenarioLoader.module.scss';

interface ScenarioItemOptionType {
  inputValue?: string;
  name: string;
  scenarios: string[];
}

export interface IScenarioLoaderProps {
  selectedScenarioGroup: ScenarioGroup | null;
  scenarioGroups: ScenarioGroup[];
  scenarios: string[];
  onScenarioAdded: (scenarioGroup: ScenarioGroup) => void;
  onScenarioDeleted: (scenarioGroup: ScenarioGroup) => void;
  onScenarioSet: (scenarioGroup: ScenarioGroup) => void;
}

const ScenarioLoader = ({
  selectedScenarioGroup: selectedGroup,
  scenarioGroups,
  scenarios,
  onScenarioAdded,
  onScenarioSet,
}: IScenarioLoaderProps) => {
  const [isSelectorVisible, toggleSelectorVisbility] = useState(false);
  const [
    selectedScenarioGroup,
    setSelectedScenarioGroup,
  ] = React.useState<ScenarioItemOptionType | null>(selectedGroup);
  const scenarioOptions = scenarioGroups;

  const filter = createFilterOptions<ScenarioItemOptionType>();

  const handleChange = (scenarios: string[]) => {
    setSelectedScenarioGroup({
      ...selectedScenarioGroup!,
      ...{ scenarios },
    });
  };

  return (
    <div className={styles.scenarioLoader}>
      <button onClick={() => toggleSelectorVisbility(!isSelectorVisible)}>+</button>
      {isSelectorVisible && (
        <div className={styles.scenarioLoaderPanel}>
          <Typography variant="h5" className={styles.title}>
            Scenario Selector
          </Typography>
          <Autocomplete
            selectOnFocus
            openOnFocus
            className={styles.selectCreate}
            value={selectedScenarioGroup}
            onChange={(event: any, newValue: ScenarioItemOptionType | null) => {
              if (newValue && newValue.inputValue) {
                setSelectedScenarioGroup({
                  inputValue: newValue.inputValue,
                  name: newValue.inputValue,
                  scenarios: [],
                });
                return;
              }

              setSelectedScenarioGroup(newValue);
              if (newValue !== null) {
                toggleSelectorVisbility(!isSelectorVisible);
                onScenarioSet(newValue!);
              }
            }}
            filterOptions={(options, params) => {
              const filtered = filter(options, params) as ScenarioItemOptionType[];

              if (params.inputValue !== '') {
                filtered.push({
                  inputValue: params.inputValue,
                  name: `Add "${params.inputValue}"`,
                  scenarios: [],
                });
              }

              return filtered;
            }}
            id="free-solo-with-text-demo"
            options={scenarioOptions}
            getOptionLabel={option => {
              // e.g value selected with enter, right from the input
              if (typeof option === 'string') {
                return option;
              }
              if (option.inputValue) {
                return option.inputValue;
              }
              return option.name;
            }}
            renderOption={option => option.name}
            freeSolo
            renderInput={params => (
              <TextField {...params} label="Select or Create Scenario" variant="outlined" />
            )}
          />

          <InputLabel className={styles.scenariosTitle} id="demo-mutiple-checkbox-label">
            Scenarios
          </InputLabel>
          <Select
            className={styles.scenarios}
            labelId="demo-mutiple-checkbox-label"
            id="demo-mutiple-checkbox"
            multiple
            value={selectedScenarioGroup?.scenarios || []}
            onChange={event => handleChange(event.target.value as string[])}
            input={<Input />}
            renderValue={(selected: any) => selected.join(', ')}>
            {scenarios.map(scenario => (
              <MenuItem key={scenario} value={scenario}>
                <Checkbox
                  checked={
                    selectedScenarioGroup
                      ? selectedScenarioGroup.scenarios.indexOf(scenario) > -1
                      : false
                  }
                />
                <ListItemText primary={scenario} />
              </MenuItem>
            ))}
          </Select>
          <div className={styles.actions}>
            <Button
              disabled={
                selectedScenarioGroup === null ||
                selectedScenarioGroup.inputValue === null ||
                selectedScenarioGroup.inputValue === undefined
              }
              variant="contained"
              color="secondary"
              onClick={() => {
                selectedScenarioGroup!.inputValue = undefined;
                onScenarioAdded(selectedScenarioGroup!);
                onScenarioSet(selectedScenarioGroup!);
              }}>
              Save
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScenarioLoader;
