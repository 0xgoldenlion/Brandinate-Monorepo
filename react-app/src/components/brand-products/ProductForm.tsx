import Link from 'next/link';
import React from 'react';

import Button from '@/components/buttons/Button';
import Dropdown from '@/components/form-controls/Dropdown';
import Input from '@/components/form-controls/Input';
import Textarea from '@/components/form-controls/Textarea';

import { Product } from '@/pages/catalog/new';

import FileUpload from '../form-controls/FileUpload';

const ProductForm = ({
  productChanged,
  persist,
  product,
  loading,
}: {
  productChanged: (name: string, value: any) => void;
  persist: () => void;
  product: Product;
  loading: boolean;
}) => {
  const onProductChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    productChanged(name, value);
  };

  const onImageChange = (name: string, cid: string) => {
    productChanged(name, cid);
  };

  return (
    <div className='py-4'>
      <div className='flex flex-col justify-between rounded-lg border-2 border-solid border-gray-200 py-4'>
        <div className='m-6 grid grid-cols-6 gap-y-4 gap-x-8'>
          <div className='col-span-3'>
            <Input
              name='Name'
              disabled={loading}
              onChange={onProductChange}
              value={product.name}
              placeholder='GoPro HERO10 Black'
            ></Input>
          </div>
          <div className='col-span-3'>
            <Input
              name='Retail Prize'
              disabled={loading}
              onChange={onProductChange}
              value={product.retailPrize}
              placeholder='$449.98'
            ></Input>
          </div>
          <div className='col-span-6'>
            <FileUpload
              name='Main Image'
              handleImageChange={onImageChange}
              cid={product.mainImage ?? ''}
            ></FileUpload>
          </div>
          <div className='col-span-6'>
            <FileUpload
              name='Aditional Images'
              handleImageChange={onImageChange}
              cid={product.aditionalImages ?? ''}
            ></FileUpload>
          </div>
          <div className='col-span-3'>
            <Dropdown
              name='Countries Available'
              options={['United States']}
              disabled={loading}
              onChange={onProductChange}
              value={product.countriesAvailable}
            ></Dropdown>
          </div>
          <div className='col-span-3'>
            <Dropdown
              name='Category'
              options={['ELECTRONICS', 'CLOTHES', 'VEHICLES']}
              disabled={loading}
              onChange={onProductChange}
              value={product.category}
            ></Dropdown>
          </div>

          <div className='col-span-6 h-28'>
            <Textarea
              name='Description'
              disabled={loading}
              onChange={onProductChange}
              value={product.description}
              placeholder='Describe your product'
            ></Textarea>
          </div>
        </div>
        <div className='m-6 grid grid-cols-6 gap-y-4 gap-x-8'>
          <div className='col-span-3'>
            <Input
              name='Net Content'
              disabled={loading}
              onChange={onProductChange}
              value={product.netContent}
              placeholder='1000'
            ></Input>
          </div>
          <div className='col-span-3'>
            <Input
              name='Measurable Unit'
              disabled={loading}
              onChange={onProductChange}
              value={product.measurableUnit}
              placeholder='Liters'
            ></Input>
          </div>
          <div className='col-span-6'>
            <Input
              name='GTIN'
              disabled={loading}
              onChange={onProductChange}
              value={product.gtin}
              placeholder='Global Trade Item'
            ></Input>
          </div>
        </div>
        <div className='flex justify-center py-4'>
          <Link href='/catalog'>
            <Button
              onClick={(e) => {
                e.preventDefault;
                persist();
              }}
              disabled={loading}
            >
              Create Product
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
