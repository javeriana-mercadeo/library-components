interface EnvironmentCardProps {
  title: string
  description: string
  url: string
  icon: string
  iconColor?: string
}

export default function EnvironmentCard({ title, description, url, icon, iconColor = 'gray' }: EnvironmentCardProps) {
  return (
    <div className='bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm'>
      <div className={`bg-${iconColor}-50 px-4 py-3 border-b border-gray-200`}>
        <h3 className='text-base font-semibold text-gray-800 flex items-center gap-2'>
          <i className={`ph ph-${icon} text-${iconColor}-600 text-sm`} />
          {title}
        </h3>
      </div>
      <div className='p-4'>
        <p className='text-sm text-gray-600 mb-3'>{description}</p>
        <div className='bg-gray-50 border border-gray-200 rounded-lg p-3 font-mono text-sm break-all'>
          <span className='text-gray-800'>{url}</span>
        </div>
      </div>
    </div>
  )
}
