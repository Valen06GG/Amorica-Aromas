"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setIsAdmin(true);
  }, []);

  return (
    <nav className="bg-[#e8dfd3] px-4 md:px-12 py-1 flex items-center justify-between shadow-md">

      <Link href="/" className="flex items-center gap-3">
        <img 
          src="/Logo-Aromas.png" 
          alt="Amórica Aromas"
          className="w-12 h-12 md:w-20 bg-black md:h-20 object-cover rounded-full"
        />
      </Link>

      <div className="flex items-center gap-6 text-sm md:text-base font-medium text-[#5a4634]">

        <Link 
          href="/" 
          className="relative group"
        >
          Inicio
          <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#8f5c30] transition-all group-hover:w-full"></span>
        </Link>

        {isAdmin && (
          <Link 
            href="/admin" 
            className="relative group"
          >
            Admin
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#8f5c30] transition-all group-hover:w-full"></span>
          </Link>
        )}

      </div>
    </nav>
  );
}