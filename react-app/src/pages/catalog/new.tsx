import Dropdown from '@/components/form-controls/Dropdown';
import Input from '@/components/form-controls/Input';
import AppLayout from '@/components/layout/AppLayout';
import Link from 'next/link';

export default function NewProduct() {
  return (
    <AppLayout>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 md:px-8'>
        <h1 className='text-2xl font-semibold text-gray-900'>New Product</h1>
      </div>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 md:px-8'>
        <div className='py-4'>
          <div className='flex h-96 flex-col justify-between rounded-lg border-2 border-solid border-gray-200 py-4'>
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
                  disabled={true}
                ></Dropdown>
              </div>
              <div className='col-span-3'>
                <Dropdown
                  name='Product Category'
                  options={['Clothing', 'Sports Wear']}
                ></Dropdown>
              </div>
            </div>
            <div className='flex justify-center'>
              <button
                type='button'
                className='ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
              >
                <Link href='/catalog'>Create Product</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
