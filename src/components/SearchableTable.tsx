import React, { useState, useEffect } from "react";
import styles from "./SearchableTable.module.css";
import useSearch from "./useSearch";
import TablePagination from "./TablePagination";

type CardType = {
  id: number;
  title: string;
  description: string;
  isNew?: boolean;
};

type ColumnType = {
  field: keyof CardType;
  headerName: string;
};

const mockData: CardType[] = [
    {
      id: 1,
      title: "Algebra",
      description: "Study of mathematical ansajsaj.",
      isNew: true,
    },
    {
      id: 2,
      title: "Geometry",
      description: "Properties of shapes..ajsasasas.",
      isNew: false,
    },
    {
      id: 3,
      title: "Calculus",
      description: "Deals with rates sxvxvxvx.",
      isNew: false,
    },
    {
      id: 4,
      title: "Statistics",
      description: "Data collection xbxbxlsmxs.",
      isNew: false,
    },
    {
      id: 5,
      title: "Number theory",
      description: "sjahsjhdhdhasa.",
      isNew: false,
    },
    {
      id: 6,
      title: "XYZ Algebra",
      description: "Study of vector spaces and linear equations.",
      isNew: false,
    },
    {
      id: 7,
      title: "Differential Equations",
      description: "Describes change XYZ.",
      isNew: false,
    },
    {
      id: 8,
      title: "Probability ",
      description: "Studies randomness of XYZams",
      isNew: false,
    },
    {
      id: 9,
      title: "Math",
      description: "Counting, arrangement and bla bla.",
      isNew: false,
    },
    {
      id: 10,
      title: "Top",
      description: ".asasasa",
      isNew: false,
    },
    {
      id: 11,
      title: "Abstract ",
      description: "Study of  structures ...",
      isNew: false,
    },
    {
      id: 12,
      title: "Logic",
      description: "mathematics.",
      isNew: false,
    },

  ];
  

const mockColumns: ColumnType[] = [
  { field: "title", headerName: "CARD" },
  { field: "description", headerName: "DESCRIPTION" },
];

function SearchableTable() {
  const [data, setData] = useState(mockData);
  const [currentPage, setCurrentPage] = useState(1);
  const searchKeys: (keyof CardType)[] = ["title", "description"];
  const { query, setQuery, filteredData } = useSearch({ data, searchKeys });
  const [selectedRowId, setSelectedRowId] = useState<number | null>(null);

  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [query]);

  const handleRowClick = (rowId: number) => {
    setSelectedRowId(rowId);
  };

  // Handling click inside the table!
  const handleTableClick = () => {
    const updatedData = data.map((item) => ({ ...item, isNew: false }));
    setData(updatedData);
  };

  // this handles click outside the table..
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!event.target) return;
      const target = event.target as Element;
      if (!target.closest(`.${styles.tableContainer}`)) {
        const updatedData = data.map((item) => ({ ...item, isNew: false }));
        setData(updatedData);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [data]);

  return (
    <div className={styles.tableContainer} onClick={handleTableClick}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search in this deck"
        className={styles.searchInput}
      />
      <table className={styles.searchableTable}>
        <thead>
          <tr>
            {mockColumns.map((column) => (
              <th key={column.field}>{column.headerName}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row) => (
            <tr
              key={row.id}
              onClick={() => handleRowClick(row.id)}
              className={`${row.isNew ? styles.newRow : ""} ${
                selectedRowId === row.id ? styles.selectedRow : ""
              }`}
            >
              {mockColumns.map((column) => (
                <td key={`${row.id}-${column.field}`}>{row[column.field]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <TablePagination
        currentPage={currentPage}
        totalItems={filteredData.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

export default SearchableTable;
