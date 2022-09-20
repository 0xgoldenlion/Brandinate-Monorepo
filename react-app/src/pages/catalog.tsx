import ProductsList, {
  Product,
} from '@/components/brand-products/ProductsList';
import { ProductsEmptyState } from '@/components/empty-state/products-empty-state';
import AppLayout from '@/components/layout/AppLayout';
import H1 from '@/components/text/H1';
import Subtitle from '@/components/text/Subtitle';
import { useAuth } from '@/lib/auth';

import { gql, useQuery } from '@apollo/client'

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
        author
          {
            id
          }
      }
    }
  }
  viewer{
    id
  }
}
`

export default function Catalog() {
  // const products: Product[] = [
  //   { name: 'GoPro', price: '6$', category: 'Camera', gender: 'Unisex' },
  //   { name: 'Headband', price: '20$', category: 'Clothing', gender: 'Men' },
  // ];

  const [authState] = useAuth()

  const { data } = useQuery(PRODUCTS_LIST_QUERY)
  const products = data.productIndex.edges.filter((a) => a.node.author.id == data.viewer.id)

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
