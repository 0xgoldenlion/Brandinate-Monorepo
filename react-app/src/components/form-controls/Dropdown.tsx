import React from 'react';

export default function Dropdown({
  name,
  options,
  disabled,
}: {
  name: string;
  options: string[];
  disabled?: boolean;
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
        >
          {options.map((opt, index) => (
            <option key={index}>{opt}</option>
          ))}
        </select>
      </div>
    </>
  );
}
