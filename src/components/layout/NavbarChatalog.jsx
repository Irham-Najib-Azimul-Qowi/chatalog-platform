import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

// Navbar untuk web utama Chatalog
function NavbarChatalog() {
  const { currentUser } = useAuth(); // Cek apakah ada yg login

  const activeClass = "text-white font-bold";
  const inactiveClass = "text-gray-300 hover:text-white";

  return (
    // Menggunakan warna Primer Chatalog
    <header className="bg-[#006064] text-white shadow-md sticky top-0 z-40">
      <nav className="container mx-auto flex justify-between items-center p-4 px-6">
        {/* Kiri: Logo */}
        <Link to="/" className="text-2xl font-bold">
          Chatalog
        </Link>

        {/* Tengah: Menu Navigasi */}
        <div className="hidden md:flex space-x-6">
          <NavLink 
            to="/" 
            className={({ isActive }) => isActive ? activeClass : inactiveClass}
          >
            Home
          </NavLink>
          <NavLink 
            to="/tentang" 
            className={({ isActive }) => isActive ? activeClass : inactiveClass}
          >
            Tentang Kami
          </NavLink>
          <NavLink 
            to="/simulator" 
            className={({ isActive }) => isActive ? activeClass : inactiveClass}
          >
            Simulator
          </NavLink>
          <NavLink 
            to="/kontak" 
            className={({ isActive }) => isActive ? activeClass : inactiveClass}
          >
            Kontak
          </NavLink>
        </div>

        {/* Kanan: Tombol Aksi */}
        <div>
          {!currentUser ? (
            <Link 
              to="/login" 
              // Menggunakan warna Secondary Chatalog
              className="bg-[#FFAB40] text-black font-bold py-2 px-4 rounded-md hover:bg-orange-400 transition-colors"
            >
              Login
            </Link>
          ) : (
            <span className="text-sm">Selamat Datang!</span>
          )}
        </div>
      </nav>
    </header>
  );
}

export default NavbarChatalog;