interface SectionCardProps {
  title: string
  icon: string
  iconColor?: string
  children: React.ReactNode
  className?: string
}

export default function SectionCard({ title, icon, iconColor = 'gray', children, className = '' }: SectionCardProps) {
  return (
    <div className={`bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm ${className}`}>
      <div className={`bg-${iconColor}-50 px-4 py-3 border-b border-gray-200`}>
        <h3 className='text-base font-semibold text-gray-800 flex items-center gap-2'>
          <i className={`ph ph-${icon} text-${iconColor}-600 text-sm`} />
          {title}
        </h3>
      </div>
      <div className='p-6'>{children}</div>
    </div>
  )
}
