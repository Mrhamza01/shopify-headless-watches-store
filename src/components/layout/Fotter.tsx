import Link from 'next/link'

export const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <Link href="/">
              <span className="text-2xl font-bold">Luxury Timepieces</span>
            </Link>
            <p className="text-gray-400 text-base">
              Elegant and premium watches for the discerning individual.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Shop</h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link href="/categories/men" className="text-base text-gray-400 hover:text-white">
                      Men's Watches
                    </Link>
                  </li>
                  <li>
                    <Link href="/categories/women" className="text-base text-gray-400 hover:text-white">
                      Women's Watches
                    </Link>
                  </li>
                  <li>
                    <Link href="/categories/best-selling" className="text-base text-gray-400 hover:text-white">
                      Best Selling
                    </Link>
                  </li>
                  <li>
                    <Link href="/categories/new-arrivals" className="text-base text-gray-400 hover:text-white">
                      New Arrivals
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Support</h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link href="/contact" className="text-base text-gray-400 hover:text-white">
                      Contact Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/faq" className="text-base text-gray-400 hover:text-white">
                      FAQ
                    </Link>
                  </li>
                  <li>
                    <Link href="/shipping" className="text-base text-gray-400 hover:text-white">
                      Shipping
                    </Link>
                  </li>
                  <li>
                    <Link href="/returns" className="text-base text-gray-400 hover:text-white">
                      Returns
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-700 pt-8">
          <p className="text-base text-gray-400 xl:text-center">
            &copy; 2023 Luxury Timepieces. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}