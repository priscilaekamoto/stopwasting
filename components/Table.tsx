import { useTable } from "react-table";

export default function Table({ columns, data }) {

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
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg m-2 ...">
      <label for="table-search" class="sr-only">Search</label>
      <div class="relative m-2 ...">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg class="w-5 h-5 text-gray-500 dark:text-black" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd">
                  </path>
              </svg>
          </div>
          <input type="text" id="table-search" class="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Busca"/>
      </div>

      <table {...getTableProps()} class="w-full text-sm text-left text-gray-500 dark:text-black">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-200 dark:text-black">
          {headerGroups.map(headerGroup => (
            <tr key={1} {...headerGroup.getHeaderGroupProps()}>

              {headerGroup.headers.map(column => (
                <th key={2} scope="col" class="px-6 py-3" {...column.getHeaderProps()}>{column.render("Header")}</th>
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
                  return <td class="border px-8 py-4" key={3} {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <nav class="flex items-center justify-between pt-4" aria-label="Table navigation">
          <span class="text-sm font-normal text-gray-500 dark:text-black m-8 ...">Mostrando <span class="font-semibold text-gray-900 dark:text-black">1-10</span> of <span class="font-semibold text-gray-900 dark:text-black">1000</span></span>
          <ul class="inline-flex items-center -space-x-px m-8 ...">
              <li>
                  <a href="#" class="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-300 dark:border-gray-700 dark:text-black dark:hover:bg-gray-400 dark:hover:text-white">
                      <span class="sr-only">Previous</span>
                      <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                  </a>
              </li>
              <li>
                  <a href="#" class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-300 dark:border-gray-700 dark:text-black dark:hover:bg-gray-400 dark:hover:text-white">
                      1
                  </a>
              </li>
              <li>
                  <a href="#" class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-300 dark:border-gray-700 dark:text-black dark:hover:bg-gray-400 dark:hover:text-white">
                      2
                  </a>
              </li>
              <li>
                  <a href="#" aria-current="page" class="z-10 px-3 py-2 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-500 dark:text-white">
                      3
                  </a>
              </li>
              <li>
                  <a href="#" class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-300 dark:border-gray-700 dark:text-black dark:hover:bg-gray-400 dark:hover:text-white">
                      ...
                  </a>
              </li>
              <li>
                  <a href="#" class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-300 dark:border-gray-700 dark:text-black dark:hover:bg-gray-400 dark:hover:text-white">
                      100
                  </a>
              </li>
              <li>
                  <a href="#" class="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-300 dark:border-gray-700 dark:text-black dark:hover:bg-gray-400 dark:hover:text-white">
                      <span class="sr-only">Next</span>
                      <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                  </a>
              </li>
          </ul>
      </nav>
    </div>
  );
 }