'use client'

import { Button } from '@heroui/react'
import Link from 'next/link'

import './btnReturn.scss'

export default function btnReturn() {
  return (
    <div className="flex gap-4 items-center btnReturn">
      <Link href="/">
        <Button
          className="shadow-lg btnReturn"
          isIconOnly
          variant="shadow"
          color="primary"
          aria-label="Like">
          <i className="ph-fill ph-house"></i>
        </Button>
      </Link>
    </div>
  )
}
