'use client'

import { Card, CardBody, CardFooter, Button } from '@heroui/react'

export interface Component {
  name: string
  section: string
  icon: string
}

interface ComponentCardProps {
  component: Component
  onNavigate: (section: string) => void
  size?: 'sm' | 'md' | 'lg'
}

export default function ComponentCard({ component, onNavigate, size = 'lg' }: ComponentCardProps) {
  const paddingSize = size === 'sm' ? 'p-5' : 'p-6'
  const iconSize = size === 'sm' ? 'text-xl' : 'text-2xl'
  const titleSize = size === 'sm' ? 'text-lg' : 'text-xl'
  const descriptionSize = size === 'sm' ? 'text-xs' : 'text-sm'

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardBody className={paddingSize}>
        <div className="flex items-center gap-3">
          <div className="bg-primary-100 text-primary-500 p-3 rounded-lg">
            <i className={`ph ${component.icon} ${iconSize}`}></i>
          </div>
          <div>
            <h3 className={`${titleSize} font-semibold`}>{component.name}</h3>
            <p className={`text-gray-500 ${descriptionSize} truncate`}>{component.section}</p>
          </div>
        </div>
      </CardBody>
      <CardFooter className="bg-gray-50 border-t border-gray-200 flex justify-end">
        <Button color="primary" variant="flat" onClick={() => onNavigate(component.section)} size={size === 'sm' ? 'sm' : 'md'}>
          Ver componente
          <i className="ph ph-arrow-right ml-2"></i>
        </Button>
      </CardFooter>
    </Card>
  )
}
