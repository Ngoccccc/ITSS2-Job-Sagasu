import React, { useState } from "react";
import Layout from "../components/Layout/Layout";
import ListJob from "../components/ListJob";

const JobInfo = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = () => {
    // You can perform additional actions when the submit button is clicked
    console.log("Search term submitted:", searchTerm);
  };

  return (
    <div>
      <Layout />
      <div className="search-container">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search for jobs..."
        />
      </div>
      <ListJob searchTerm={searchTerm} />
    </div>
  );
};

export default JobInfo;
