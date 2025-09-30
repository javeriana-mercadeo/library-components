interface TechStackItem {
  category: string
  description: string
  technologies: Array<{
    name: string
    color: string
  }>
}

interface TechStackCardProps {
  title: string
  icon: string
  iconColor?: string
  items: TechStackItem[]
}

export default function TechStackCard({ title, icon, iconColor = 'gray', items }: TechStackCardProps) {
  return (
    <div className='bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm'>
      <div className={`bg-${iconColor}-50 px-4 py-3 border-b border-gray-200`}>
        <h3 className='text-base font-semibold text-gray-800 flex items-center gap-2'>
          <i className={`ph ph-${icon} text-${iconColor}-600 text-sm`} />
          {title}
        </h3>
      </div>
      <div className='p-4 space-y-4'>
        {items.map((item, index) => (
          <div key={index}>
            <h4 className='font-medium text-gray-800 mb-2'>{item.category}</h4>
            <p dangerouslySetInnerHTML={{ __html: item.description }} className='text-sm text-gray-600 mb-2' />
            <div className='flex flex-wrap gap-1'>
              {item.technologies.map((tech, techIndex) => (
                <span key={techIndex} className={`px-2 py-1 bg-${tech.color}-100 text-${tech.color}-800 text-xs font-medium rounded`}>
                  {tech.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
