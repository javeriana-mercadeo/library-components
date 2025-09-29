interface PhaseCardProps {
  phase: string
  title: string
  description: string
  color?: string
}

export default function PhaseCard({ phase, title, description, color = 'gray' }: PhaseCardProps) {
  return (
    <div className='bg-white border border-gray-200 rounded-lg p-4 text-center'>
      <div className={`w-8 h-8 bg-${color}-100 rounded-full flex items-center justify-center mx-auto mb-2`}>
        <span className={`text-${color}-600 font-bold text-sm`}>{phase}</span>
      </div>
      <h4 className='font-semibold text-gray-800 text-sm mb-1'>{title}</h4>
      <p className='text-xs text-gray-600'>{description}</p>
    </div>
  )
}
