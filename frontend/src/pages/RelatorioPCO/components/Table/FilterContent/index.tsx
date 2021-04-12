import React, { useState } from 'react';
import ItemWithRemoveButton from '../../../../../components/ItemWithRemoveButton';
import PainelToListItens from '../../../../../components/PainelToListItens';

import { Content, FilterInputsContent } from './styles';

export interface IFilterContentLines {
  key: any;
  itens: Array<{
    key: any;
    isCurrency: boolean;
    value: any;
  }>;
}

export interface IFilterContent {
  fieldsFilter: string[];
  filterList: Array<{ field: string; value: string }>;
  handleAddFilter: (field: string, value: string) => void;
  handleRemoveFilter: (index: number) => void;
  handleClearFilter: () => void;
}

const FilterContent: React.FC<IFilterContent> = ({
  fieldsFilter,
  filterList,
  handleAddFilter,
  handleRemoveFilter,
  handleClearFilter,
}: IFilterContent) => {
  const [filterField, setFilterSelected] = useState(fieldsFilter[0]);
  const [filterValue, setFilterValue] = useState('');

  return (
    <Content>
      <FilterInputsContent>
        <select
          value={filterField}
          onChange={({ target }) => {
            setFilterSelected(target.value);
          }}
        >
          {fieldsFilter.map(item => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <input
          type="text"
          value={filterValue}
          onChange={({ target }) => setFilterValue(target.value)}
        />
        <button onClick={() => handleAddFilter(filterField, filterValue)}>
          Aplicar Filtro
        </button>
        <button onClick={handleClearFilter}>Limpar Filtro</button>
      </FilterInputsContent>
      {!!filterList.length && (
        <PainelToListItens>
          {filterList.map(({ field, value }, index) => (
            <ItemWithRemoveButton
              key={field + value}
              handleRemovePcForTransfer={() => handleRemoveFilter(index)}
              value={field + '-' + value}
            />
          ))}
        </PainelToListItens>
      )}
    </Content>
  );
};

export default FilterContent;
