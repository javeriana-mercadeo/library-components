'use client'

import { useEffect } from 'react'
import Btn from '@library/components/buttons/btn_general'
import Container from '@library/components/container/Container'

import logo from '../../../../../assets/logos/logo-jave-h-blue.svg'
import logoDark from '../../../../../assets/logos/logo-jave-h-white.svg'
import script from './script.js'

import './styles.scss'

const MateriasSemestre = () => {
    // Ejecutar el script cuando el componente se monta
        useEffect(() => {
        script()
    }, [])

    return (
        <section id="section-two" className='section-dos'>
            <h2 className="text-align-movil subjects-carousel__title">Materias por Semestre</h2>
        </section>
    )
}
export default MateriasSemestre