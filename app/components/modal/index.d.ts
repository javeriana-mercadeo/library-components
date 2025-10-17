import { ReactNode } from 'react'

export interface ModalProps {
  /**
   * ID único del modal
   * @default 'modal'
   */
  id?: string

  /**
   * Clases adicionales para el overlay
   */
  className?: string

  /**
   * Contenido del modal
   */
  children: ReactNode

  /**
   * Elemento que abre el modal
   */
  trigger?: ReactNode

  /**
   * Abrir automáticamente al cargar
   * @default false
   */
  autoOpen?: boolean

  /**
   * Cerrar al hacer click fuera del contenido
   * @default true
   */
  closeOnOverlayClick?: boolean

  /**
   * Cerrar con tecla Escape
   * @default true
   */
  closeOnEsc?: boolean

  /**
   * Mostrar botón X de cerrar
   * @default true
   */
  showCloseButton?: boolean

  /**
   * Callback al abrir el modal
   */
  onOpen?: () => void

  /**
   * Callback al cerrar el modal
   */
  onClose?: () => void

  /**
   * Tamaño del modal
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'

  /**
   * Clases adicionales para el contenido
   */
  contentClassName?: string

  /**
   * Centrado verticalmente
   * @default true
   */
  centered?: boolean

  /**
   * Modo estático para ViewComponent de Liferay
   * @default false
   */
  staticMode?: boolean

  /**
   * Otras props adicionales para el overlay
   */
  [key: string]: any
}

/**
 * Modal - Componente reutilizable estilo Bootstrap para múltiples instancias
 */
export function Modal(props: ModalProps): JSX.Element

export default Modal
