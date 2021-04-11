import React, { useState, useMemo, useCallback, useEffect } from 'react';
import ItemWithRemoveButton from '../../../../components/ItemWithRemoveButton';
import PainelToListItens from '../../../../components/PainelToListItens';

import formatValue from '../../../../utils/formatValue';
import { Content, FilterContent, TableContent } from './styles';

export interface ITableLines {
  key: any;
  itens: Array<{
    key: any;
    isCurrency: boolean;
    value: any;
  }>;
}

export interface ITable {
  header: string[];
  lines: ITableLines[];
  fieldsFilter?: string[];
}

const Table: React.FC<ITable> = ({ header, lines, fieldsFilter }: ITable) => {
  const [linesFiltered, setLinesFiltered] = useState(lines);
  const [filterField, setFilterSelected] = useState(
    fieldsFilter && fieldsFilter[0] ? fieldsFilter[0] : '',
  );
  const [filterValue, setFilterValue] = useState('');
  const [filterList, setFilterList] = useState<
    Array<{ field: string; value: string }>
  >([]);

  useEffect(() => {
    if (!filterList.length) {
      setLinesFiltered(lines);
      return;
    }
    if (!fieldsFilter) {
      return;
    }
    let newLinesFiltered: ITableLines[] = [...lines];

    fieldsFilter.forEach(fieldFilter => {
      let linesFiltersInField: ITableLines[] = [];

      const filtersToApply = filterList.filter(
        filter => filter.field === fieldFilter,
      );

      filtersToApply.forEach(({ field, value }) => {
        linesFiltersInField.push(
          ...newLinesFiltered.filter(
            ({ itens }) =>
              itens.filter(({ key }) => key === field)[0].value === value,
          ),
        );
      });

      if (filtersToApply.length) {
        newLinesFiltered = [...linesFiltersInField];
      }
    });
    setLinesFiltered(newLinesFiltered);
  }, [lines, header, filterList]);

  const handleAddFilter = useCallback(() => {
    setFilterList(current => {
      const newFilters = [...current];
      const exists =
        newFilters.findIndex(
          filter =>
            filter.field === filterField && filter.value === filterValue,
        ) >= 0;
      if (exists) {
        return newFilters;
      }
      newFilters.push({ field: filterField, value: filterValue });
      return newFilters;
    });
  }, [filterField, filterValue]);

  const handleRemoveFilter = useCallback(index => {
    setFilterList(current => {
      const newFilters = [...current];

      newFilters.splice(index, 1);

      return newFilters;
    });
  }, []);

  return (
    <Content>
      {fieldsFilter && !!fieldsFilter.length && (
        <>
          <FilterContent>
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
            <button onClick={handleAddFilter}>Aplicar Filtro</button>
            <button onClick={() => setFilterList([])}>Limpar Filtro</button>
          </FilterContent>
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
        </>
      )}

      <TableContent>
        <thead>
          <tr>
            {header.map(cell => (
              <th key={cell}>{cell}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {linesFiltered.map(line => (
            <tr key={line.key}>
              {line.itens.map(cell => (
                <td key={cell.key}>
                  {cell.isCurrency && formatValue(cell.value)}
                  {!cell.isCurrency && cell.value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </TableContent>
    </Content>
  );
};

export default Table;
