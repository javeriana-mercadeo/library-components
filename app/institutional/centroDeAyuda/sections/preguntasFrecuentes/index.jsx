import './styles.scss'

import React from 'react'

import Title from '@library/components/contain/title'
import Container from '@library/components/container'

const Index = () => {
  return (
    <section className="faq-section">
      <Container>
        <Title className="title-qf">Preguntas frecuentes</Title>

        <div className="faq-item-content">
          <div className="faq-item">
            <span id="icon-question1" data-lfr-editable-id="icon-question-1" data-lfr-editable-type="html">
              <i className="ph ph-pencil-simple-line iconsTitle"></i>
            </span>
            <Title className="sub-question" id="question1">
              ¿Cuáles son los pasos para inscribirme en la universidad?
            </Title>
            <a href="#" id="link-conoce-mas1">
              <span id="text-conoce-mas1" data-lfr-editable-id="link-conoce-mas-text-1" data-lfr-editable-type="text">
                Conoce más
              </span>
              <i className="ph ph-arrow-up-right"></i>
            </a>
          </div>

          <div className="faq-item">
            <span id="icon-question2" data-lfr-editable-id="icon-question-2" data-lfr-editable-type="html">
              <i className="ph ph-calendar-dots iconsTitle"></i>
            </span>
            <Title className="sub-question" id="question2">
              ¿Qué tipos de becas ofrece la Universidad Javeriana?
            </Title>
            <a href="#" id="link-conoce-mas2">
              <span id="text-conoce-mas2" data-lfr-editable-id="link-conoce-mas-text-2" data-lfr-editable-type="text">
                Conoce más
              </span>
              <i className="ph ph-arrow-up-right"></i>
            </a>
          </div>

          <div className="faq-item">
            <span id="icon-question3" data-lfr-editable-id="icon-question-3" data-lfr-editable-type="html">
              <i className="ph ph-telegram-logo iconsTitle"></i>
            </span>
            <Title className="sub-question" id="question3">
              ¿Cuáles son los requisitos para aplicar a un programa de movilidad internacional?
            </Title>
            <a href="#" id="link-conoce-mas3">
              <span id="text-conoce-mas3" data-lfr-editable-id="link-conoce-mas-text-3" data-lfr-editable-type="text">
                Conoce más
              </span>
              <i className="ph ph-arrow-up-right"></i>
            </a>
          </div>

          <div className="faq-item">
            <span id="icon-question4" data-lfr-editable-id="icon-question-4" data-lfr-editable-type="html">
              <i className="ph ph-currency-circle-dollar iconsTitle"></i>
            </span>
            <Title className="sub-question" id="question4">
              ¿Cuáles son las opciones de financiación para pagar la matrícula?
            </Title>
            <a href="#" id="link-conoce-mas4">
              <span id="text-conoce-mas4" data-lfr-editable-id="link-conoce-mas-text-4" data-lfr-editable-type="text">
                Conoce más
              </span>
              <i className="ph ph-arrow-up-right"></i>
            </a>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default Index
