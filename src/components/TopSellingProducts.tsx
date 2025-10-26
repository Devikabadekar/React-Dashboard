import React from "react";
import { useTheme } from "./ThemeContext"; 

interface Product {
  name: string;
  price: string;
  quantity: number;
  amount: string;
}

const products: Product[] = [
  { name: "ASOS Ridley High Waist", price: "$79.49", quantity: 82, amount: "$6,518.18" },
  { name: "Marco Lightweight Shirt", price: "$128.50", quantity: 37, amount: "$4,754.50" },
  { name: "Half Sleeve Shirt", price: "$39.99", quantity: 64, amount: "$2,559.36" },
  { name: "Lightweight Jacket", price: "$20.00", quantity: 184, amount: "$3,680.00" },
  { name: "Marco Shoes", price: "$79.49", quantity: 64, amount: "$1,965.81" },
];

export function TopSellingProducts() {
  const { theme } = useTheme();
  const isLight = theme === "light";

  return (
    <div
      className={`rounded-2xl p-6 w-full max-w-3xl transition-colors duration-300 border ${
        isLight
          ? "bg-white text-black border-gray-200"
          : "bg-[#1f1f1f] text-gray-200 border-[#2b2b2b]"
      }`}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3
          className={`text-xl font-semibold ${
            isLight ? "text-black" : "text-white"
          }`}
        >
          Top Selling Products
        </h3>
        <button
          className={`text-sm transition-colors ${
            isLight
              ? "text-gray-600 hover:text-black"
              : "text-gray-400 hover:text-white"
          }`}
        >
          View All
        </button>
      </div>

      {/* Table Header */}
      <div
        className={`grid grid-cols-4 text-sm pb-3 mb-3 border-b transition-colors ${
          isLight
            ? "text-gray-500 border-gray-200"
            : "text-gray-400 border-[#2b2b2b]"
        }`}
      >
        <span>Product Name</span>
        <span className="text-center">Price</span>
        <span className="text-center">Quantity</span>
        <span className="text-right">Amount</span>
      </div>

      {/* Product Rows */}
      <div className="space-y-3">
        {products.map((product, index) => (
          <div
            key={index}
            className={`grid grid-cols-4 items-center py-2 px-2 rounded-lg transition-all duration-200 ${
              isLight
                ? "hover:bg-gray-100"
                : "hover:bg-[#2b2b2b]"
            }`}
          >
            <span
              className={`font-medium ${
                isLight ? "text-black" : "text-white"
              }`}
            >
              {product.name}
            </span>
            <span
              className={`text-center ${
                isLight ? "text-gray-700" : "text-gray-300"
              }`}
            >
              {product.price}
            </span>
            <span
              className={`text-center ${
                isLight ? "text-gray-700" : "text-gray-300"
              }`}
            >
              {product.quantity}
            </span>
            <span
              className={`text-right font-semibold ${
                isLight ? "text-black" : "text-white"
              }`}
            >
              {product.amount}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
