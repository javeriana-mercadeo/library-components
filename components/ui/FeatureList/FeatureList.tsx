interface FeatureItem {
  text: string
  icon?: string
}

interface FeatureListProps {
  items: FeatureItem[]
  iconColor?: string
  type?: 'allowed' | 'forbidden' | 'default'
  className?: string
}

export default function FeatureList({ items, iconColor, type = 'default', className = '' }: FeatureListProps) {
  const getIconAndColor = () => {
    if (iconColor) {
      return { icon: 'check', color: iconColor }
    }

    switch (type) {
      case 'allowed':
        return { icon: 'check', color: 'green' }
      case 'forbidden':
        return { icon: 'x', color: 'red' }
      default:
        return { icon: 'check', color: 'gray' }
    }
  }

  const { icon: defaultIcon, color } = getIconAndColor()

  return (
    <ul className={`space-y-3 text-sm ${className}`}>
      {items.map((item, index) => (
        <li key={index} className={`flex items-center gap-3 text-${color}-700`}>
          <i className={`ph ph-${item.icon || defaultIcon} text-${color}-500 flex-shrink-0`} />
          {item.text}
        </li>
      ))}
    </ul>
  )
}
