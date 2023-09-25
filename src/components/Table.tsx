import { useState } from "react";

// state
import { useAtom } from "jotai";
import { currentPageAtom, totalPagesAtom } from "../store";
import { cn } from "../utils/cn";
import TableData from "./TableData";

function Table() {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [currentPage, setCurrentPages] = useAtom(currentPageAtom);
  const [totalPages] = useAtom(totalPagesAtom);

  return (
    <>
      <div className="overflow-x-auto rounded-3xl bg-white px-9 py-12">
        <div className="flex">
          <span className="flex-1 pl-4 text-emerald-400">Active Member</span>
          <div>
            <input
              type="text"
              placeholder="searchbar"
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input bg-gray-100 "
            />
          </div>
          {/* sort */}
          <div className="dropdown-end dropdown">
            <button tabIndex={0} className="btn m-1">
              <span className="text-gray-500"> Short by </span> newest
            </button>
            <ul
              tabIndex={0}
              className="menu dropdown-content rounded-box z-[1] w-52 bg-base-100 p-2 shadow"
            >
              <li>
                <a>Item 1</a>
              </li>
              <li>
                <a>Item 2</a>
              </li>
            </ul>
          </div>
        </div>
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Company</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th>Country</th>
              <th>Status</th>
            </tr>
          </thead>
          {/* body */}
          <tbody className="">
            <TableData searchText={searchTerm} />
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex  w-full justify-end gap-3">
          <button
            onClick={() =>
              setCurrentPages((state) => {
                if (state === 1) return 1;
                return state - 1;
              })
            }
            className={cn("btn h-fit min-h-0 py-3 ", {
              "btn-disabled": currentPage === 1,
            })}
          >
            {"<"}
          </button>
          <button
            onClick={() => setCurrentPages(currentPage)}
            className="btn h-fit min-h-0 bg-purple-700 py-3  text-white"
          >
            {currentPage}
          </button>

          {Array.from({ length: 4 }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPages(currentPage + i + 1)}
              className=" btn h-fit min-h-0 py-3  text-gray-600"
            >
              {currentPage + i + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPages((state) => state + 1)}
            className={cn("btn btn h-fit min-h-0 py-3", {
              "btn-disabled": currentPage === totalPages,
            })}
          >
            {">"}
          </button>
        </div>
      </div>
    </>
  );
}

export default Table;
