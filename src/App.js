import React, { useState, useEffect } from 'react';
import Data from './Data.json';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaSearch } from "react-icons/fa";
import './searchBar.css';

function App() {
  const [input, setInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState("5");
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const filteredData = Data.filter((item) =>
    item.Name.toLowerCase().includes(input.toLowerCase()) ||
    item.City.toLowerCase().includes(input.toLowerCase()) ||
    item.ID.toLowerCase().includes(input.toLowerCase())
  );
  const records = filteredData.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filteredData.length / recordsPerPage);
  const numbers = [...Array(totalPages + 1).keys()].slice(1);

  const tableRows = (e) => 
  {
    setRecordsPerPage(e.target.value);
    setCurrentPage(1);
  };

  const prePage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const changeCPage = (id) => {
    setCurrentPage(id);
  };

  const nextPage = () => {
    if (currentPage !== totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const tableSize = [
    { rows: "5" }, { rows: "10" }, { rows: "15" }, { rows: "20" }
  ];

  const searchHandler = (e) => {
    setInput(e.target.value);
    // setRecordsPerPage(Data.length);
    setCurrentPage(1);
    if (e.target.value === '') {
    setInput('');
    setRecordsPerPage(recordsPerPage); // Set to the already selected value
  }
  };

  const renderTable = () => {
    if (filteredData.length === 0) {
      return (
        <tbody>
          <tr>
            <td colSpan="3">No records found.</td>
          </tr>
        </tbody>
      );
    } else {
      return (
        <tbody>
          {records.map((d, i) => (
            <tr key={i}>
              <td>{d.ID}</td>
              <td>{d.Name}</td>
              <td>{d.City}</td>
            </tr>
          ))}
        </tbody>
      );
    }
  };

  return (
    <div>
      <select onChange={tableRows}>
        {tableSize.map((tabSize) => (
          <option key={tabSize.rows} value={tabSize.rows}>
            {tabSize.rows}
          </option>
        ))}
      </select>
      <br></br>
      <br></br>
      <div className="input">
        <FaSearch id="search-icon" />
        <input
          maxLength={30}
          className="textbox"
          placeholder="Type to search...."
          value={input}
          onChange={searchHandler}
          autoFocus="autoFocus"
        ></input>
      </div>
      <br></br>
      <table className='table'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>City</th>
          </tr>
        </thead>
        {renderTable()}
      </table>
      <nav>
        <ul className='pagination'>
          <li className='page-item'>
            <a href='#' className='page-link' onClick={prePage}>Prev</a>
          </li>
          {numbers.map((n, i) => (
            <li className='page-item' key={i}>
              <a href='#' className='page-link' onClick={() => changeCPage(n)}>{n}</a>
            </li>
          ))}
          <li className='page-item'>
            <a href='#' className='page-link' onClick={nextPage}>Next</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default App;
