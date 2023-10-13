import React, { useState } from "react";
import { Button, InputGroup, Form } from "react-bootstrap";
import { BsSearch } from 'react-icons/bs';
import styles from "./SearchBar.module.scss";
import PropTypes from "prop-types";

interface SearchProps {
  handleSearch: (query: string) => void;
}
const SearchBar: React.FC<SearchProps>= ({ handleSearch }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchValue = event.target.value;
    setSearchValue(newSearchValue);  
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault(); // Prevent the form from submitting
    handleSearch(searchValue);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <InputGroup>
        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="Search"
            className="rounded-pill"
            value={searchValue}
            onChange={handleInputChange}
          />
          <Button type="submit" className="rounded-pill" variant="outline-success">
            <BsSearch />
          </Button>
        </div>
      </InputGroup>
    </Form>
  );
};

SearchBar.propTypes = {
  handleSearch: PropTypes.func.isRequired, // Specify the type as a function
};

export default SearchBar;
