import { useTable } from "react-table";
import BotaoEditar from "./BotaoEditar";
import BotaoRemover from "./BotaoRemover";

export default function Table({ columns, data, onClickRemover, onClickEditar }) {

    // Table component logic and UI come here
    // Use the useTable Hook to send the columns and data to build the table
  const {
    getTableProps, // table props from react-table
    getTableBodyProps, // table body props from react-table
    headerGroups, // headerGroups, if your table has groupings
    rows, // rows for the table based on the data passed
    prepareRow // Prepare the row (this function needs to be called for each row before getting the row props)
  } = useTable({
    columns,
    data
  });

  /* 
    Render the UI for your table
    - react-table doesn't have UI, it's headless. We just need to put the react-table props from the Hooks, and it will do its magic automatically
  */
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg m-2 ...">
      

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
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr key={3} {...row.getRowProps()}>
                {row.cells.map(cell => {

                  if(cell.column.id === "editar-remover") {
                    return <td key={1} className="border px-8 py-4 text-center grid-cols-2"><BotaoEditar className="inline-block" onClickEditar={onClickEditar} idItem={cell.row.values.id}/> <BotaoRemover className="inline-block" onClickRemover={onClickRemover} idItem={cell.row.values.id}/></td>
                  }

                  return <td className="border px-8 py-4" key={3} {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <nav className="flex items-center justify-between pt-4" aria-label="Table navigation">
          <span className="text-sm font-normal text-gray-500 dark:text-black m-8 ...">Mostrando <span className="font-semibold text-gray-900 dark:text-black">1-10</span> of <span className="font-semibold text-gray-900 dark:text-black">1000</span></span>
          <ul className="inline-flex items-center -space-x-px m-8 ...">
              <li>
                  <a href="#" className="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-300 dark:border-gray-700 dark:text-black dark:hover:bg-gray-400 dark:hover:text-white">
                      <span className="sr-only">Previous</span>
                      <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                  </a>
              </li>
              <li>
                  <a href="#" className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-300 dark:border-gray-700 dark:text-black dark:hover:bg-gray-400 dark:hover:text-white">
                      1
                  </a>
              </li>
              <li>
                  <a href="#" className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-300 dark:border-gray-700 dark:text-black dark:hover:bg-gray-400 dark:hover:text-white">
                      2
                  </a>
              </li>
              <li>
                  <a href="#" aria-current="page" className="z-10 px-3 py-2 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-500 dark:text-white">
                      3
                  </a>
              </li>
              <li>
                  <a href="#" className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-300 dark:border-gray-700 dark:text-black dark:hover:bg-gray-400 dark:hover:text-white">
                      ...
                  </a>
              </li>
              <li>
                  <a href="#" className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-300 dark:border-gray-700 dark:text-black dark:hover:bg-gray-400 dark:hover:text-white">
                      100
                  </a>
              </li>
              <li>
                  <a href="#" className="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-300 dark:border-gray-700 dark:text-black dark:hover:bg-gray-400 dark:hover:text-white">
                      <span className="sr-only">Next</span>
                      <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                  </a>
              </li>
          </ul>
      </nav>
    </div>
  );
 }