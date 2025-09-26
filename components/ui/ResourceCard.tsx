import Link from 'next/link'

interface ResourceLink {
  label: string
  href: string
}

interface ResourceCardProps {
  title: string
  icon: string
  iconColor: 'blue' | 'gray' | 'green' | 'red' | 'yellow'
  iconBgColor: 'blue' | 'gray' | 'green' | 'red' | 'yellow'
  links: ResourceLink[]
}

export default function ResourceCard({ title, icon, iconColor, iconBgColor, links }: ResourceCardProps) {
  const iconColors = {
    blue: 'text-blue-600',
    gray: 'text-gray-600',
    green: 'text-green-600',
    red: 'text-red-600',
    yellow: 'text-yellow-600'
  }

  const bgColors = {
    blue: 'bg-blue-100',
    gray: 'bg-gray-100',
    green: 'bg-green-100',
    red: 'bg-red-100',
    yellow: 'bg-yellow-100'
  }

  return (
    <div className='bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow'>
      <div className={`w-10 h-10 ${bgColors[iconBgColor]} rounded-lg flex items-center justify-center mb-4`}>
        <i className={`ph ph-${icon} ${iconColors[iconColor]} text-lg`} />
      </div>
      <h3 className='text-lg font-semibold text-gray-800 mb-3'>{title}</h3>
      <ul className='space-y-2'>
        {links.map((link, index) => (
          <li key={index}>
            <Link className='text-blue-600 hover:underline text-sm flex items-center gap-2' href={link.href}>
              <i className='ph ph-arrow-square-out text-xs' />
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
