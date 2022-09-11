import {
  AdjustmentsHorizontalIcon,
  BellIcon,
  HomeIcon,
  UserPlusIcon,
} from '@heroicons/react/24/outline';
import { useState } from 'react';

import AppLayout from '@/components/layout/AppLayout';

const navigation = [
  { name: 'Catalog', href: '#', icon: HomeIcon, current: true },
  { name: 'Engagement', href: '#', icon: UserPlusIcon, current: false },
  { name: 'Notifications', href: '#', icon: BellIcon, current: false },
  {
    name: 'Settings',
    href: '#',
    icon: AdjustmentsHorizontalIcon,
    current: false,
  },
];

export default function Example() {
  return (
    <>
      <AppLayout></AppLayout>
    </>
  );
}
