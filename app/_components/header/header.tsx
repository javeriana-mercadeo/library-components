'use client'

import { useEffect, useState } from 'react'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu as NavbarMenuHero,
  NavbarMenuItem,
  Link
} from '@heroui/react'

import Image from 'next/image'
import logo from '../../../assets/icon.svg'
import { ThemeSwitch } from '@/app/_components/themeSwitch/theme-switch'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  const menuItems = ['Inicio', 'Páginas', 'Fragmentos', 'Formularios']

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} className="sm:hidden" />
        <NavbarBrand>
          <figure className="flex items-center gap-2">
            <Image alt="ACME" className="h-8 w-8" src={logo} width={32} height={32} />
            <p className="font-bold text-inherit"> Biblioteca de componentes</p>
          </figure>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
            Inicio
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link aria-current="page" href="#">
            Páginas
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Fragmentos
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Formularios
          </Link>
        </NavbarItem>
      </NavbarContent>

      <ThemeSwitch />

      <NavbarMenuHero>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color={index === 2 ? 'primary' : index === menuItems.length - 1 ? 'danger' : 'foreground'}
              href="#"
              size="lg">
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenuHero>
    </Navbar>
  )
}

export default Header
