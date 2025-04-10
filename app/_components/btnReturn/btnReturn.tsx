'use client'

import { Button } from '@heroui/react'

import './btnReturn.scss'

export default function btnReturn() {
  return (
    <div className="flex gap-4 items-center btnReturn">
      <Button isIconOnly aria-label="Like" className='btnReturn'>
        <i className="ph-fill ph-house"></i>
      </Button>
    </div>
  )
}
