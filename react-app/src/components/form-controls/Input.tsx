import React from 'react';

export default function Input({
  name,
  disabled,
  onChange,
  value,
  placeholder,
}: {
  name: string;
  disabled: boolean;
  onChange: (input: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  placeholder: string;
}) {
  function camelize(str: string): string {
    return str
      .toLowerCase()
      .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
      })
      .replace(/\s+/g, '');
  }

  const formatedName: string = camelize(name);

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
          value={value}
          disabled={disabled}
          onChange={onChange}
        />
      </div>
    </>
  );
}
