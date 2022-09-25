import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { useState } from 'react';

import ProductForm from '@/components/brand-products/ProductForm';
import AppLayout from '@/components/layout/AppLayout';

export interface Product {
  aditionalImages?: string;
  countriesAvailable?: string;
  gtin?: string;
  mainImage: string;
  retailPrize: string;
  netContent?: string;
  category?: string;
  description: string;
  name: string;
  measurableUnit?: string;
  id: string;
}

const CREATE_PRODUCT_MUTATION = gql`
  mutation CreateProduct($input: CreateProductInput!) {
    createProduct(input: $input) {
      document {
        id
      }
    }
  }
`;

export default function NewProduct() {
  const initialProduct = {
    aditionalImages: '',
    countriesAvailable: '',
    gtin: '',
    mainImage: '',
    retailPrize: '',
    netContent: '',
    category: '',
    description: '',
    name: '',
    measurableUnit: '',
  };
  const [product, setProduct] = useState(initialProduct);
  const router = useRouter();
  const [createProductMutation, { loading }] = useMutation(
    CREATE_PRODUCT_MUTATION,
    {
      refetchQueries: ['ProductsList'],
    }
  );

  const createProduct = () => {
    createProductMutation({ variables: { input: { content: product } } }).then(
      () => {
        router.push('/catalog');
      },
      (error: string) => {
        alert(error);
      }
    );
  };

  const productChanged = (name: string, value: any) => {
    setProduct({ ...product, [name]: value });
  };

  return (
    <AppLayout>
      <div className='mx-auto w-4/6 p-8 px-4 sm:px-6 md:px-8'>
        <h1 className='text-2xl font-semibold text-gray-900'>New Product</h1>
        <ProductForm
          productChanged={productChanged}
          persist={createProduct}
          // @ts-ignore
          product={product}
          loading={loading}
        />
      </div>
    </AppLayout>
  );
}
