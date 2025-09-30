import { Card, CardBody, Avatar } from '@heroui/react'

interface TeamCardProps {
  name: string
  role: string
  description: string
  avatarColor: 'blue' | 'green' | 'purple' | 'red' | 'yellow'
}

export default function TeamCard({ name, role, description, avatarColor }: TeamCardProps) {
  const colorClasses = {
    blue: 'bg-gradient-to-br from-blue-400 to-blue-600',
    green: 'bg-gradient-to-br from-green-400 to-green-600',
    purple: 'bg-gradient-to-br from-purple-400 to-purple-600',
    red: 'bg-gradient-to-br from-red-400 to-red-600',
    yellow: 'bg-gradient-to-br from-yellow-400 to-yellow-600'
  }

  return (
    <Card className='shadow-md'>
      <CardBody className='text-center'>
        <Avatar
          className='mx-auto mb-4'
          classNames={{
            base: colorClasses[avatarColor]
          }}
          name={name}
          size='lg'
        />
        <h3 className='font-semibold text-gray-800 mb-2'>{role}</h3>
        <p className='text-gray-600 text-sm'>{description}</p>
      </CardBody>
    </Card>
  )
}
