'use client'

import { useEffect } from 'react'
import main from '@/utils/main.js'

export function ClientSideUtils() {
  useEffect(() => {
    main()
  }, [])

  return null
}
