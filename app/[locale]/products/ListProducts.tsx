'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types/product';
// Internationalization
import { useTranslation } from "@/app/i18n/client";
import type { LocaleTypes } from "@/app/i18n/settings";
import ProductCart from '@/components/ProductCard';

const ProductList = ({ products }: { products: Product[] }) => {
  const locale = useParams()?.locale as LocaleTypes;
  const { t } = useTranslation(locale, "common");

  // Slice the products array to show only the first 12 items
  const displayedProducts = products.slice(0, 12);

  return (
    <div className="grid grid-cols-1 gap-1.2 p-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {displayedProducts.map((product) => (
        <ProductCart key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
