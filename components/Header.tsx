'use client';

import './header.css';
import MiniCart from '@/components/miniCart';
import {   
  useRouter,
  usePathname,
  useParams,
  useSelectedLayoutSegments,
  useSearchParams
} from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { FaShoppingCart } from "react-icons/fa";
import { useCartContext } from '@/context/cart_context';
// Internationalization
import { useTranslation } from "@/app/i18n/client";
import type { LocaleTypes } from "@/app/i18n/settings";
import Filters from './Filters';
import CategoryFilter from './CategoryFilter';

const Header = () => {
  const { total_items, openMiniCart } = useCartContext();
  const [nav, setNav] = useState<boolean>(false);
  const locale = useParams()?.locale as LocaleTypes;
  const pathname = usePathname();
  const { t } = useTranslation(locale, "common");
  const router = useRouter();
  const urlSegments = useSelectedLayoutSegments();
  const searchParams = useSearchParams();

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className='bg-indigo-900 flex justify-between items-center h-20 mx-auto px-4 text-amber-200'>
      <Link href="/">
        <h2 className='w-full text-xl lg:text-3xl font-bold text-amber-200'>{t("header.siteTitle")}</h2>
      </Link>

      {/* Desktop Navigation */}
      <nav className='nav'>
        <ul className='hidden md:flex md:items-center space-x-4'>
          <Link className={`nav-link ${pathname === '/products' ? 'active' : ''}`} href="/products">{t("header.mainNav.shop")}</Link>

          {/* Category Filter Component */}
          <CategoryFilter />

          {/* Cart Icon */}
          <Link className='nav-link shop-cart relative' href="#" onClick={openMiniCart}>
            <FaShoppingCart/>
            {total_items > 0 
              ? <span className="absolute inset-0 object-right-top ml-8 -mt-3">
                  <div className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-semibold leading-4 bg-amber-200 text-black">
                    {total_items}
                  </div>
                </span>
              : ''}
          </Link>
        </ul>
      </nav>

      {/* Mobile Navigation Icon */}
      <div onClick={handleNav} className='block mr-4 md:mr-0 md:hidden'>
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={
          nav
            ? 'fixed md:hidden left-0 top-0 overflow-hidden z-10 bg-gray-900 bg-opacity-25 inset-0 h-full  ease-in-out duration-500'
            : 'fixed top-0 bottom-0 left-[-100%]'
        }>
        <ul
          className={
            nav
              ? 'fixed md:hidden left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500'
              : 'ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%]'
          }
        >
          {/* Mobile Logo */}
          <h2 className='w-full text-3xl font-bold text-amber-200 m-4'>{t("header.siteTitle")}</h2>

          {/* Mobile Navigation Items */}
          <li
            className='p-4 border-b rounded-xl hover:bg-[#00df9a] duration-300 hover:text-black cursor-pointer border-gray-600'
          >
            <Link href="/products" onClick={() => setNav(false)}>{t("header.mainNav.shop")}</Link>
          </li>
        </ul>
        <section
          className="w-screen h-full cursor-pointer"
          onClick={() => {
            setNav(false);
          }}
        ></section>
      </div>
      
      {/* Mobile Cart Icon */}
      <Link className='md:hidden mr-4 nav-link shop-cart relative' href="#" onClick={openMiniCart}>
        <FaShoppingCart/>
        {total_items > 0 
         ? <span className="absolute inset-0 object-right-top ml-2 -mt-4">
          <div className="inline-flex items-center px-1.5 py-0.5 border-2 border-white rounded-full text-xs font-semibold leading-4 bg-amber-500 text-black">
            {total_items}
          </div>
        </span>
        : '' }
      </Link>
     
      <MiniCart />
    </div>
  );
}

export default Header;
