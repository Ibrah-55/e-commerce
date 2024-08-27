'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types/product';
// Internationalization
import { useTranslation } from "@/app/i18n/client";
import type { LocaleTypes } from "@/app/i18n/settings";

const ProductCart = ({product}: {product: Product}) => {
  const locale = useParams()?.locale as LocaleTypes;
  const { t } = useTranslation(locale, "common");

  return (
    <div key={product.id} className='bg-gray-300 shadow-md rounded-lg px-2 py-2 md:px-5 md:py-5 flex flex-col justify-between w-full'>
      <Image src={product.thumbnail} width={600} height={150} alt={product.title} className='rounded-md h-14 object-cover md:h-30 sm:object-scale-down w-screen' />
      <div className='mt-2 md:mt-4'>
        <h1 className='text-sm md:text-lg uppercase font-bold'>
          {product.title}
          </h1>
        <p className='mt-2 text-gray-600 text-sm'>{product.description.slice(0, 60)}...</p>
        <p className='mt-2 text-gray-600'>${product.price}</p>
      </div>
      <div className='mt-2 md:mt-6 flex flex-col lg:flex-row justify-center items-center'>
      <Link
        href={{
          pathname: "products/product",
          query: {id: product.id},
        }}
        className="mt-2 lg:mt-0 px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
      >
      {t("shop.viewProduct")}
      </Link>
    </div>
  </div>
  )
};

export default ProductCart;