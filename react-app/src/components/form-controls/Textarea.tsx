import React from 'react';

import { Product } from '@/pages/catalog/new';

export default function Textarea({
  name,
  disabled,
  onChange,
  content,
  ...props
}: {
  name: string;
  disabled: boolean;
  onChange: (input: React.ChangeEvent<HTMLTextAreaElement>) => void;
  content: Product;
  [key: string]: any;
}) {
  function camelize(str: string) {
    return str
      .toLowerCase()
      .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
      })
      .replace(/\s+/g, '');
  }

  const formatedName = camelize(name);

  return (
    <>
      <div className='h-full w-full'>
        <label
          className='block text-sm font-semibold text-gray-700'
          htmlFor={formatedName}
        >
          {name}
        </label>
        <textarea
          className='mt-1 !h-full w-full resize-none rounded border-gray-300 text-sm shadow-sm'
          name={formatedName}
          autoComplete={formatedName}
          value={content[formatedName as keyof Product]}
          disabled={disabled}
          onChange={(e) => onChange(e)}
          {...(props ?? {})}
        ></textarea>
      </div>
    </>
  );
}
