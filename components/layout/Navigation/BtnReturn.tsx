'use client'

import { Button } from '@heroui/react'
import Link from 'next/link'

export default function BtnReturn() {
  return (
    <div
      className='flex gap-4 items-center'
      style={{
        position: 'fixed',
        bottom: '8px',
        left: '130px',
        zIndex: 1000
      }}
    >
      <Link href='/'>
        <Button
          isIconOnly
          aria-label='Home'
          className='shadow-lg'
          color='primary'
          variant='shadow'
        >
          <i className='ph-fill ph-house' style={{ margin: 0, padding: 0 }} />
        </Button>
      </Link>
    </div>
  )
}