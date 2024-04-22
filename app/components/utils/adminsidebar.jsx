'use client'
import { useState } from 'react';
import Link from 'next/link';

const Sidebar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="sidebar">
      
      <button className="toggle-button" onClick={toggleMenu}>
        ☰
      </button>

      <ul className={`sidebar-nav ${isMenuOpen ? 'open' : ''}`}>
        <li>
          <Link href="/admin" className="sidebar-link">
            Home
          </Link>
        </li>
        <li>
          <Link href="/admin/latestideas" className="sidebar-link">
            Staff Latest ideas
          </Link>
        </li>
        <li>
          <Link href="/admin/popularideas" className="sidebar-link">
            Staff Popular ideas 
          </Link>
        </li>
        <li>
          <Link href="/admin/mostviewedideas" className="sidebar-link">
             Staff Most Viewed ideas 
          </Link>
        </li>
        <li>
          <Link href="/admin/createuser" className="sidebar-link">
            Create User
          </Link>
        </li>
          <li>
          <Link href="/admin/reports" className="sidebar-link">
             Staff idea Report
          </Link>
        </li>
        <li>
          <Link href="/admin/statisticalanalysis/Exceptionreports" className="sidebar-link">
             Exception Reports Charts
          </Link>
        </li>
        <li>
          <Link href="/admin/statisticalanalysis/Statistics" className="sidebar-link">
             Statistics Reports Charts
          </Link>
        </li>
        <li>
          <Link href="/api/auth/signout?callbackUrl=/" className="sidebar-link">Logout</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;