import React , {  useCallback } from 'react'
import FormField from "../FormField"
import debounce from "lodash/debounce";

const SearchBar = ({setSearchedResults, setLoading, setSearchText, searchText}) => {
    const handleDebounceSearchFn = async function(value) {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:8080/api/v1/post?s=${value}`, {
          method: "GET",
          "Content-Type": "application/json"
        })
  
        if(response.ok) {
          const result = await response.json();
          setSearchedResults(result.data);
        }
      } catch(err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
  
    const debounceSearchFn = useCallback(debounce(handleDebounceSearchFn, 500), []);
  
    const handleSearchChange = function(e) {
      console.log("searchChange");
      setSearchText(e.target.value);
      if(e.target.value) {
        debounceSearchFn(e.target.value)
      }
    }

  return (
    <div className="mt-16">
      <FormField 
        labelName="Search posts"
        type="text"
        name="text"
        placeholder="Search posts"
        value={searchText}
        handleChange={handleSearchChange}
      />
    </div>
  )
}

export default SearchBar