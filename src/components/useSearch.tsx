import { useState } from 'react';

type UseSearchProps<T> = {
  data: T[];
  searchKeys: (keyof T)[];
};

function useSearch<T>({ data, searchKeys }: UseSearchProps<T>) {
  const [query, setQuery] = useState('');

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

