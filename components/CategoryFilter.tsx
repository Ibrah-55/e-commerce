'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useFilterContext } from '@/context/filter_context';
// Internationalization
import { useTranslation } from "@/app/i18n/client";
import type { LocaleTypes } from "@/app/i18n/settings";

const CategoryFilter = () => {
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
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="category-filter flex items-center space-x-4">
      {categories.slice(0, 5).map((category) => (
        <div key={category.slug} className="form-check flex items-center">
       
          <label className="inline-block ps-[0.15rem] hover:cursor-pointer pl-2 text-white" htmlFor={category.slug}>
            {category.name}
          </label>
          <div className="category-filter flex items-center space-x-4">

    </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryFilter;
