import './btnLink.scss'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'lfr-editable': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & { type?: string }, HTMLElement>
    }
  }
}

interface BtnLinkProps {
  children?: React.ReactNode
  className?: string
  link?: string
  id?: string
}

const BtnLink: React.FC<BtnLinkProps> = ({ children = 'Ver más', className, link = '#', id }) => {
  return (
    <div className={`btn btn-link ${className || ''}`}>
      <lfr-editable id={`button-link-${id}`} type="rich-text">
        <a href={link}>{children}</a>
      </lfr-editable>
    </div>
  )
}

export default BtnLink
