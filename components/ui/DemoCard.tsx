import { Card, CardHeader, CardBody, CardFooter, Chip, Button, Image } from '@heroui/react'
import Link from 'next/link'
import { ReactNode } from 'react'

interface DemoCardProps {
  title: string
  icon: string
  description: string
  route: string
  image?: string // New optional image prop
  chips: Array<{
    label: string
    color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
    variant?: 'solid' | 'bordered' | 'light' | 'flat' | 'faded' | 'shadow'
  }>
  children?: ReactNode
}

export default function DemoCard({ title, icon, description, route, image, chips, children }: DemoCardProps) {
  return (
    <Card
      className='
        group
        max-w-sm
        bg-white
        shadow-md
        hover:shadow-lg
        transition-all
        duration-300
        ease-out
        hover:-translate-y-1
        border-0
        rounded-xl
        overflow-hidden
      '
      isPressable
    >
      {/* Image Section */}
      <div className='relative overflow-hidden'>
        <div className='aspect-[16/10] bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 relative'>
          {image ? (
            <Image
              src={image}
              alt={title}
              className='object-cover w-full h-full'
              classNames={{
                img: 'transition-transform duration-300 group-hover:scale-105'
              }}
            />
          ) : (
            <div className='w-full h-full flex items-center justify-center'>
              <div className='text-center'>
                <div className='
                  w-16 h-16
                  bg-white/80
                  rounded-full
                  flex items-center justify-center
                  mb-3
                  shadow-sm
                  group-hover:shadow-md
                  transition-all duration-300
                '>
                  <i className={`ph ph-${icon} text-2xl text-slate-600`} />
                </div>
                <div className='px-4'>
                  <div className='w-full h-2 bg-white/60 rounded-full mb-2'></div>
                  <div className='w-3/4 h-2 bg-white/40 rounded-full mx-auto'></div>
                </div>
              </div>
            </div>
          )}

          {/* Image Overlay for better text readability */}
          {image && (
            <div className='absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
          )}
        </div>
      </div>

      {/* Content Section */}
      <CardBody className='px-4 py-4 space-y-3'>
        {/* Title */}
        <div className='space-y-1'>
          <h3 className='text-lg font-semibold text-slate-800 leading-tight line-clamp-1'>
            {title}
          </h3>
          <p className='text-sm text-slate-500 leading-relaxed line-clamp-2'>
            {description}
          </p>
        </div>

        {/* Chips */}
        <div className='flex flex-wrap gap-1.5 pt-1'>
          {chips.map((chip, index) => (
            <Chip
              key={index}
              size='sm'
              radius='md'
              color={chip.color || 'default'}
              variant={chip.variant || 'flat'}
              classNames={{
                base: 'h-6 px-2',
                content: 'text-xs font-medium'
              }}
            >
              {chip.label}
            </Chip>
          ))}
        </div>

        {children}
      </CardBody>

      {/* Action Section */}
      <CardFooter className='px-4 pb-4 pt-0'>
        <Link href={route} className='w-full'>
          <Button
            color='primary'
            variant='flat'
            size='sm'
            fullWidth
            radius='lg'
            endContent={<i className='ph ph-arrow-right text-sm' />}
            className='
              font-medium
              bg-primary/10
              text-primary-600
              hover:bg-primary/20
              border-0
              transition-all duration-200
            '
          >
            Ver Demo
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}