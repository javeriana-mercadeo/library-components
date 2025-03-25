'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu as NavbarMenuHero,
  NavbarMenuItem
} from '@heroui/react'

import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from '@heroui/react'
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

  // Opciones del menú "Landings"
  const landingItems = [
    { key: 'pre', label: 'Pregrado', url: '/landing/pregrado' },
    { key: 'maestria', label: 'Maestría y Especialización', url: '/landing/maestria-especializacion' },
    { key: 'doctorado', label: 'Doctorado', url: '/landing/doctorado' },
    { key: 'mba', label: 'MBA', url: '/landing/mba' },
    { key: 'eclesiastico', label: 'Eclesiástico', url: '/landing/eclesiastico' }
  ]

  // Única opción del menú "Institucional"
  const institucionalItems = [{ key: 'articulos', label: 'Artículos', url: '/institutional/articles' }]

  const menuItems = ['Inicio', 'Páginas', 'Fragmentos', 'Formularios']

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      {/* Logo y menú toggle */}
      <NavbarContent>
        <NavbarMenuToggle aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} className="sm:hidden" />
        <NavbarBrand>
          <figure className="flex gap-2 items-center">
            <Image alt="ACME" className="h-8 w-8" src={logo} width={32} height={32} />
            <p className="text-inherit font-bold">Biblioteca de componentes</p>
          </figure>
        </NavbarBrand>
      </NavbarContent>

      {/* Menú principal */}
      <NavbarContent className="gap-4 hidden sm:flex" justify="center">
        <NavbarItem>
          <Link href="/">
            <Button variant="light">Inicio</Button>
          </Link>
        </NavbarItem>

        {/* Menú Landings */}
        <NavbarItem>
          <Dropdown>
            <DropdownTrigger>
              <Button variant="light">Landings</Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Landings" items={landingItems}>
              {item => (
                <DropdownItem key={item.key}>
                  <Link href={item.url}>{item.label}</Link>
                </DropdownItem>
              )}
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>

        {/* Menú Institucional con un solo elemento */}
        <NavbarItem>
          <Dropdown>
            <DropdownTrigger>
              <Button variant="light">Institucional</Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Institucional" items={institucionalItems}>
              {item => (
                <DropdownItem key={item.key}>
                  <Link href={item.url}>{item.label}</Link>
                </DropdownItem>
              )}
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
      </NavbarContent>

      {/* Switch de Tema */}
      <ThemeSwitch />

      {/* Menú Responsive */}
      <NavbarMenuHero>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link className="w-full" href="#">
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenuHero>
    </Navbar>
  )
}

export default Header
