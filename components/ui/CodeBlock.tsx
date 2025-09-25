import { ReactNode } from 'react'

interface CodeBlockProps {
  children: ReactNode
  className?: string
}

export default function CodeBlock({ children, className = '' }: CodeBlockProps) {
  return (
    <div className={`bg-gray-50 border border-gray-200 rounded-lg p-4 ${className}`}>
      <pre className='text-sm text-gray-800 overflow-x-auto'>
        <code>{children}</code>
      </pre>
    </div>
  )
}

interface InlineCodeProps {
  children: ReactNode
}

export function InlineCode({ children }: InlineCodeProps) {
  return (
    <span className='bg-gray-100 px-2 py-1 rounded text-xs font-mono'>
      {children}
    </span>
  )
}