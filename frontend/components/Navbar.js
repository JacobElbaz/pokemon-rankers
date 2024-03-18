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
              <Link href={'/battle'} className={pathname == "/battle" ? "active" : ""}>Battle</Link>
            </li>
            <li>
              <Link href={'/top-pokemon'} className={pathname == "/top-pokemon" ? "active" : ""}>Top Pokemon</Link>
            </li>
            <li>
              <Link href={'/about'} className={pathname == "/about" ? "active" : ""}>About</Link>
            </li>
          </ul>
        </div>
  )
}

export default Navbar