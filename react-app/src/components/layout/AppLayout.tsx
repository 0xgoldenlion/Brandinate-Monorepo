import {
  AdjustmentsHorizontalIcon,
  Bars3Icon,
  BellIcon,
  HomeIcon,
  UserIcon,
  UserPlusIcon,
} from '@heroicons/react/24/outline';
import { Subject } from 'rxjs';

import { NavigationSidebar } from './NavigationSidebar';

export interface NavigationItem {
  name: string;
  href: string;
  icon: any;
  comingSoon?: boolean;
}

const navigation: NavigationItem[] = [
  { name: 'Catalog', href: '/catalog', icon: HomeIcon },
  { name: 'My Account', href: '/account', icon: UserIcon },
  { comingSoon: true, name: 'Engagement', href: '', icon: UserPlusIcon },
  { comingSoon: true, name: 'Notifications', href: '', icon: BellIcon },
  {
    comingSoon: true,
    name: 'Settings',
    href: '',
    icon: AdjustmentsHorizontalIcon,
  },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const toggleSidebar = new Subject<void>();

  return (
    <>
      <div>
        <NavigationSidebar
          navigation={navigation}
          toggleSidebar={toggleSidebar}
        ></NavigationSidebar>
        <div className='flex flex-1 flex-col md:pl-64'>
          <div className='sticky top-0 z-10 bg-gray-100 pl-1 pt-1 sm:pl-3 sm:pt-3 md:hidden'>
            <button
              type='button'
              className='-ml-0.5 -mt-0.5 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'
              onClick={() => toggleSidebar.next()}
            >
              <span className='sr-only'>Open sidebar</span>
              <Bars3Icon className='h-6 w-6' aria-hidden='true' />
            </button>
          </div>
          <main className='flex-1'>
            <div className='py-6'>{children}</div>
          </main>
        </div>
      </div>
    </>
  );
}
