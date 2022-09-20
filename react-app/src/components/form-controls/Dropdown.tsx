import React from 'react';
import { ProductType } from '@/pages/catalog/new';

export default function Dropdown({
  name,
  options,
  disabled,
  onChange,
  content,
}: {
  name: string;
  options: string[];
  disabled?: boolean;
  onChange: any; //how should be declared?
  content: ProductType;
}) {
  
  const formatedName = name.toLowerCase().replace(' ', '');

  return (
    <>
      <label
        htmlFor={formatedName}
        className='block text-sm font-medium text-gray-700'
      >
        {name}
      </label>
      <div className='mt-1'>
        <select
          name={formatedName}
          autoComplete={formatedName}
          className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
          disabled={disabled}
          value={content[formatedName]}
          onChange={(e) => onChange(e)}
        >
          {options.map((opt, index) => (
            <option key={index}>{opt}</option>
          ))}
        </select>
      </div>
    </>
  );
}
