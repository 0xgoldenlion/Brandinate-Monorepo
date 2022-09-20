import Link from 'next/link';

import Button from '@/components/buttons/Button';
import Dropdown from '@/components/form-controls/Dropdown';
import Input from '@/components/form-controls/Input';
import Textarea from '@/components/form-controls/Textarea';
import AppLayout from '@/components/layout/AppLayout';

import { gql, useMutation } from '@apollo/client'
import { useState } from 'react';
import { useRouter } from 'next/router';

export interface ProductType {
  price: string;
  gender: string;
  aditionalImages: string;
  countriesAvailable: string;
  gtin: string;
  mainImage: string;
  retailPrize: string;
  netContent: string;
  category: string;
  description: string;
  name: string;
  measurableUnit: string;
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

  const handleCreateProduct = (e) => {
    e.preventDefault()
    console.log(content)
    createProduct({ variables: { input: { content } } }).then(
      (res) => {
        router.push('/catalog')
        // navigate(`/notes/${id}`)
      },
      (err) => {
        alert(err)
      }
    )
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContent({...content, [name]: value})
  }
  
  return (
    <AppLayout>
      <div className='mx-auto w-4/6 p-8 px-4 sm:px-6 md:px-8'>
        <h1 className='text-2xl font-semibold text-gray-900'>New Product</h1>

        <div className='py-4'>
          <div className='flex flex-col justify-between rounded-lg border-2 border-solid border-gray-200 py-4'>
            <div className='m-6 grid grid-cols-6 gap-y-4 gap-x-8'>
              <div className='col-span-3'>
                <Input
                  name='Name'
                  disabled= { loading }
                  onChange= {handleChange}
                  content={content}
                  placeholder='GoPro HERO10 Black'
                ></Input>
              </div>
              <div className='col-span-3'>
                <Input 
                  name='Retail Prize' 
                  disabled= { loading }
                  onChange= {handleChange}
                  content={content}
                  placeholder='$449.98'
                ></Input>
              </div>
              <div className='col-span-6'>
                <Input
                  name='Main Image'
                  disabled= { loading }
                  onChange= {handleChange}
                  content={content}
                  placeholder='THIS SHOULD BE A FILE INPUT'
                ></Input>
              </div>
              <div className='col-span-6'>
                <Input
                  name='Aditional Images'
                  disabled= { loading }
                  onChange= {handleChange}
                  content={content}
                  placeholder='THIS SHOULD BE A FILE INPUT'
                ></Input>
              </div>
              <div className='col-span-3'>
                <Dropdown
                  name='Countries Available'
                  options={['United States']}
                  disabled={loading}
                  onChange={handleChange}
                  content={content}
                ></Dropdown>
              </div>
              <div className='col-span-3'>
                <Dropdown
                  name='Category'
                  options={['ELECTRONICS', 'CLOTHES', 'VEHICLES']}
                  disabled={loading}
                  onChange={handleChange}
                  content={content}
                ></Dropdown>
              </div>

              <div className='col-span-6 h-28'>
                <Textarea
                  name='Description'
                  disabled= { loading }
                  onChange= {handleChange}
                  content={content}
                  placeholder='Describe your product'
                ></Textarea>
              </div>
            </div>
            {/* <div className='m-6 grid grid-cols-6 gap-y-4 gap-x-8'>
              <div className='col-span-3'>
                <Dropdown
                  name='Color'
                  options={['White', 'Yellow', 'Black']}
                ></Dropdown>
              </div>
              <div className='col-span-3'>
                <Dropdown
                  name='Gender'
                  options={['Unisex', 'Men', 'Women']}
                ></Dropdown>
              </div>
              <div className='col-span-6'>
                <Input 
                  name='Size' 
                  disabled= { loading }
                  onChange= {handleChange}
                  content={content}
                  placeholder='M'
                ></Input>
              </div>
            </div> */}
            <div className='m-6 grid grid-cols-6 gap-y-4 gap-x-8'>
              <div className='col-span-3'>
                <Input 
                  name='Net Content' 
                  disabled= { loading }
                  onChange= {handleChange}
                  content={content}
                  placeholder='1000'
                ></Input>
              </div>
              <div className='col-span-3'>
                <Input 
                  name='Measurable Unit' 
                  disabled= { loading }
                  onChange= {handleChange}
                  content={content}
                  placeholder='Liters'
                ></Input>
              </div>
              <div className='col-span-6'>
                <Input
                  name='GTIN'
                  disabled= { loading }
                  onChange= {handleChange}
                  content={content}
                  placeholder='Global Trade Item'
                ></Input>
              </div>
            </div>
            <div className='flex justify-center py-4'>
              <Link href='/catalog'>
                <Button
                  onClick={(e) => handleCreateProduct(e)}
                  disabled={loading}
                >Create Product</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
