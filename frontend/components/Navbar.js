'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import React from 'react'

function Navbar() {
    const pathname = usePathname();
  return (
    <div className="navbar">
          <ul>
            <li>
              <Link href={'/'} className={pathname == "/" ? "active" : ""}>Home</Link>
            </li>
            <li>
              <Link href={'/battles'} className={pathname == "/battle/all" ? "active" : ""}>Battle</Link>
            </li>
            <li>
              <Link href={'/ranking'} className={pathname == "/ranking" ? "active" : ""}>Ranking</Link>
            </li>
            <li>
              <Link href={'/about'} className={pathname == "/about" ? "active" : ""}>About</Link>
            </li>
          </ul>
        </div>
  )
}

export default Navbar