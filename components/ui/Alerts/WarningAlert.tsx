interface WarningAlertProps {
  type?: 'warning' | 'info' | 'error' | 'success'
  title: string
  icon?: string
  children: React.ReactNode
  className?: string
}

export default function WarningAlert({ type = 'warning', title, icon, children, className = '' }: WarningAlertProps) {
  const getColors = () => {
    switch (type) {
      case 'warning':
        return {
          bg: 'bg-yellow-50',
          border: 'border-yellow-400',
          iconColor: 'text-yellow-600',
          titleColor: 'text-yellow-800',
          textColor: 'text-yellow-700'
        }
      case 'info':
        return {
          bg: 'bg-blue-50',
          border: 'border-blue-400',
          iconColor: 'text-blue-600',
          titleColor: 'text-blue-800',
          textColor: 'text-blue-700'
        }
      case 'error':
        return {
          bg: 'bg-red-50',
          border: 'border-red-400',
          iconColor: 'text-red-600',
          titleColor: 'text-red-800',
          textColor: 'text-red-700'
        }
      case 'success':
        return {
          bg: 'bg-green-50',
          border: 'border-green-400',
          iconColor: 'text-green-600',
          titleColor: 'text-green-800',
          textColor: 'text-green-700'
        }
      default:
        return {
          bg: 'bg-gray-50',
          border: 'border-gray-400',
          iconColor: 'text-gray-600',
          titleColor: 'text-gray-800',
          textColor: 'text-gray-700'
        }
    }
  }

  const colors = getColors()
  const defaultIcon = type === 'warning' ? 'warning-circle' : type === 'info' ? 'info' : type === 'error' ? 'x-circle' : 'check-circle'

  return (
    <div className={`${colors.bg} border-l-4 ${colors.border} p-4 rounded-r-lg ${className}`}>
      <div className='flex items-start gap-3'>
        <i className={`ph ph-${icon || defaultIcon} ${colors.iconColor} text-xl flex-shrink-0 mt-1`} />
        <div>
          <h3 className={`text-base font-semibold ${colors.titleColor} mb-2`}>{title}</h3>
          <div className={colors.textColor}>{children}</div>
        </div>
      </div>
    </div>
  )
}
