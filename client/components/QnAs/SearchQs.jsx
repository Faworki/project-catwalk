import React from 'react';

var SearchQs = function ({ updateSearchTerm }) {
  return (
    <div>
      <input
        className='searchBar'
        type='text'
        onChange={updateSearchTerm}
        placeholder='Have a question? Search for answers…'
      />
    </div>
  );
};

export default SearchQs;
