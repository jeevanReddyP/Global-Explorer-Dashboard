import React from "react";
export default function Loading({ text = "Loading..." }) {
  return <div className="p-4 text-sm text-gray-500">{text}</div>;
}
