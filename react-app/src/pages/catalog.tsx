import { ProductsEmptyState } from '@/components/empty-state/products-empty-state';
import AppLayout from '@/components/layout/AppLayout';

export default function Catalog() {
  return (
    <>
      <AppLayout>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 md:px-8'>
          <h1 className='text-2xl font-semibold text-gray-900'>Catalog</h1>
        </div>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 md:px-8'>
          <div className='py-4'>
            <div className='h-96 rounded-lg border-2 border-solid border-gray-200 flex items-center justify-center' >
              <ProductsEmptyState></ProductsEmptyState>
            </div>
          </div>
        </div>
      </AppLayout>
    </>
  );
}
