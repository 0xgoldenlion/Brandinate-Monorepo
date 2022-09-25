import Image from 'next/image';
import React from 'react';

import PinataService from '@/services/PinataService';

export default function FileUpload({
  cid: logoCID,
  name,
  handleImageChange,
}: {
  name: string;
  cid: string;
  handleImageChange: (name: string, cid: string) => void;
}) {
  const pinataService = new PinataService();

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (!files) return;

    const data = new FormData();
    data.append('file', files[0]);
    const cid = (await pinataService.uploadImage(data)) as string;
    handleImageChange(name, cid);
  };

  return (
    <>
      <div className='sm:col-span-6'>
        <label className='text-lg font-medium leading-6 text-gray-900'>
          {name}
        </label>
        <div className='mt-4 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6'>
          <div className='space-y-1 text-center'>
            <svg
              className='mx-auto h-12 w-12 text-gray-400'
              stroke='currentColor'
              fill='none'
              viewBox='0 0 48 48'
              aria-hidden='true'
            >
              <path
                d='M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02'
                strokeWidth={2}
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
            <div className='flex text-sm text-gray-600'>
              <label
                htmlFor='logo'
                className='relative cursor-pointer rounded-md font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500'
              >
                <span>Upload a file</span>
                <input
                  name='logo'
                  id='logo'
                  className='sr-only'
                  type='file'
                  onChange={uploadImage}
                />
              </label>
              <p className='pl-1'>or drag and drop</p>
            </div>
            <p className='text-xs text-gray-500'>PNG, JPG, GIF up to 10MB</p>
          </div>
          {logoCID !== '' && (
            <div>
              <Image
                src={`https://ipfs.io/ipfs/${logoCID}`}
                alt='logo'
                width='100%'
                height='100%'
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
