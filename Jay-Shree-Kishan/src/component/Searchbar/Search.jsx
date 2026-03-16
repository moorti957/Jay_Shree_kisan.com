import React, { useState } from 'react'
import './Search.css'
import { FiSearch } from "react-icons/fi";

import { data } from 'react-router-dom';
import { categories } from '../../assets/assets';
const Search = () => {
 const [query, setQuery] = useState("")
 const [results, setResults] = useState([]);


 const handleSearch = ()=>{
  const trimedQuery = query.trim().toLowerCase();
  if (!trimedQuery){
    setResults([]);
    return;
  }

  const filtered = categories.filter((item)=>
    item.toLowerCase().includes(trimedQuery)
  );
  setResults(filtered);
 }

  return (
    <>
    <div className='srch'>

      <input type="text" value={query} onChange={(e)=> setQuery(e.target.value) } placeholder='search' onKeyDown={(e) => { if (e.key === 'Enter') { handleSearch();}}} />
      <FiSearch onClick={handleSearch}  className='icn'/>
      
    </div>

    <ul className='results-list'>
        {results.length > 0 ? (
          results.map((item, index) => <li key={index}>{item}</li>)
        ) : (
          query && <li>No results found</li>
        )}
      </ul>

    </>    

  )
}

export default Search
