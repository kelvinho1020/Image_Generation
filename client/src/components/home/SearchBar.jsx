import React , {  useCallback } from 'react'
import { FormField } from '../../components/common'
import debounce from "lodash/debounce";
import { apiGetPost } from "../../api";

const SearchBar = ({setSearchedResults, setLoading, setSearchText, searchText}) => {
    const handleDebounceSearchFn = async function(value) {
      setLoading(true);
      try {
        const response = await apiGetPost(0, value);
        const result = await response.data.data;
        setSearchedResults(result);

      } catch(err) {
        console.log(err.message);
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
        type="search"
        name="text"
        placeholder="Search posts"
        value={searchText}
        handleChange={handleSearchChange}
      />
    </div>
  )
}

export default SearchBar