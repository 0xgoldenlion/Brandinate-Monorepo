import React from 'react'

export default function Subtitle({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <p className={'text-sm text-gray-500 ' + className ?? ''}>{children}</p>
  );
}
