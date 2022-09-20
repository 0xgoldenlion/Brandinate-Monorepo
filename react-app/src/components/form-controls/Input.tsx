import React from 'react';

export default function Input({
  name,
  placeholder,
}: {
  name: string;
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
        />
      </div>
    </>
  );
}
