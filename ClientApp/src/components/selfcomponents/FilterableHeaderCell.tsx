import React, { useState } from 'react';
import { Column } from 'react-data-grid';

interface IFilterableHeaderCell {
  onChange: (filter: { filterTerm: string; column: Column<any> }) => Promise<void>;
  column: Column<any>;
  forbiddenCharacters: string[];
}

const FilterableHeaderCell: React.FC<IFilterableHeaderCell> = props => {
  const { onChange, column, forbiddenCharacters } = props;

  const [filterTerm, setFilterTerm] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value || '';

    // remove all forbidden characters
    if (forbiddenCharacters && forbiddenCharacters.length > 0) {
      const forbiddenCharacterList = forbiddenCharacters.join('|');
      const regex = new RegExp(forbiddenCharacterList, 'g');
      val = val.replace(regex, '');
    }

    setFilterTerm(val);
    onChange({ filterTerm: val, column: column });
  };

  const renderInput = () => {
    if (column.filterable === false) {
      return <span />;
    }

    const inputKey = 'header-filter-' + column.key;
    return (
      <input
        key={inputKey}
        type="text"
        className="form-control input-sm"
        placeholder="Search"
        value={filterTerm}
        onChange={handleChange}
      />
    );
  };

  return (
    <div>
      <div className="form-group">{renderInput()}</div>
    </div>
  );
};

const CreateFilterableHeaderCell = (forbiddenCharacters: string[]) => {
  return (props: IFilterableHeaderCell) => (
    <FilterableHeaderCell {...props} forbiddenCharacters={forbiddenCharacters} />
  );
};

export default CreateFilterableHeaderCell;
