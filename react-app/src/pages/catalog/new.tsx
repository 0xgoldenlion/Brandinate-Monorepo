import AppLayout from '@/components/layout/AppLayout';

import { gql, useMutation } from '@apollo/client'
import { useState } from 'react';
import { useRouter } from 'next/router';
import ProductForm from '@/components/brand-products/ProductForm';

export interface ProductType {
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
`

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
  }
  const [content, setContent] = useState(initialProduct)
  const router = useRouter()
  const [createProduct, { loading }] = useMutation(CREATE_PRODUCT_MUTATION, {
    refetchQueries: ['ProductsList'],
  })

  const handleMutation = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    createProduct({ variables: { input: { content } } }).then(
      (res) => {
        router.push('/catalog')
      },
      (err) => {
        alert(err)
      }
    )
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) => {
    const { name, value } = e.target;
    setContent({...content, [name]: value})
  }
  
  return (
    <AppLayout>
      <div className='mx-auto w-4/6 p-8 px-4 sm:px-6 md:px-8'>
        <h1 className='text-2xl font-semibold text-gray-900'>New Product</h1>
        <ProductForm 
          handleChange={handleChange}
          handleMutation={handleMutation}
// @ts-ignore
          content={content}
          loading={loading}
        />
        
      </div>
    </AppLayout>
  );
}
