import React from 'react';
import { ProductType } from '@/pages/catalog/new';


export default function Input({
  name,
  disabled,
  onChange,
  content,
  placeholder,
}: {
  name: string;
  disabled: boolean;
  onChange: any; //how should be declared?
  content: ProductType;
  placeholder: string;
}) {
  const formatedName = name.toLowerCase().replace(' ', '');

  return (
    <>
      <label
        htmlFor={formatedName}
        className='block text-sm font-semibold text-gray-700'
      >
        {name}
      </label>
      <div className='mt-1'>
        <input
          type='text'
          name={formatedName}
          autoComplete={formatedName}
          className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
          placeholder={placeholder}
          value={content[formatedName]}
          disabled={disabled}
          onChange={(e) => onChange(e)}
        />
      </div>
    </>
  );
}
