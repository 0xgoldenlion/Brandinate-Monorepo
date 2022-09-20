import React from 'react';

export default function Textarea({
  name,
  ...props
}: {
  name: string;
  [key: string]: any;
}) {
  const formatedName = name.toLowerCase().replace(' ', '');

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
          {...(props ?? {})}
        ></textarea>
      </div>
    </>
  );
}
