interface InfoCardItem {
  text: string
  icon?: string
}

interface InfoCardProps {
  title: string
  icon: string
  items: InfoCardItem[]
  borderColor?: string
  iconColor?: string
}

export default function InfoCard({ title, icon, items, borderColor = 'gray', iconColor = 'gray' }: InfoCardProps) {
  return (
    <div className={`bg-white border border-${borderColor}-200 rounded-lg p-4`}>
      <div className='flex items-center gap-2 mb-3'>
        <i className={`ph ph-${icon} text-${iconColor}-600`} />
        <h4 className='font-semibold text-gray-800'>{title}</h4>
      </div>
      <ul className='space-y-2 text-sm text-gray-600'>
        {items.map((item, index) => (
          <li key={index} className='flex items-center gap-2'>
            <i className={`ph ph-${item.icon || 'dot-outline'} text-${iconColor}-500 text-sm`} />
            {item.text}
          </li>
        ))}
      </ul>
    </div>
  )
}
