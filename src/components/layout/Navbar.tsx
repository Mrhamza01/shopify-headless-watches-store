'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CartIcon } from '../cart/CartIcon'
import { AccountIcon } from '../account/AccountIcon'
import { useEffect, useState } from 'react'
import { getCustomer } from '@/lib/shopify'
import { CartDrawer } from '../cart/CartDrawer'

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Shop', href: '/shop' },
  { name: 'Categories', href: '/categories' },
]

export const Navbar = () => {
  const pathname = usePathname()
  const [customerName, setCustomerName] = useState<string | null>(null)

  useEffect(() => {
    const fetchCustomerData = async () => {
      const accessToken = localStorage.getItem('customerAccessToken')
      if (accessToken) {
        try {
          const customer = await getCustomer(accessToken)
          if (customer) {
            setCustomerName(customer.firstName)
          }
        } catch (error) {
          console.error('Error fetching customer data:', error)
        }
      }
    }

    fetchCustomerData()
  }, [])

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/">
                <span className="text-2xl font-bold text-gray-800">Luxury Timepieces</span>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`${
                    pathname === item.href
                      ? 'border-indigo-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <CartIcon />
            <CartDrawer/>
            {customerName ? (
              <span className="ml-4 text-sm font-medium text-gray-700">Welcome, {customerName}</span>
            ) : (
              <AccountIcon />
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}