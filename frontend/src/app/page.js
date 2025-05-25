import Image from "next/image";
import React from 'react';
import Link from 'next/link';


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
        <h1 className="text-2xl font-semibold tracking-tight">PennyPilot</h1>
        <div className="space-x-4">
          <Link href="/login" className="px-4 py-2 text-blue-600 hover:underline">
        Login
      </Link>
      <Link href="/signup" className="px-4 py-2 text-green-600 hover:underline ml-4">
        Sign Up
      </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 text-center">
        <h2 className="text-4xl font-bold mb-4">Track Your Expenses with Ease</h2>
        <p className="text-lg text-gray-600 mb-8 max-w-xl">
          Simplify your financial life. Stay on top of your spending, plan better, and gain financial clarity.
        </p>
        <button className="px-6 py-3 text-white bg-blue-600 rounded-md text-lg hover:bg-blue-700">
          Get Started
        </button>
      </main>

      {/* Footer */}
      <footer className="px-6 py-4 bg-white text-sm text-gray-500 text-center border-t">
        © {new Date().getFullYear()} PennyPilot. All rights reserved.
      </footer>
    </div>
  );
}
