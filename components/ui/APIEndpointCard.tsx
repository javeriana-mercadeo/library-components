import { InlineCode } from './CodeBlock'

interface APIEndpoint {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  path: string
  description: string
  parameters?: string[]
}

interface APIEndpointCardProps {
  title: string
  icon: string
  iconColor?: string
  endpoints: APIEndpoint[]
}

export default function APIEndpointCard({ title, icon, iconColor = 'gray', endpoints }: APIEndpointCardProps) {
  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET':
        return 'blue'
      case 'POST':
        return 'orange'
      case 'PUT':
        return 'green'
      case 'DELETE':
        return 'red'
      default:
        return 'gray'
    }
  }

  return (
    <div className='bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm'>
      <div className={`bg-${iconColor}-50 px-4 py-3 border-b border-gray-200`}>
        <h3 className='text-base font-semibold text-gray-800 flex items-center gap-2'>
          <i className={`ph ph-${icon} text-${iconColor}-600 text-sm`} />
          {title}
        </h3>
      </div>
      <div className='p-4'>
        <div className='space-y-4'>
          {endpoints.map((endpoint, index) => (
            <div key={index} className='bg-gray-50 rounded-lg p-4'>
              <div className='flex items-center gap-2 mb-2'>
                <span
                  className={`px-2 py-1 bg-${getMethodColor(endpoint.method)}-100 text-${getMethodColor(endpoint.method)}-800 text-xs font-mono rounded`}>
                  {endpoint.method}
                </span>
                <InlineCode>{endpoint.path}</InlineCode>
              </div>
              <p className='text-sm text-gray-600 mb-2'>{endpoint.description}</p>
              {endpoint.parameters && endpoint.parameters.length > 0 && (
                <div className='flex flex-wrap gap-1'>
                  {endpoint.parameters.map((param, paramIndex) => (
                    <span key={paramIndex} className='px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded'>
                      {param}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
