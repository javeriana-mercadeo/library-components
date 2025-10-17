'use client'

import { useEffect, useState, useRef } from 'react'
import { usePathname, useRouter } from 'next/navigation'

export function useNavigationLoading() {
  const [isLoading, setIsLoading] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const timeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    const handleStart = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      setIsLoading(true)
    }

    // Store original methods
    const originalPush = router.push.bind(router)
    const originalReplace = router.replace.bind(router)

    // Override router.push
    router.push = (...args: Parameters<typeof originalPush>) => {
      handleStart()

      return originalPush(...args)
    }

    // Override router.replace
    router.replace = (...args: Parameters<typeof originalReplace>) => {
      handleStart()

      return originalReplace(...args)
    }

    return () => {
      // Restore original methods
      router.push = originalPush
      router.replace = originalReplace

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [router])

  // Listen to pathname changes to stop loading
  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      setIsLoading(false)
    }, 150)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [pathname])

  return { isLoading }
}

export default useNavigationLoading
