import React from 'react';
import { Outlet } from 'react-router-dom';
import NavbarChatalog from './NavbarChatalog';
import FooterChatalog from './FooterChatalog';

// Komponen ini bertindak sebagai "pembungkus" untuk semua
// halaman publik di platform Chatalog.
function ChatalogLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavbarChatalog />

      {/* <Outlet /> adalah placeholder dari React Router 
          Di sinilah halaman (Homepage, About, Contact) akan dirender */}
      <main className="flex-grow">
        <Outlet />
      </main>

      <FooterChatalog />
    </div>
  );
}

export default ChatalogLayout;