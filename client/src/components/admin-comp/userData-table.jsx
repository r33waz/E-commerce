import React, { useState, useEffect } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowUpDown } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  getAllUser,
} from "@/rtk/admin-slice/admin-board/admin-thunk";

function AdminUserTable() {
  const [search, setSearch] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [pageIndex, setPageIndex] = useState(0);
  const [sorting, setSorting] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); // Track selected user for deletion
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Track dialog open state

  const dispatch = useDispatch();
  const { allUser } = useSelector((state) => state.admin);

  // Fetch users with debounced search
  useEffect(() => {
    if (search) {
      const delayDebounceFn = setTimeout(() => {
        dispatch(getAllUser(search));
      }, 1000);
      return () => clearTimeout(delayDebounceFn);
    } else {
      dispatch(getAllUser());
    }
  }, [search, dispatch]);

  // Open delete confirmation dialog
  const handleDelete = (user) => {
    setSelectedUser(user);
    setIsDialogOpen(true);
  };

  const columns = [
    {
      accessorKey: "userName",
      header: ({ column }) => (
        <button
          className="flex gap-0.5 items-center justify-center w-full"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Username
          <ArrowUpDown className="h-3 w-3" />
        </button>
      ),
    },
    {
      accessorKey: "email",
      header: ({ column }) => (
        <button
          className="flex gap-0.5 items-center justify-center w-full"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="h-3 w-3" />
        </button>
      ),
    },
    {
      accessorKey: "isActive",
      header: ({ column }) => (
        <button
          className="flex gap-0.5 items-center justify-center w-full"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Active
          <ArrowUpDown className="h-3 w-3" />
        </button>
      ),
    },
    {
      id: "eidit",
      cell: ({ row }) => (
        <button
          className="text-green-500  font-medium"
          onClick={() => handleDelete(row.original)}
        >
          Eidit
        </button>
      ),
    },
    {
      id: "delete",
      cell: ({ row }) => (
        <button
          className="text-red-500 font-medium"
          onClick={() => handleDelete(row.original)}
        >
          Delete
        </button>
      ),
    },
  ];

  const table = useReactTable({
    data: allUser,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      pagination: {
        pageIndex,
        pageSize: rowsPerPage,
      },
      sorting,
    },
    onPaginationChange: (updater) => {
      const newPagination = updater({
        pageIndex,
        pageSize: rowsPerPage,
      });
      setPageIndex(newPagination.pageIndex);
    },
  });

  const rowsPerPageOptions = [10, 20, 30, 40, 50];
  const pageCount = table.getPageCount();
  const pageNumbers = Array.from({ length: pageCount }, (_, i) => i);

  // Effect to synchronize table's pagination state with the component's state
  useEffect(() => {
    table.setPageSize(rowsPerPage);
    table.setPageIndex(pageIndex);
  }, [rowsPerPage, pageIndex, table]);

  return (
    <div className="rounded-md relative mt-1 p-4">
      <Input
        type="text"
        placeHolder="Search by username or email"
        className="md:max-w-80 w-full"
        onChange={(e) => setSearch(e.target.value)}
      />
      <ScrollArea className="md:h-[78vh] ">
        <Table>
          <TableHeader className="sticky top-0 bg-green text-white dark:bg-inherit">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="text-black dark:text-gray-500 text-sm"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={`${
                    row.index % 2 === 0
                      ? "bg-gray-100 dark:bg-inherit"
                      : "bg-gray-200 dark:bg-inherit"
                  } dark:hover:bg-gray-800`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="text-center">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </ScrollArea>

      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this user?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              user’s account and data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button
              className="bg-black text-white hover:bg-black"
              onClick={() => setIsDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className="bg-red-500 text-white hover:bg-red-500"
              onClick={() => {
                console.log("Deleting user:", selectedUser);
                setIsDialogOpen(false);
                dispatch(deleteUser({ id: selectedUser._id }))
                  .unwrap()
                  .then(() => {
                    dispatch(getAllUser());
                  });
              }}
            >
              Confirm Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="flex items-center justify-end text-xs gap-2 space-x-2 py-4 md:flex-nowrap flex-wrap">
        <div className="flex items-center space-x-2">
          <span>Rows per page:</span>
          <select
            value={rowsPerPage}
            onChange={(e) => setRowsPerPage(Number(e.target.value))}
            className="border p-1 rounded text-black"
          >
            {rowsPerPageOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center space-x-1">
          <button
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M11.25 17.308L5.942 12l5.308-5.308l.708.708L7.364 12l4.594 4.6zm6.1 0L12.042 12l5.308-5.308l.708.708l-4.594 4.6l4.594 4.6z"
              />
            </svg>
          </button>
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              className="rotate-90"
            >
              <path
                fill="currentColor"
                d="M12 14.708L6.692 9.4l.708-.708l4.6 4.6l4.6-4.6l.708.708z"
              />
            </svg>
          </button>
        </div>

        <div>
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>

        {/* Page Number Buttons */}
        <div className="flex items-center space-x-1">
          {pageNumbers.map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => table.setPageIndex(pageNumber)}
              className={`px-2 py-1 border rounded ${
                pageIndex === pageNumber
                  ? "dark:bg-white dark:text-black bg-black text-white"
                  : "dark:bg-black bg-white text-black dark:text-white"
              }`}
            >
              {pageNumber + 1}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-1">
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              className="-rotate-90"
            >
              <path
                fill="currentColor"
                d="M12 14.708L6.692 9.4l.708-.708l4.6 4.6l4.6-4.6l.708.708z"
              />
            </svg>
          </button>
          <button
            onClick={() => table.setPageIndex(pageCount - 1)}
            disabled={!table.getCanNextPage()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="m10.537 12l-4.24-4.246q-.141-.14-.154-.341t.153-.367q.16-.16.354-.16t.354.16l4.388 4.389q.131.13.184.267t.053.298t-.053.298t-.184.268l-4.388 4.388q-.14.14-.341.153t-.367-.153q-.16-.16-.16-.354t.16-.354zm6.1 0l-4.24-4.246q-.141-.14-.154-.341t.153-.367q.16-.16.354-.16t.354.16l4.388 4.389q.131.13.184.267t.053.298t-.053.298t-.184.268l-4.388 4.388q-.14.14-.341.153t-.367-.153q-.16-.16-.16-.354t.16-.354z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminUserTable;
