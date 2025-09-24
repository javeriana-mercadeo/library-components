'use client'

import React, { memo } from 'react'
import PropTypes from 'prop-types'
import UniversalComponent from './UniversalComponent'

/**
 * Componente de sección universal que simplifica la creación de secciones repetitivas
 * Incluye contenedor, título, párrafo, botones y manejo de scripts automático
 */
<<<<<<< HEAD
const UniversalSection = memo(({
  id,
  className = '',
  children,
  
  // Container props
  containerProps = {},
  background = 'default',
  padding = 'default',
  maxWidth = '7xl',
  
  // Header props
  title,
  titleProps = {},
  subtitle,
  subtitleProps = {},
  description,
  descriptionProps = {},
  
  // Content props
  content,
  contentClassName = '',
  
  // Action props
  actions = [],
  actionsPosition = 'center',
  
  // Layout props
  layout = 'default', // 'default', 'centered', 'split', 'hero'
  
  // Script handling
  script,
  info,
  styles,
  
  // Accessibility
  role = 'section',
  ariaLabel,
  
  ...otherProps
}) => {
  // Initialize script on mount
  React.useEffect(() => {
    if (script && typeof script === 'function') {
      script()
    }
  }, [script])
  
  // Build section classes
  const sectionClasses = [
    'universal-section',
    `universal-section--${layout}`,
    `universal-section--bg-${background}`,
    `universal-section--padding-${padding}`,
    className
  ].filter(Boolean).join(' ')
  
  // Build container classes
  const containerClasses = [
    'universal-section__container',
    `max-w-${maxWidth}`,
    'mx-auto',
    containerProps.className
  ].filter(Boolean).join(' ')
  
  // Build actions classes
  const actionsClasses = [
    'universal-section__actions',
    `universal-section__actions--${actionsPosition}`
  ].filter(Boolean).join(' ')
  
  return (
    <section 
      id={id}
      className={sectionClasses}
      role={role}
      aria-label={ariaLabel}
      {...otherProps}
    >
      {/* Load styles if provided */}
      {styles && (
        <style jsx>{styles}</style>
      )}
      
      <div 
        {...containerProps}
        className={containerClasses}
      >
        {/* Header Section */}
        {(title || subtitle || description) && (
          <div className="universal-section__header">
            {title && (
              <UniversalComponent
                type="title"
                hierarchy="h2"
                size="2xl"
                weight="bold"
                align="center"
                className="universal-section__title"
                {...titleProps}
              >
                {title}
              </UniversalComponent>
            )}
            
            {subtitle && (
              <UniversalComponent
                type="title"
                hierarchy="h3"
                size="lg"
                weight="medium"
                align="center"
                color="secondary"
                className="universal-section__subtitle"
                {...subtitleProps}
              >
                {subtitle}
              </UniversalComponent>
            )}
            
            {description && (
              <UniversalComponent
                type="paragraph"
                size="lg"
                align="center"
                color="neutral"
                className="universal-section__description"
                {...descriptionProps}
              >
                {description}
              </UniversalComponent>
            )}
          </div>
        )}
        
        {/* Content Section */}
        {(content || children) && (
          <div className={`universal-section__content ${contentClassName}`}>
            {content && (
              <div className="universal-section__text-content">
                {typeof content === 'string' ? (
                  <UniversalComponent type="paragraph" size="md">
                    {content}
                  </UniversalComponent>
                ) : (
                  content
                )}
              </div>
            )}
            {children}
          </div>
        )}
        
        {/* Actions Section */}
        {actions.length > 0 && (
          <div className={actionsClasses}>
            {actions.map((action, index) => (
              <UniversalComponent
                key={index}
                type="button"
                variant={action.variant || 'primary'}
                size={action.size || 'md'}
                href={action.href}
                onClick={action.onClick}
                disabled={action.disabled}
                loading={action.loading}
                className={action.className}
                {...action.props}
              >
                {action.icon && (
                  <UniversalComponent
                    type="icon"
                    icon={action.icon}
                    iconSize={action.iconSize || 16}
                  />
                )}
                {action.text || action.children}
              </UniversalComponent>
            ))}
          </div>
        )}
      </div>
    </section>
  )
})
=======
const UniversalSection = memo(
  ({
    id,
    className = '',
    children,

    // Container props
    containerProps = {},
    background = 'default',
    padding = 'default',
    maxWidth = '7xl',

    // Header props
    title,
    titleProps = {},
    subtitle,
    subtitleProps = {},
    description,
    descriptionProps = {},

    // Content props
    content,
    contentClassName = '',

    // Action props
    actions = [],
    actionsPosition = 'center',

    // Layout props
    layout = 'default', // 'default', 'centered', 'split', 'hero'

    // Script handling
    script,
    info,
    styles,

    // Accessibility
    role = 'section',
    ariaLabel,

    ...otherProps
  }) => {
    // Initialize script on mount
    React.useEffect(() => {
      if (script && typeof script === 'function') {
        script()
      }
    }, [script])

    // Build section classes
    const sectionClasses = [
      'universal-section',
      `universal-section--${layout}`,
      `universal-section--bg-${background}`,
      `universal-section--padding-${padding}`,
      className
    ]
      .filter(Boolean)
      .join(' ')

    // Build container classes
    const containerClasses = ['universal-section__container', `max-w-${maxWidth}`, 'mx-auto', containerProps.className]
      .filter(Boolean)
      .join(' ')

    // Build actions classes
    const actionsClasses = ['universal-section__actions', `universal-section__actions--${actionsPosition}`].filter(Boolean).join(' ')

    return (
      <section id={id} className={sectionClasses} role={role} aria-label={ariaLabel} {...otherProps}>
        {/* Load styles if provided */}
        {styles && <style jsx>{styles}</style>}

        <div {...containerProps} className={containerClasses}>
          {/* Header Section */}
          {(title || subtitle || description) && (
            <div className='universal-section__header'>
              {title && (
                <UniversalComponent
                  type='title'
                  hierarchy='h2'
                  size='2xl'
                  weight='bold'
                  align='center'
                  className='universal-section__title'
                  {...titleProps}>
                  {title}
                </UniversalComponent>
              )}

              {subtitle && (
                <UniversalComponent
                  type='title'
                  hierarchy='h3'
                  size='lg'
                  weight='medium'
                  align='center'
                  color='secondary'
                  className='universal-section__subtitle'
                  {...subtitleProps}>
                  {subtitle}
                </UniversalComponent>
              )}

              {description && (
                <UniversalComponent
                  type='paragraph'
                  size='lg'
                  align='center'
                  color='neutral'
                  className='universal-section__description'
                  {...descriptionProps}>
                  {description}
                </UniversalComponent>
              )}
            </div>
          )}

          {/* Content Section */}
          {(content || children) && (
            <div className={`universal-section__content ${contentClassName}`}>
              {content && (
                <div className='universal-section__text-content'>
                  {typeof content === 'string' ? (
                    <UniversalComponent type='paragraph' size='md'>
                      {content}
                    </UniversalComponent>
                  ) : (
                    content
                  )}
                </div>
              )}
              {children}
            </div>
          )}

          {/* Actions Section */}
          {actions.length > 0 && (
            <div className={actionsClasses}>
              {actions.map((action, index) => (
                <UniversalComponent
                  key={index}
                  type='button'
                  variant={action.variant || 'primary'}
                  size={action.size || 'md'}
                  href={action.href}
                  onClick={action.onClick}
                  disabled={action.disabled}
                  loading={action.loading}
                  className={action.className}
                  {...action.props}>
                  {action.icon && <UniversalComponent type='icon' icon={action.icon} iconSize={action.iconSize || 16} />}
                  {action.text || action.children}
                </UniversalComponent>
              ))}
            </div>
          )}
        </div>
      </section>
    )
  }
)
>>>>>>> 2605cab52aa8312d63618e4bc012d1168c315cb3

UniversalSection.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
<<<<<<< HEAD
  
=======

>>>>>>> 2605cab52aa8312d63618e4bc012d1168c315cb3
  // Container props
  containerProps: PropTypes.object,
  background: PropTypes.oneOf(['default', 'light', 'dark', 'primary', 'secondary', 'accent']),
  padding: PropTypes.oneOf(['none', 'sm', 'default', 'lg', 'xl']),
  maxWidth: PropTypes.oneOf(['sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', 'full']),
<<<<<<< HEAD
  
=======

>>>>>>> 2605cab52aa8312d63618e4bc012d1168c315cb3
  // Header props
  title: PropTypes.string,
  titleProps: PropTypes.object,
  subtitle: PropTypes.string,
  subtitleProps: PropTypes.object,
  description: PropTypes.string,
  descriptionProps: PropTypes.object,
<<<<<<< HEAD
  
  // Content props
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  contentClassName: PropTypes.string,
  
  // Action props
  actions: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string,
    children: PropTypes.node,
    variant: PropTypes.string,
    size: PropTypes.string,
    href: PropTypes.string,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    loading: PropTypes.bool,
    className: PropTypes.string,
    icon: PropTypes.node,
    iconSize: PropTypes.number,
    props: PropTypes.object
  })),
  actionsPosition: PropTypes.oneOf(['left', 'center', 'right', 'space-between']),
  
  // Layout props
  layout: PropTypes.oneOf(['default', 'centered', 'split', 'hero']),
  
=======

  // Content props
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  contentClassName: PropTypes.string,

  // Action props
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      children: PropTypes.node,
      variant: PropTypes.string,
      size: PropTypes.string,
      href: PropTypes.string,
      onClick: PropTypes.func,
      disabled: PropTypes.bool,
      loading: PropTypes.bool,
      className: PropTypes.string,
      icon: PropTypes.node,
      iconSize: PropTypes.number,
      props: PropTypes.object
    })
  ),
  actionsPosition: PropTypes.oneOf(['left', 'center', 'right', 'space-between']),

  // Layout props
  layout: PropTypes.oneOf(['default', 'centered', 'split', 'hero']),

>>>>>>> 2605cab52aa8312d63618e4bc012d1168c315cb3
  // Script handling
  script: PropTypes.func,
  info: PropTypes.object,
  styles: PropTypes.string,
<<<<<<< HEAD
  
=======

>>>>>>> 2605cab52aa8312d63618e4bc012d1168c315cb3
  // Accessibility
  role: PropTypes.string,
  ariaLabel: PropTypes.string
}

UniversalSection.displayName = 'UniversalSection'

<<<<<<< HEAD
export default UniversalSection
=======
export default UniversalSection
>>>>>>> 2605cab52aa8312d63618e4bc012d1168c315cb3
