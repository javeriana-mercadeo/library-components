'use client'

import { Button } from '@heroui/react'
import Link from 'next/link'

import './btnReturn.scss'

export default function btnReturn() {
  return (
    <div className="flex gap-4 items-center btnReturn">
      <Link href="/">
        <Button isIconOnly aria-label="Like" className="btnReturn">
          <i className="ph-fill ph-house"></i>
        </Button>
      </Link>
    </div>
  )
}
