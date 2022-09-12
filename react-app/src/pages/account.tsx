import Router from 'next/router';

export default function Account() {
  return (
    <div className='flex justify-center'>
      <form className='space-y-8 divide-y divide-gray-200 py-24 md:w-2/3 lg:w-1/2'>
        <div className='space-y-8 divide-y divide-gray-200'>
          <div className='pt-8'>
            <div>
              <h3 className='text-lg font-medium leading-6 text-gray-900'>
                Account
              </h3>
              <p className='mt-1 text-sm text-gray-500'>
                Here you can edit your account settings.
              </p>
            </div>
            <div className='mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6'>
              <div className='sm:col-span-3'>
                <label
                  htmlFor='first-name'
                  className='block text-sm font-medium text-gray-700'
                >
                  Display Name
                </label>
                <div className='mt-1'>
                  <input
                    type='text'
                    name='first-name'
                    autoComplete='given-name'
                    className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                  />
                </div>
              </div>

              <div className='sm:col-span-3'>
                <label
                  htmlFor='category'
                  className='block text-sm font-medium text-gray-700'
                >
                  Category
                </label>
                <div className='mt-1'>
                  <select
                    name='category'
                    autoComplete='category-name'
                    className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                  >
                    <option>Sports wear</option>
                    <option>Electronics</option>
                    <option>Clothing</option>
                  </select>
                </div>
              </div>

              <div className='sm:col-span-3'>
                <label
                  htmlFor='brand-site'
                  className='block text-sm font-medium text-gray-700'
                >
                  Brand site
                </label>
                <div className='mt-1'>
                  <input
                    type='text'
                    name='brand-site'
                    autoComplete='brand-site'
                    className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                    placeholder='https://www.apple.com'
                  />
                </div>
              </div>

              <div className='sm:col-span-3'>
                <label
                  htmlFor='slogan'
                  className='block text-sm font-medium text-gray-700'
                >
                  Slogan
                </label>
                <div className='mt-1'>
                  <input
                    type='text'
                    name='slogan'
                    autoComplete='slogan'
                    className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                    placeholder='Think different.'
                  />
                </div>
              </div>

              <div className='sm:col-span-6'>
                <label
                  htmlFor='about'
                  className='block text-sm font-medium text-gray-700'
                >
                  About
                </label>
                <div className='mt-1'>
                  <textarea
                    name='about'
                    rows={5}
                    className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                    defaultValue={''}
                  />
                </div>
                <p className='mt-2 text-sm text-gray-500'>
                  Give your customers an overview about your company.
                </p>
              </div>
            </div>
          </div>
          <div className='pt-1'>
            <div className='mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6'>
              <div className='sm:col-span-6'>
                <label
                  htmlFor='logo'
                  className='text-lg font-medium leading-6 text-gray-900'
                >
                  Logo
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
                        htmlFor='file-upload'
                        className='relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500'
                      >
                        <span>Upload a file</span>
                        <input
                          name='file-upload'
                          type='file'
                          className='sr-only'
                        />
                      </label>
                      <p className='pl-1'>or drag and drop</p>
                    </div>
                    <p className='text-xs text-gray-500'>
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='pt-5'>
            <div>
              <h3 className='text-lg font-medium leading-6 text-gray-900'>
                Contact
              </h3>
            </div>
            <div className='mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6'>
              <div className='sm:col-span-3'>
                <label
                  htmlFor='email'
                  className='block text-sm font-medium text-gray-700'
                >
                  Email
                </label>
                <div className='mt-1'>
                  <input
                    name='email'
                    type='email'
                    autoComplete='email'
                    className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                  />
                </div>
              </div>

              <div className='sm:col-span-3'>
                <label
                  htmlFor='phone'
                  className='block text-sm font-medium text-gray-700'
                >
                  Phone
                </label>
                <div className='mt-1'>
                  <input
                    name='phone'
                    type='text'
                    className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                  />
                </div>
              </div>

              <div className='sm:col-span-2'>
                <label
                  htmlFor='country'
                  className='block text-sm font-medium text-gray-700'
                >
                  Country
                </label>
                <select
                    name='country'
                    autoComplete='country-name'
                    className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                  >
                    <option>United Nations</option>
                    <option>Germany</option>
                    <option>Portugal</option>
                  </select>
              </div>

              <div className='sm:col-span-2'>
                <label
                  htmlFor='city'
                  className='block text-sm font-medium text-gray-700'
                >
                  City
                </label>
                <div className='mt-1'>
                  <input
                    type='text'
                    name='city'
                    autoComplete='address-level1'
                    className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                  />
                </div>
              </div>

              <div className='sm:col-span-2'>
                <label
                  htmlFor='postal-code'
                  className='block text-sm font-medium text-gray-700'
                >
                  ZIP / Postal code
                </label>
                <div className='mt-1'>
                  <input
                    type='text'
                    name='postal-code'
                    autoComplete='postal-code'
                    className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                  />
                </div>
              </div>

              <div className='sm:col-span-6'>
                <label
                  htmlFor='street-address'
                  className='block text-sm font-medium text-gray-700'
                >
                  Business address
                </label>
                <div className='mt-1'>
                  <input
                    type='text'
                    name='street-address'
                    autoComplete='street-address'
                    className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='pt-5'>
          <div className='flex justify-end'>
            <button
              type='button'
              className='rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
            >
              Cancel
            </button>
            <button
              type='submit'
              className='ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
              onClick={() => Router.push('/catalog')}
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
