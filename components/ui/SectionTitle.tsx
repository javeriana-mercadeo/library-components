interface SectionTitleProps {
  title: string
  description?: string
  className?: string
}

export default function SectionTitle({ title, description, className = '' }: SectionTitleProps) {
  return (
    <div className={`text-center ${className}`}>
      <h2 className='text-xl font-bold text-gray-800 mb-2'>{title}</h2>
      {description && <p className='text-sm text-gray-600'>{description}</p>}
    </div>
  )
}