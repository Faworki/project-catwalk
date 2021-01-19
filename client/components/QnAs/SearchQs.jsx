import React from 'react';

var SearchQs = function ({ updateSearchTerm }) {
  return (
    <div>
      <input
        type='text'
        onChange={updateSearchTerm}
        style={{ width: '80%' }}
        placeholder='Have a question? Search for answers…'
      />
    </div>
  );
};

export default SearchQs;
