import React,{useState} from "react";
import { Dropdown } from "react-bootstrap";

interface FilterProps {
  options: { label: string; value: string }[];
  onSelectFilter: (selectedOption: { label: string; value: string }) => void;
}

export const PlanFilter: React.FC<FilterProps> = ({ options, onSelectFilter }) => {
  const [dropdownId] = useState(`dropdown-${Math.random().toString(36).substring(7)}`);
  const handleFilterSelect = (selectedOption: { label: string; value: string }) => {
    // Pass the selected filter option to the parent component
    onSelectFilter(selectedOption);
  };

  return (
    <Dropdown>
      <Dropdown.Toggle         
        variant="secondary"
        id="dropdown-basic"
        // id={dropdownId} // Use the dynamically generated ID
        className="rounded-pill"
      >
        Filter
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {options.map((option) => (
          <Dropdown.Item
            key={option.value}
            onClick={() => handleFilterSelect(option)}
          >
            {option.label}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>      
    </Dropdown>
  );
};

export const TotalIncomeFilter: React.FC<FilterProps> = ({ options, onSelectFilter }) => {
  const [dropdownId] = useState(`dropdown-${Math.random().toString(36).substring(7)}`);
  const handleFilterSelect = (selectedOption: { label: string; value: string }) => {
    // Pass the selected filter option to the parent component
    onSelectFilter(selectedOption);
  };

  return (
    <Dropdown>
      <Dropdown.Toggle         
        variant="secondary"
        id="dropdown-basic"
        // id={dropdownId} // Use the dynamically generated ID
        className="rounded-pill"
      >
        Filter
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item href={`#${dropdownId}/action-1`}>Plan Name</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export const CourseTransitionFilter: React.FC<FilterProps> = ({ options, onSelectFilter }) => {
  const [dropdownId] = useState(`dropdown-${Math.random().toString(36).substring(7)}`);
  const handleFilterSelect = (selectedOption: { label: string; value: string }) => {
    // Pass the selected filter option to the parent component
    onSelectFilter(selectedOption);
  };

  return (
    <Dropdown>
      <Dropdown.Toggle         
        variant="secondary"
        id="dropdown-basic"
        // id={dropdownId} // Use the dynamically generated ID
        className="rounded-pill"
      >
        Filter
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item href={`#${dropdownId}/action-1`}>Plan Name</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export const AllSchoolFilter: React.FC<FilterProps> = ({ options, onSelectFilter }) => {
  const [dropdownId] = useState(`dropdown-${Math.random().toString(36).substring(7)}`);
  const handleFilterSelect = (selectedOption: { label: string; value: string }) => {
    // Pass the selected filter option to the parent component
    onSelectFilter(selectedOption);
  };

  return (
    <Dropdown>
      <Dropdown.Toggle         
        variant="secondary"
        id="dropdown-basic"
        // id={dropdownId} // Use the dynamically generated ID
        className="rounded-pill"
      >
        Filter
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item href={`#${dropdownId}/action-1`}>Plan Name</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};