import { useTable } from "react-table";
import BotaoEditar from "./BotaoEditar";
import BotaoRemover from "./BotaoRemover";
import ReactPaginate from 'react-paginate';
import React, { useState } from "react";

export default function Table({ columns, data, onClickRemover, onClickEditar }) {

  const [currentPage, setCurrentPage] = useState(0);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({
    columns,
    data
  });

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const itemsPerPage = 7;
  const pageCount = Math.ceil(data.length / itemsPerPage);

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const slicedData = rows.slice(startIndex, endIndex);

  return (
    <div className="border-light relative overflow-x-auto shadow-md sm:rounded-lg m-2 ...">
      <table {...getTableProps()} className="w-full text-sm text-left text-gray-500 dark:text-black">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-200 dark:text-black">
          {headerGroups.map(headerGroup => (
            <tr key={1} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th key={2} scope="col" className="px-6 py-3" {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {slicedData.map((row, i) => {
            prepareRow(row);
            return (
              <tr key={3} {...row.getRowProps()}>
                {row.cells.map(cell => {

                  if (cell.column.id === "editar-remover") {
                    return <td key={1} className="border px-8 py-4 text-center grid-cols-2"><BotaoEditar onClickEditar={onClickEditar} idItem={cell.row.values.id} /> <BotaoRemover onClickRemover={onClickRemover} idItem={cell.row.values.id} /></td>
                  }

                  return <td className="border px-8 py-4" key={3} {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <nav className="flex items-center justify-between pt-4 mb-8" aria-label="Table navigation">
        <ReactPaginate
          previousLabel={'Anterior'}
          nextLabel={'Próxima'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
        />
      </nav>
    </div>
  );
}