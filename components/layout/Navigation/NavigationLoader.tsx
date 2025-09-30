'use client'

import LoadingBar from '../../common/LoadingBar'

import { useNavigationLoading } from '@/hooks/useNavigationLoading'

export default function NavigationLoader() {
  const { isLoading } = useNavigationLoading()

  return <LoadingBar isLoading={isLoading} />
}
