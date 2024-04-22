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
      {/* Toggle button for smaller screens */}
      <button className="toggle-button" onClick={toggleMenu}>
        ☰
      </button>

      {/* Sidebar navigation */}
      <ul className={`sidebar-nav ${isMenuOpen ? 'open' : ''}`}>
        <li>
          <Link href="/admin" className="sidebar-link">Home</Link>
        </li>
        <li>
          <Link href="/admin/latestideas" className="sidebar-link">Latest Ideas</Link>
        </li>
        <li>
          <Link href="/admin/popularideas" className="sidebar-link">Popular Ideas</Link>
        </li>
        <li>
          <Link href="/admin/mostviewedideas" className="sidebar-link">Most Viewed Ideas</Link>
        </li>
        <li>
          <Link href="/admin/reports" className="sidebar-link">Idea Report</Link>
        </li>
        <li>
          <Link href="/api/auth/signout?callbackUrl=/" className="sidebar-link">Logout</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;