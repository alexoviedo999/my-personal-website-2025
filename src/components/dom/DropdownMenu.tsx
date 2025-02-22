'use client'

import Link from 'next/link'
import { useRef, useState } from 'react'

export default function DropdownMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  const handleLinkClick = () => {
    console.log('Link clicked')
    setIsOpen(false)
  }
  return (
    <div className='dropdown' ref={dropdownRef}>
      <label tabIndex={0} className='btn btn-circle btn-ghost' onClick={() => setIsOpen(!isOpen)}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='size-5'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h16M4 18h7' />
        </svg>
      </label>
      <ul
        tabIndex={0}
        className={`menu dropdown-content menu-sm mt-3 w-52 rounded-box bg-base-100/75 p-2 shadow text-gray-50 ${
          !isOpen ? 'hidden' : ''
        }`}
      >
        <li>
          <Link className='text-color-link' href='/' onClick={handleLinkClick}>
            Home
          </Link>
        </li>
        <li>
          <Link className='text-color-link' href='/skills'>
            Skills
          </Link>
        </li>
        <li>
          <Link className='text-color-link' href='/animations' onClick={handleLinkClick}>
            Animations
          </Link>
        </li>
        <li>
          <Link className='text-color-link' href='/chatbot' onClick={handleLinkClick}>
            Jerky Boy Bot
          </Link>
        </li>
        <li>
          <Link className='text-color-link' href='/about' onClick={handleLinkClick}>
            About
          </Link>
        </li>
        <li>
          <Link className='text-color-link' href='/contact' onClick={handleLinkClick}>
            Contact Me
          </Link>
        </li>
      </ul>
    </div>
  )
}
