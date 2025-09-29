'use client'

import { Skeleton } from '@heroui/react'

export default function Load() {
  return (
    <Skeleton className='rounded-lg'>
      <div className='h-24 rounded-lg' />
    </Skeleton>
  )
}