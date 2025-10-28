import React from "react";

export default function Pagination({ page, totalPages, setPage }) {
  if (totalPages <= 1) return null;
  const prev = () => setPage(Math.max(1, page - 1));
  const next = () => setPage(Math.min(totalPages, page + 1));
  return (
    <div className="flex items-center gap-2 mt-3">
      <button
        onClick={prev}
        className="px-3 py-1 bg-gray-100 text-black rounded cursor-pointer   "
      >
        Prev
      </button>
      <div className="text-sm">
        Page {page} / {totalPages}
      </div>
      <button
        onClick={next}
        className="px-3 py-1 bg-gray-100 text-black rounded cursor-pointer "
      >
        Next
      </button>
    </div>
  );
}
