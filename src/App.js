import React, { useState, useEffect } from 'react'
import Data from './Data.json'
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaSearch } from "react-icons/fa";
import './searchBar.css'
function App() {
  const [input, setInput] = useState("")
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState("5")
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = Data.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(Data.length / recordsPerPage);
  const numbers = [...Array(totalPages + 1).keys()].slice(1);
  console.log(input)
  const tableRows = (e) => {
    setRecordsPerPage(e.target.value);
    setCurrentPage(1);
  }

  const prePage = () => {
    if (currentPage !== 1)
      setCurrentPage(currentPage - 1)
  }

  const changeCPage = (id) => {
    setCurrentPage(id)
  }
  const nextPage = () => {
    if (currentPage !== totalPages)
      setCurrentPage(currentPage + 1)
  }
  const tableSize = [
    { rows: "5" }, { rows: "10" }, { rows: "15" }, { rows: "20" }
  ]
  const searchHandler = (e) =>{
    setInput(e.target.value)
    if(e.target.value !== ''){
    setRecordsPerPage(Data.length)
  }
  if(e.target.value === ''){
    setRecordsPerPage(5)
  }
  // if(e.target.value !== Data.includes()){
  //   alert("`You Clicked on `")
  // }
  }
  let listing = <p>No records found</p> 
  if(Data.length>0){
   listing = <tbody>
      {
        records.map((d, i) => (
          <tr key={i}>
            <td> {d.ID} </td>
            <td> {d.Name} </td>
            <td> {d.City} </td>
          </tr>
          
        ))
      }
    </tbody>
  }
  
  return (
    <div>
      <select onChange={tableRows} >
        {tableSize.map(tabSize => (
          <option data-testid='tabSizeSelect' key={tabSize.rows} value={tabSize.rows}  >
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
        >
        </input>
      </div>
      <br></br>
      <table className='table'>
        <thead>
          <th>ID</th>
          <th>Name</th>
          <th>City</th>
        </thead>
        <tbody>
          {records.filter((items) => {  
            return (Data.includes(input)
              ? items
              : items.Name.toLowerCase().includes(input) || items.City.toLowerCase().includes(input)||items.ID.toLowerCase().includes(input) ) 
          })
          .map((d, i) => (
            <tr key={i}>
              <td> {d.ID} </td>
              <td> {d.Name} </td>
              <td> {d.City} </td>
            </tr>
            
          ))
          }
        </tbody>
      </table>
      <nav>
        <ul className='pagination'>
          <li className='page-item'>
            <a href='#' className='page-link' onClick={prePage}>Prev</a>
          </li>
          {
            // {`page-item${currentPage === n ? 'active' : ''}`}
            numbers.map((n, i) => (
              <li className='page-item' key={i}>
                <a href='#' className='page-link' onClick={() => changeCPage(n)}>{n}</a>
              </li>
            ))
          }
          <li className='page-item'>
            <a href='#' className='page-link' onClick={nextPage}>Next</a>
          </li>
        </ul>
      </nav>
    </div >
  )
}

export default App;
