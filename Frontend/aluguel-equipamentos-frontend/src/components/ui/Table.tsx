import React from 'react';


export interface Column<T> {
  header: string;
  accessor: keyof T | ((item: T) => React.ReactNode);
  align?: 'left' | 'center' | 'right';
  width?: string;
  show?: boolean;
  actionTemplate?: any
}

export interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  keyAccessor: keyof T | ((item: T) => string | number);
  emptyMessage?: string;
  striped?: boolean;
  hoverEffect?: boolean;
  className?: string;
  headerClassName?: string;
  rowClassName?: string;
  cellClassName?: string;  
}

const Table = <T,>({
  data,
  columns,
  keyAccessor,
  emptyMessage = 'Nenhum dado encontrado',
  striped = true,
  hoverEffect = true,
  className = '',
  headerClassName = '',
  rowClassName = '',
  cellClassName = ''
}: TableProps<T>) => {

  const getKey = (item: T): string | number => {
    return typeof keyAccessor === 'function' 
      ? keyAccessor(item) 
      : item[keyAccessor] as string | number;
  };

  return (
    <div className="overflow-x-auto">
      <table className={`min-w-full divide-y divide-gray-300 ${className}`}>
        <thead className={`bg-gray-50 ${headerClassName}`}>
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                scope="col"
                className={`py-3.5 pl-4 pr-3  text-sm font-semibold text-gray-900 sm:pl-6 text-${column.align || 'left'}`}
                style={{ width: column.width }}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((item) => (
              <tr
                key={getKey(item)}
                className={`${striped ? 'odd:bg-white even:bg-gray-50' : ''} ${
                  hoverEffect ? 'hover:bg-gray-100' : ''
                } ${rowClassName}`}
              >
                {columns.map((column, colIndex) => (
                  <td
                    key={colIndex}
                    className={`px-6 py-4 whitespace-nowrap text-${column.align || 'left'} text-sm text-gray-900 ${cellClassName}`}
                  >
                    {column.accessor && typeof column.accessor === 'function'
                      ? column.accessor(item)
                      : (item[column.accessor] as React.ReactNode)
                    } 
                    {
                      column.actionTemplate
                    }                 
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;