import React, { useState, useEffect, useRef } from 'react';
import ReactDataGrid, { Column } from 'react-data-grid';
import { Data } from 'react-data-grid-addons';
import './Grid.scss';

interface IGridProps<T> {
  columns: Array<Column<any>>;
  data: T[];
}

const Grid: React.FC<IGridProps<any>> = <T extends {}>(props: IGridProps<T>) => {
  const { columns, data } = props;

  const reactDataGridRef = useRef(null as any | null);
  const [filters, setFilters] = useState({});
  const [filteredRows, setFilteredRows] = useState([] as T[]);
  const selectors = Data.Selectors;

  // Get rows using selectors
  const getFilteredRows = (r: T[], f: any) => {
    return selectors.getRows({ rows: r, filters: f }) as T[];
  };

  // Get row from filtered rows
  const getRow = (index: number) => {
    return filteredRows[index];
  };

  // Set rows
  useEffect(() => {
    setFilteredRows(getFilteredRows(data, filters));
  }, [data, filters]);

  // Automatically toggle the filter if any rows are tagged as filterable
  useEffect(() => {
    if (reactDataGridRef) {
      if (columns && columns.some(col => col.filterable)) {
        reactDataGridRef.current.onToggleFilter();
      }
    }
  }, [reactDataGridRef]);

  // Handle updating filters
  const handleFilterChange = (filter: any) => (filters: any) => {
    const newFilters = { ...filters };
    if (filter.filterTerm) {
      newFilters[filter.column.key] = filter;
    } else {
      delete newFilters[filter.column.key];
    }
    return newFilters;
  };

  // Set filters
  const handleAddFilter = (filter: any) => setFilters(handleFilterChange(filter));

  // Clear filters
  const handleClearFilters = () => setFilters({});

  return (
    <div className="data_grid">
      <ReactDataGrid
        ref={reactDataGridRef}
        columns={columns}
        rowGetter={getRow}
        rowsCount={filteredRows.length}
        onAddFilter={handleAddFilter}
        onClearFilters={handleClearFilters}
        enableCellSelect={true}
        minHeight={800}
      />
    </div>
  );
};

export default Grid;
