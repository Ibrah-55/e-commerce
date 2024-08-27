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

  const handleCategoryClick = (slug: string) => {
    // Create a mock event object
    const event = {
      target: {
        name: 'category',
        value: slug,
        checked: !categoryFilter.includes(slug),
      },
    } as unknown as React.ChangeEvent<HTMLInputElement>; // Type cast to fit the expected type

    updateFilters(event);
  };

  return (
    <div className="category-filter flex items-center space-x-4">
      {categories.slice(0, 5).map((category) => (
        <div 
          key={category.slug} 
          className={`cursor-pointer ${categoryFilter.includes(category.slug) ? 'text-amber-500' : 'text-white'}`} 
          onClick={() => handleCategoryClick(category.slug)}
        >
          {category.name}
        </div>
      ))}
    </div>
  );
};

export default CategoryFilters;
