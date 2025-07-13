import React from 'react';

interface TableColumn {
  header: string;
  accessor: string;
}

interface TableDataRow {
  [key: string]: any;
}

interface TabelaFiltrosProps {
  data: TableDataRow[];
  columns: TableColumn[];
}

export default function TabelaFiltros({ data, columns }: TabelaFiltrosProps) {
  return (
    <div className="p-4">
      <table className="w-full table-auto border border-collapse">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((col, idx) => (
              <th key={idx} className="border px-4 py-2 text-left">{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map((row, rowIdx) => (
              <tr key={rowIdx} className="hover:bg-gray-50">
                {columns.map((col, colIdx) => (
                  <td key={colIdx} className="border px-4 py-2">
                    {row[col.accessor]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="border px-4 py-2 text-center text-gray-700">
                Nenhum dado encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
