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
    <nav className="bg-[#e8dfd3] px-4 md:px-10 py-4 flex justify-between items-center shadow-sm">
      <h1 className="text-xl md:text-2xl font-bold text-[#5a4634]">
        <Link
        href="/"
        >
          Mi Catálogo
        </Link>
      </h1>

      <div className="flex gap-4 text-sm md:text-base text-[#5a4634]">
        <Link 
        href="/" 
        className="hover:text-[#8f5c30]">
          Inicio
        </Link>

        {isAdmin && (
          <Link href="/admin" className="hover:text-[#8f5c30]">
            Admin
          </Link>
        )}
      </div>
    </nav>
  );
}