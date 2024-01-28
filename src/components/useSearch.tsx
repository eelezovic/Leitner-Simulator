import { useState } from 'react';

type UseSearchProps<T> = {
    data: T[];
    searchKeys: (keyof T)[];
    initialQuery?: string; 
  };
  
  function useSearch<T>({ data, searchKeys, initialQuery = '' }: UseSearchProps<T>) {
    const [query, setQuery] = useState(initialQuery); 
  
    const filteredData = query
      ? data.filter((item) =>
          searchKeys.some((key) =>
            String(item[key]).toLowerCase().includes(query.toLowerCase())
          )
        )
      : data;
  
    return { query, setQuery, filteredData };
  }
  

export default useSearch;

