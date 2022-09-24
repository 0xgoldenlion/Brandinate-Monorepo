import AppLayout from '@/components/layout/AppLayout';

import { gql, useMutation, useQuery } from '@apollo/client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ProductForm from '@/components/brand-products/ProductForm';

const PRODUCT_QUERY = gql`
  query Product($id: ID!) {
    product: node(id: $id) {
      ... on Product {
        id
        version
        aditionalImages
        countriesAvailable
        gtin
        mainImage
        retailPrize
        netContent
        category
        description
        name
        measurableUnit
      }
    }
  }
`


const UPDATE_PRODUCT_MUTATION = gql`
  mutation UpdateProduct($input: UpdateProductInput!) {
    updateProduct(input: $input) {
      document {
        __typename
        id
        version
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
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const { id } = router.query
  const productQuery = useQuery(PRODUCT_QUERY, { variables: { id } })
  const [updateProduct, { loading }] = useMutation(UPDATE_PRODUCT_MUTATION, {
    refetchQueries: ['Product'],
  })

  const handleMutation = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    const { version } = productQuery.data.product
    updateProduct({
      variables: { input: { id, content, options: { version } } },
    }).then(
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

  useEffect(() => {
    if (productQuery.data && isLoading) {
      const { id, __typename, version, ...product} = productQuery.data.product
      setContent(product)
      setIsLoading(false)
    }
  }, [id, productQuery.data])
  
  
  return (
    <AppLayout>
      <div className='mx-auto w-4/6 p-8 px-4 sm:px-6 md:px-8'>
        <h1 className='text-2xl font-semibold text-gray-900'>Update Product</h1>
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
