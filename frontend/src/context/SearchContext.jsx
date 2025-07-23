import React, { createContext, useState } from 'react';

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchValue, setSearchValue] = useState('');
  const [searchType, setSearchType] = useState('book');

  return (
    <SearchContext.Provider value={{ searchValue, setSearchValue, searchType, setSearchType }}>
      {children}
    </SearchContext.Provider>
  );
};