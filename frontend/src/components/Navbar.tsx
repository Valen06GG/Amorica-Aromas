"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsAdmin(true);
    }
  }, []);

  return (
    <nav className="bg-white border-b shadow-sm px-10 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-indigo-600">
        <Link
        href="/"
        >
          Mi Catálogo
        </Link>
      </h1>

      <div className="flex gap-6">
        <Link 
        href="/" 
        className="text-black hover:text-indigo-600">
          Inicio
        </Link>

        {isAdmin && (
          <Link href="/admin" className="text-black hover:text-indigo-600">
            Admin
          </Link>
        )}
      </div>
    </nav>
  );
}