/** @format */

import ProductDetailsClient from "./ProductDetailsClient";

export const dynamic = "force-dynamic";

export default function Page({ params }) {
  const id = params?.id;
  return <ProductDetailsClient productId={id} />;
}
