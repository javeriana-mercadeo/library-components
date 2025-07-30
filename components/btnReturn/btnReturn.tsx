'use client'

import { Button } from '@heroui/react'
import Link from 'next/link'

import './btnReturn.scss'

export default function btnReturn() {
  return (
    <div className='flex gap-4 items-center btnReturn'>
      <Link href='/'>
        <Button isIconOnly aria-label='Like' className='shadow-lg btnReturn' color='primary' variant='shadow'>
          <i className='ph-fill ph-house' />
        </Button>
      </Link>
    </div>
  )
}
