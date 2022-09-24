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
  onChange: (input: React.ChangeEvent<HTMLSelectElement>) => void;
  content: ProductType;
}) {
  function camelize(str: string) {
    return str.toLowerCase().replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, '');
  }
  
  const formatedName = camelize(name)

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
          value={content[formatedName as keyof ProductType]}
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
