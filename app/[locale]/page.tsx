'use client';

import { useParams } from 'next/navigation'
import Breadcrumb from "@/components/Breadcrumb";
import Filters from "@/components/Filters";
import Products from './products/Products';
import Sort from "@/components/Sort";
// Internationalization
import { useTranslation } from "@/app/i18n/client";
import type { LocaleTypes } from "@/app/i18n/settings";
import SimilarProducts from './products/SimilarProducts';

const ProductsPage = () => {
  const locale = useParams()?.locale as LocaleTypes;
  const { t } = useTranslation(locale, "common");

  return (
    <main>
      <div className='px-10 lg:px-20 py-5'>
        {/* <Breadcrumb title={t("breadcrumbs.products")}/> */}
        <h1 className='text-2xl uppercase font-bold mt-10 mb-10'>{t("shop.shop")}</h1> 
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 gap-x-8 gap-y-10 lg:grid-cols-5 px-5 md:px-10 lg:px-20">
        <Filters />
        <div className='col-span-2 md:col-span-2 lg:col-span-4 mb-4 md:mb-12'>
        <div className="bg-white">
  <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">

    <div className="mt-6 grid grid-co-cols-4 xl:gap-x-8">
      <div className="group relative">
      <Sort />
          <Products />
        </div>
      </div>
    </div>
  </div>
</div>
          
      </div>
    </main>
  );
};


export default ProductsPage;