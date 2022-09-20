import Link from 'next/link';

import Button from '@/components/buttons/Button';
import Dropdown from '@/components/form-controls/Dropdown';
import Input from '@/components/form-controls/Input';
import Textarea from '@/components/form-controls/Textarea';
import AppLayout from '@/components/layout/AppLayout';

export default function NewProduct() {
  return (
    <AppLayout>
      <div className='mx-auto w-4/6 p-8 px-4 sm:px-6 md:px-8'>
        <h1 className='text-2xl font-semibold text-gray-900'>New Product</h1>

        <div className='py-4'>
          <div className='flex flex-col justify-between rounded-lg border-2 border-solid border-gray-200 py-4'>
            <div className='m-6 grid grid-cols-6 gap-y-4 gap-x-8'>
              <div className='col-span-3'>
                <Input
                  name='Product Name'
                  placeholder='GoPro HERO10 Black'
                ></Input>
              </div>
              <div className='col-span-3'>
                <Input name='Price' placeholder='$449.98'></Input>
              </div>
              <div className='col-span-3'>
                <Dropdown
                  name='Country of Sale'
                  options={['United States']}
                ></Dropdown>
              </div>
              <div className='col-span-3'>
                <Dropdown
                  name='Product Category'
                  options={['Clothing', 'Sports Wear']}
                ></Dropdown>
              </div>

              <div className='col-span-6 h-28'>
                <Textarea
                  name='Description'
                  placeholder='Describe your product'
                ></Textarea>
              </div>
            </div>
            <div className='m-6 grid grid-cols-6 gap-y-4 gap-x-8'>
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
                <Input name='Size' placeholder='M'></Input>
              </div>
            </div>
            <div className='flex justify-center py-4'>
              <Link href='/catalog'>
                <Button>Create Product</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
