import { useState } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const nav = useNavigate();
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    nav("/filmmaker/search/" + query);
  };

  return (
    <Form>
      <InputGroup>
        <Form.Control
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button variant="primary" onClick={handleSearch}>
          <FaSearch />
        </Button>
      </InputGroup>
    </Form>
  );
};

export default SearchBar;
