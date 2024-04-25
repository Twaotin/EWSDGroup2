'use client'
import { useState } from 'react';
import Link from 'next/link';

function Navbarstaff() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="staffnavbar">
      <div className="staffhamburger" onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className={`staffnavContainer ${isMenuOpen ? 'open' : ''}`}> 
        <Link href="/staff" className="staffnavItem">Home</Link>
        <Link href="/staff/createidea" className="staffnavItem">Create Idea</Link>
        <Link href="/staff/staffpopularideas" className="staffnavItem">Popular Ideas</Link>
        <Link href="/staff/stafflatestideas" className="staffnavItem">Latest Ideas</Link>
        <Link href="/staff/staffmostviewedideas" className="staffnavItem">Most Viewed Ideas</Link>
        <Link href="/staff/changepassword" className="staffnavItem">Change Password</Link>
        <Link href="/api/auth/signout?callbackUrl=/" className="staffnavItem">Logout</Link>
      </div>
    </nav>
  );
}

export default Navbarstaff;
