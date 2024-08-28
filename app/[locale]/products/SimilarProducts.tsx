'use client';

import { useParams } from 'next/navigation';
import './page.module.css';
import { useProductsContext } from '@/context/products_context';
import { useFilterContext } from '@/context/filter_context';
import GridProducts from './GridProducts';
import { Suspense } from 'react';
// Internationalization
import { useTranslation } from "@/app/i18n/client";
import type { LocaleTypes } from "@/app/i18n/settings";
import ListProductsThumbNail from './ListProductsthumbNail';
import Products from './Products';
import ProductCart from '@/components/ProductCard';

const SimilarProducts = () => {
  const locale = useParams()?.locale as LocaleTypes;
  const { t } = useTranslation(locale, "common");

  const { 
    filtered_products: products, 
    grid_view,
  } = useFilterContext();

  const {
    products_loading: loading,
    products_error: error,
  } = useProductsContext();

  if (error) {
    return (
      <h4>{t("shop.smthWentWrong")}</h4>
    );
  }

  // Slice the first 4 products
  const limitedProducts = products.slice(0, 4);

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {grid_view 
            ? (
              <Suspense fallback={<div>Loading...</div>}>
                <GridProducts products={limitedProducts} />
              </Suspense>
            ) : (
              <Suspense fallback={<div>Loading...</div>}>
                <ListProductsThumbNail products={limitedProducts} />
              </Suspense>
            )
          }
        </>
      )}
    </>
  );
}

export default SimilarProducts;
