'use client'

import { Card, CardBody, CardFooter, Button } from '@heroui/react'
import Link from 'next/link'

export interface Page {
  name: string
  path: string
  icon: string
}

interface PageCardProps {
  page: Page
  description: string
}

export default function PageCard({ page, description }: PageCardProps) {
  return (
    <Card className='hover:shadow-md transition-shadow'>
      <CardBody className='p-6'>
        <div className='flex items-center gap-3'>
          <div className='bg-primary-100 text-primary-500 p-4 rounded-lg'>
            <i className={`ph ${page.icon} text-2xl`} />
          </div>
          <div>
            <h3 className='text-xl font-semibold'>{page.name}</h3>
            <p className='text-gray-500 text-sm'>{description}</p>
          </div>
        </div>
      </CardBody>
      <CardFooter className='bg-gray-50 border-t border-gray-200 flex justify-end'>
        <Link href={page.path}>
          <Button color='primary' variant='flat'>
            Ver página
            <i className='ph ph-arrow-right ml-2' />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}