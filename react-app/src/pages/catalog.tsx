import { gql, useQuery } from '@apollo/client';

import ProductsList from '@/components/brand-products/ProductsList';
import { ProductsEmptyState } from '@/components/empty-state/products-empty-state';
import AppLayout from '@/components/layout/AppLayout';
import H1 from '@/components/text/H1';
import Subtitle from '@/components/text/Subtitle';

const PRODUCTS_LIST_QUERY = gql`
  query ProductsList {
    productIndex(last: 50) {
      edges {
        node {
          id
          name
          retailPrize
          category
          gtin
          author {
            id
          }
        }
      }
    }
    viewer {
      id
    }
  }
`;

export default function Catalog() {
  const { data } = useQuery(PRODUCTS_LIST_QUERY);
  const products =
    data?.productIndex?.edges.filter(
      (a: any) => a.node.author.id == data.viewer.id
    ) || [];

  return (
    <>
      <AppLayout>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 md:px-8'>
          <H1>Catalog</H1>
          <Subtitle>A list of all the products</Subtitle>
        </div>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 md:px-8'>
          <div className='py-4'>
            <div className='flex h-96 items-center justify-center rounded-lg border-2 border-solid border-gray-200'>
              {products.length === 0 ? (
                <ProductsEmptyState></ProductsEmptyState>
              ) : (
                <ProductsList products={products}></ProductsList>
              )}
            </div>
          </div>
        </div>
      </AppLayout>
    </>
  );
}
