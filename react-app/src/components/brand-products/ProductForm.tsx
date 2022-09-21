import Link from 'next/link';
import React from 'react'
import Button from '@/components/buttons/Button';
import Dropdown from '@/components/form-controls/Dropdown';
import Input from '@/components/form-controls/Input';
import Textarea from '@/components/form-controls/Textarea';

const ProductForm = ({handleChange, handleMutation, content, loading}) => {
  return (
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
  )
}

export default ProductForm