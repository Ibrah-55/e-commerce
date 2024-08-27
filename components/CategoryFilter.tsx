'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useFilterContext } from '@/context/filter_context';
// Internationalization
import { useTranslation } from "@/app/i18n/client";
import type { LocaleTypes } from "@/app/i18n/settings";

const CategoryFilters = () => {
  const locale = useParams()?.locale as LocaleTypes;
  const { t } = useTranslation(locale, "common");
  const [categories, setCategories] = useState([]);
  const {
    filters: { category: categoryFilter },
    updateFilters,
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
    getCategories();
  }, []);

  return (
    <div className="category-filter flex items-center space-x-4">
      {categories.slice(0, 5).map((category) => (
        <div 
          key={category.slug} 
          className={`cursor-pointer ${categoryFilter.includes(category.slug) ? 'text-amber-500' : 'text-white'}`} 
          onClick={() => updateFilters({ target: { name: 'category', value: category.slug, checked: !categoryFilter.includes(category.slug) } })}
        >
          {category.name}
        </div>
      ))}
    </div>
  );
};

export default CategoryFilters;
