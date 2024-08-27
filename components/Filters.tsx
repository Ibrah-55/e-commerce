'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useFilterContext } from '@/context/filter_context';
// Internationalization
import { useTranslation } from "@/app/i18n/client";
import type { LocaleTypes } from "@/app/i18n/settings";
import Button from "./Button";
import './filter.css'
const Filters = () => {
  const locale = useParams()?.locale as LocaleTypes;
  const { t } = useTranslation(locale, "common");
  const [categories, setCategories] = useState([]);
  const {
    filters: { text, category: categoryFilter, min_price, max_price, price },
    updateFilters,
    all_products: products,
    clearFilters,
  } = useFilterContext();

  const getCategories = () => { 
    fetch('https://dummyjson.com/products/categories')
    .then(res => res.json())  
    .then((data) => {
      setCategories(data);
    })  
    .catch((err) => console.log(err));
  }
  
  useEffect(() => {
    getCategories()
  }, [])

  if (products.length > 0) {
    return (
      <div>
        <div className='content'>
          <form 
            className='filter__form' 
            onSubmit={(e) => e.preventDefault()}>
            <div className='relative w-4/5 mb-4'>
              <label htmlFor="voice-search" className="sr-only">{t("shop.search")}</label>
              <input
                type='text'
                name='text'
                placeholder={t("shop.searchProducts")}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-5 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                value={text}
                onChange={updateFilters}
              />
            </div>
            <div className='form__control mb-4'>
              <h4 className="text-xl mb-2">{t("shop.categories")}</h4>
              <ul className='form__categories flex flex-wrap'>
                {categories && categories.map((category) => (
                  <li 
                    key={category.slug}
                    className={`cursor-pointer p-2 mr-2 mb-2 border border-gray-300 rounded-md ${categoryFilter.includes(category.slug) ? 'bg-amber-100' : ''}`}
                    onClick={() => updateFilters({ target: { name: 'category', value: category.slug, checked: !categoryFilter.includes(category.slug) } })}
                  >
                    {category.name}
                  </li>
                ))}
              </ul>
            </div>
            <div className='form__control'>
              <h4 className="text-xl mb-2">{t("shop.price")}</h4>
              <p className='price'>${price}</p>
              <input
                type='range'
                name='price'
                min={min_price}
                max={max_price}
                value={price}
                onChange={updateFilters}
              />
            </div>
          </form>
          <Button onClick={clearFilters}>
            {t("shop.resetFilters")}
          </Button>
        </div>
      </div>
    );
  }
  return <div></div>;
};

export default Filters;
