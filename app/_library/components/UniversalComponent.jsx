'use client'

import React, { memo } from 'react'
import PropTypes from 'prop-types'

/**
 * Componente universal que consolida title, paragraph, button, icon, image, y caption
 * Reduce la cantidad de componentes separados y mejora el rendimiento
 */
const UniversalComponent = memo(({
  type = 'div',
  id,
  elementId,
  className = '',
  children,
  
  // Text content props
  text,
  hierarchy = 'h2',
  size = 'md',
  color = 'neutral',
  align = 'left',
  weight = 'regular',
  
  // Style props
  uppercase = false,
  italic = false,
  bold = false,
  truncate = false,
  lineClamp,
  
  // Button props
  variant = 'primary',
  disabled = false,
  loading = false,
  fullWidth = false,
  
  // Image props
  src,
  alt = '',
  width,
  height,
  objectFit = 'cover',
  
  // Icon props
  icon,
  iconSize = 24,
  
  // Interaction props
  onClick,
  href,
  target,
  
  // Liferay props
  isEditable = true,
  
  ...otherProps
}) => {
  // Base element name for CSS classes
  const ELEMENT_NAME = type.toLowerCase()
  
  // Build CSS classes
  const classNames = [
    ELEMENT_NAME,
    color ? `${ELEMENT_NAME}-${color}` : null,
    size ? `${ELEMENT_NAME}-${size}` : null,
    align !== 'left' ? `${ELEMENT_NAME}-${align}` : null,
    weight !== 'regular' ? `${ELEMENT_NAME}-${weight}` : null,
    variant ? `${ELEMENT_NAME}-${variant}` : null,
    uppercase ? `${ELEMENT_NAME}-uppercase` : null,
    italic ? `${ELEMENT_NAME}-italic` : null,
    bold ? `${ELEMENT_NAME}-bold` : null,
    truncate ? `${ELEMENT_NAME}-truncate` : null,
    disabled ? `${ELEMENT_NAME}-disabled` : null,
    loading ? `${ELEMENT_NAME}-loading` : null,
    fullWidth ? `${ELEMENT_NAME}-full-width` : null,
    lineClamp && truncate ? `${ELEMENT_NAME}-clamp-${lineClamp}` : null,
    onClick || href ? `${ELEMENT_NAME}-clickable` : null,
    className
  ].filter(Boolean).join(' ')
  
  // Handle click events
  const handleClick = (event) => {
    if (disabled || loading) return
    if (onClick) onClick(event)
  }
  
  // Base props
  const baseProps = {
    ...otherProps,
    className: classNames,
    ...(elementId && { id: elementId }),
    ...(onClick && !href && { 
      onClick: handleClick, 
      role: 'button', 
      tabIndex: disabled ? -1 : 0 
    }),
    ...(disabled && { 'aria-disabled': true }),
    ...(lineClamp && truncate && {
      style: {
        '--line-clamp': lineClamp,
        ...otherProps.style
      }
    })
  }
  
  // Liferay editable configuration
  if (isEditable && (type === 'title' || type === 'paragraph' || type === 'caption')) {
    const editableId = id ? `${ELEMENT_NAME}-${id}` : ELEMENT_NAME
    baseProps['data-lfr-editable-id'] = editableId
    baseProps['data-lfr-editable-type'] = type === 'title' ? 'text' : 'rich-text'
  }
  
  // Content to render
  const content = children || text
  
  // Render based on type
  switch (type) {
    case 'title':
    case 'h1':
    case 'h2':
    case 'h3':
    case 'h4':
    case 'h5':
    case 'h6':
      const TitleTag = type === 'title' ? hierarchy : type
      return <TitleTag {...baseProps}>{content}</TitleTag>
      
    case 'paragraph':
    case 'p':
      return isEditable ? (
        <lfr-editable id={baseProps['data-lfr-editable-id']} type="rich-text" {...baseProps}>
          {content}
        </lfr-editable>
      ) : (
        <p {...baseProps}>{content}</p>
      )
      
    case 'button':
      if (href) {
        return (
          <a href={href} target={target} {...baseProps}>
            {loading && <span className="spinner" />}
            {icon && <span className="icon" style={{ fontSize: iconSize }}>{icon}</span>}
            {content}
          </a>
        )
      }
      return (
        <button {...baseProps} disabled={disabled || loading}>
          {loading && <span className="spinner" />}
          {icon && <span className="icon" style={{ fontSize: iconSize }}>{icon}</span>}
          {content}
        </button>
      )
      
    case 'image':
    case 'img':
      return (
        <img 
          {...baseProps}
          src={src}
          alt={alt}
          width={width}
          height={height}
          style={{
            objectFit,
            ...baseProps.style
          }}
        />
      )
      
    case 'icon':
      return (
        <span 
          {...baseProps}
          style={{
            fontSize: iconSize,
            ...baseProps.style
          }}
        >
          {icon || content}
        </span>
      )
      
    case 'caption':
    case 'span':
      return <span {...baseProps}>{content}</span>
      
    case 'imageBackground':
      return (
        <div 
          {...baseProps}
          style={{
            backgroundImage: src ? `url(${src})` : undefined,
            backgroundSize: objectFit,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            ...baseProps.style
          }}
        >
          {content}
        </div>
      )
      
    default:
      const Tag = type
      return <Tag {...baseProps}>{content}</Tag>
  }
})

UniversalComponent.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string,
  elementId: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
  text: PropTypes.string,
  hierarchy: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']),
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl']),
  color: PropTypes.oneOf(['primary', 'secondary', 'tertiary', 'neutral', 'success', 'warning', 'danger']),
  align: PropTypes.oneOf(['left', 'center', 'right', 'justify']),
  weight: PropTypes.oneOf(['light', 'regular', 'medium', 'semibold', 'bold', 'extrabold']),
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'ghost', 'link']),
  uppercase: PropTypes.bool,
  italic: PropTypes.bool,
  bold: PropTypes.bool,
  truncate: PropTypes.bool,
  lineClamp: PropTypes.number,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  fullWidth: PropTypes.bool,
  src: PropTypes.string,
  alt: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  objectFit: PropTypes.oneOf(['cover', 'contain', 'fill', 'none', 'scale-down']),
  icon: PropTypes.node,
  iconSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onClick: PropTypes.func,
  href: PropTypes.string,
  target: PropTypes.string,
  isEditable: PropTypes.bool
}

UniversalComponent.displayName = 'UniversalComponent'

export default UniversalComponent