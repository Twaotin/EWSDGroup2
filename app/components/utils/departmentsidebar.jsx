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
          <Link href="/departmentcoordinator" className="sidebar-link">
            Home
          </Link>
        </li>
        <li>
          <Link href="/departmentcoordinator/latestideas" className="sidebar-link">
            Staff Latest ideas 
          </Link>
        </li>
        <li>
          <Link href="/departmentcoordinator/mostviewedideas" className="sidebar-link">
             Staff Most Viewed ideas 
          </Link>
        </li>
        <li>
          <Link href="/departmentcoordinator/popularideas" className="sidebar-link">
           Staff Popular ideas 
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