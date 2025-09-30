'use client'

import { useEffect, useState } from 'react'

interface LoadingBarProps {
  isLoading: boolean
}

export default function LoadingBar({ isLoading }: LoadingBarProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (isLoading) {
      setProgress(0)
      const timer = setInterval(() => {
        setProgress(prev => {
          if (prev >= 95) {
            clearInterval(timer)

            return 95
          }

          return prev + Math.random() * 15
        })
      }, 100)

      return () => clearInterval(timer)
    } else {
      setProgress(100)
      const timer = setTimeout(() => {
        setProgress(0)
      }, 300)

      return () => clearTimeout(timer)
    }
  }, [isLoading])

  if (!isLoading && progress === 0) {
    return null
  }

  return (
    <div className='fixed top-0 left-0 right-0 z-[9999] h-1 bg-gray-200/30'>
      <div
        className='h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-300 ease-out'
        style={{
          width: `${progress}%`,
          boxShadow: progress > 0 ? '0 0 20px rgba(59, 130, 246, 0.8), 0 2px 6px rgba(59, 130, 246, 0.4)' : 'none'
        }}
      />
    </div>
  )
}
