import React, {
  useState,
  useCallback,
  useEffect,
  TableHTMLAttributes,
} from 'react';

import formatValue from '../../../../utils/formatValue';
import FilterContent from './FilterContent';
import { Container, TableContainer, TableContent } from './styles';

export interface ITableLines {
  key: any;
  itens: Array<{
    key: any;
    isCurrency: boolean;
    value: any;
  }>;
}

export interface ITable extends TableHTMLAttributes<HTMLTableElement> {
  header: string[];
  lines: ITableLines[];
  fieldsFilter?: string[];
}

const Table: React.FC<ITable> = (
  { header, lines, fieldsFilter }: ITable,
  ...rest
) => {
  const [linesFiltered, setLinesFiltered] = useState(lines);
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
      const linesFiltersInField: ITableLines[] = [];

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

  const handleAddFilter = useCallback((field: string, value: string) => {
    setFilterList(current => {
      const newFilters = [...current];
      const exists =
        newFilters.findIndex(
          filter => filter.field === field && filter.value === value,
        ) >= 0;
      if (exists) {
        return newFilters;
      }
      newFilters.push({ field, value });
      return newFilters;
    });
  }, []);

  const handleRemoveFilter = useCallback(index => {
    setFilterList(current => {
      const newFilters = [...current];

      newFilters.splice(index, 1);

      return newFilters;
    });
  }, []);

  const handleClearFilter = useCallback(() => {
    setFilterList([]);
  }, []);

  return (
    <Container {...rest}>
      {fieldsFilter && !!fieldsFilter.length && (
        <FilterContent
          handleAddFilter={handleAddFilter}
          handleClearFilter={handleClearFilter}
          handleRemoveFilter={handleRemoveFilter}
          fieldsFilter={fieldsFilter}
          filterList={filterList}
        />
      )}
      <TableContainer>
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
      </TableContainer>
    </Container>
  );
};

export default Table;
