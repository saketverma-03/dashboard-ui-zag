import { useMemo, useState } from "react";
import { Data } from "../sampleData";

import fuse from "fuse.js";
import { cn } from "../utils/cn.js";

// state
import { useAtom } from "jotai";
import { currentPageAtom, totalPagesAtom } from "../store";

const fuseOptions = {
  tokenize: false,
  keys: ["customer_name", "phone_number"],
};

type TbaleData = {
  id: number;
  customer_name: string;
  company: string;
  phone_number: string;
  email: string;
  countary: string;
  status: boolean;
  date_of_creation: string;
};

function TableData({ searchText }: { searchText: string }) {
  const fusfn = new fuse<TbaleData>(Data, fuseOptions);

  const [tableData] = useState<TbaleData[]>(Data);
  const [currentPage] = useAtom(currentPageAtom);
  const [, setTotalPages] = useAtom(totalPagesAtom);

  // making cached searches
  const searchResults = useMemo(() => fusfn.search(searchText), [searchText]);

  function paginateArray(
    array: TbaleData[] | fuse.FuseResult<TbaleData>[],
    pageNumber: number,
    pageSize: number,
  ) {
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    setTotalPages(Math.ceil(array.length / pageSize));
    return array.slice(startIndex, endIndex);
  }

  return (
    <>
      {searchText === ""
        ? paginateArray(tableData, currentPage, 20).map((item: any) => (
            <>
              <tr key={item.email}>
                <td>{item.customer_name}</td>
                <td>{item.company}</td>
                <td>{item.phone_number}</td>
                <td>{item.email}</td>
                <td>{item.countary}</td>
                <td>
                  <span
                    className={cn(
                      "block w-full rounded-md border-2 p-2 text-center",
                      {
                        "border-green-600 bg-green-200 text-green-600":
                          item.status,
                        "border-red-600 bg-red-200 text-red-600": !item.status,
                      },
                    )}
                  >
                    {item.status ? "active" : "inactive"}
                  </span>
                </td>
              </tr>
            </>
          ))
        : paginateArray(searchResults, currentPage, 10).map((item: any) => (
            <>
              <tr>
                <td>{item.item.customer_name}</td>
                <td>{item.item.company}</td>
                <td>{item.item.phone_number}</td>
                <td>{item.item.email}</td>
                <td>{item.item.countary}</td>
                <td>
                  <span
                    className={cn(
                      "block w-full rounded-md border-2 p-2 text-center",
                      {
                        "border-green-600 bg-green-200 text-green-600":
                          item.item.status,
                        "border-red-600 bg-red-200 text-red-600":
                          !item.item.status,
                      },
                    )}
                  >
                    {item.item.status ? "active" : "inactive"}
                  </span>
                </td>
              </tr>
            </>
          ))}
    </>
  );
}

export default TableData;
