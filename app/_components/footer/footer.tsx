import Logo from '@library/components/logo_institucional'

const Footer = () => {
  return (
    <footer className="bg-[var(--background-200)] text-[var(--neutral-200)] pb-8">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="flex justify-center sm:justify-start">
            <Logo />
          </div>

          <p className="mt-4 text-center text-sm text-[var(--neutral-200)] lg:mt-0 lg:text-right">
            Copyright &copy; 2025. Pontificia Universidad Javeriana, Derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
