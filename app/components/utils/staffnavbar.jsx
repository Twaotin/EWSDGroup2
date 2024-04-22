'use client'
import Link from 'next/link'

function Navbarstaff() {
  return (
    <nav className="navbar">
            <div className="navContainer">
              <Link href="/staff" className="navItem">Home</Link>
              <Link href="/staff/createidea" className="navItem">Create idea</Link>
              <Link href="/staff/staffpopularideas" className="navItem">Popular ideas</Link>
              <Link href="/staff/stafflatestideas" className="navItem">Latest ideas</Link>
              <Link href="/staff/staffmostviewedideas" className="navItem">Most Viewed Ideas</Link>
              <Link href="/staff/changepassword" className="navItem">Change password</Link>
              <Link href="/api/auth/signout?callbackUrl=/" className="navItem">Logout</Link>
            </div>
        </nav>
  );
}

export default Navbarstaff;