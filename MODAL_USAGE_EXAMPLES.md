# 📘 Guía de Uso del Componente Modal

## Introducción

El componente `Modal` es un sistema de modales reutilizables estilo Bootstrap que permite crear múltiples instancias de modales en tu
aplicación.

## Importación

```jsx
import { Modal } from '@library/components'
```

---

## 1. Modal Básico con Trigger

La forma más simple: un botón que abre el modal.

```jsx
import { Modal, Button } from '@library/components'

function Example() {
  return (
    <Modal id='basic-modal' trigger={<Button>Abrir Modal</Button>}>
      <h2>¡Hola!</h2>
      <p>Este es un modal básico.</p>
    </Modal>
  )
}
```

---

## 2. Modal con Tamaños Diferentes

Usa la prop `size` para controlar el ancho del modal.

```jsx
// Tamaños disponibles: 'sm' | 'md' | 'lg' | 'xl' | 'full'

<Modal id='small-modal' size='sm' trigger={<Button>Modal Pequeño</Button>}>
  <p>Modal pequeño (400px)</p>
</Modal>

<Modal id='large-modal' size='lg' trigger={<Button>Modal Grande</Button>}>
  <p>Modal grande (900px)</p>
</Modal>

<Modal id='full-modal' size='full' trigger={<Button>Modal Pantalla Completa</Button>}>
  <p>Modal de pantalla completa (95vw x 95vh)</p>
</Modal>
```

---

## 3. Modal con Auto-open

Modal que se abre automáticamente al cargar la página.

```jsx
<Modal id='welcome-modal' autoOpen={true} trigger={<Button>Volver a abrir</Button>}>
  <h2>¡Bienvenido!</h2>
  <p>Este modal se abrió automáticamente.</p>
</Modal>
```

---

## 4. Modal con Callbacks

Ejecuta funciones cuando el modal se abre o cierra.

```jsx
function Example() {
  const handleOpen = () => {
    console.log('Modal abierto')
  }

  const handleClose = () => {
    console.log('Modal cerrado')
  }

  return (
    <Modal id='callback-modal' onOpen={handleOpen} onClose={handleClose} trigger={<Button>Abrir con Callbacks</Button>}>
      <p>Revisa la consola al abrir/cerrar</p>
    </Modal>
  )
}
```

**Escuchar eventos desde fuera del componente:**

```jsx
useEffect(() => {
  const handleModalOpened = e => {
    console.log('Modal abierto:', e.detail.modalId)
  }

  window.addEventListener('modal:opened', handleModalOpened)

  return () => {
    window.removeEventListener('modal:opened', handleModalOpened)
  }
}, [])
```

---

## 5. Modal sin Botón de Cerrar

Oculta el botón X del modal.

```jsx
<Modal id='no-close-button' showCloseButton={false} trigger={<Button>Modal sin X</Button>}>
  <p>Este modal no tiene botón de cerrar.</p>
  <p>Presiona Escape o haz click fuera para cerrar.</p>
</Modal>
```

---

## 6. Modal que no se Cierra al Hacer Click Fuera

```jsx
<Modal id='no-overlay-close' closeOnOverlayClick={false} trigger={<Button>Modal Persistente</Button>}>
  <h2>Modal Persistente</h2>
  <p>Solo se cierra con el botón X o la tecla Escape.</p>
</Modal>
```

---

## 7. Modal sin Escape

Desactiva el cierre con la tecla Escape.

```jsx
<Modal id='no-escape' closeOnEsc={false} trigger={<Button>Modal sin Escape</Button>}>
  <p>No se puede cerrar con la tecla Escape.</p>
</Modal>
```

---

## 8. Control Programático del Modal

Abre o cierra modales desde JavaScript usando eventos personalizados.

```jsx
import { openModalById, closeModalById, closeAll } from '@library/components/feedback/modal/script.js'

function Example() {
  const handleOpenModal = () => {
    // Opción 1: Usar la función exportada
    openModalById('modal-programmatic-overlay')

    // Opción 2: Usar evento personalizado
    window.dispatchEvent(
      new CustomEvent('modal:open', {
        detail: { modalId: 'modal-programmatic-overlay' }
      })
    )
  }

  const handleCloseModal = () => {
    // Opción 1: Usar la función exportada
    closeModalById('modal-programmatic-overlay')

    // Opción 2: Usar evento personalizado
    window.dispatchEvent(
      new CustomEvent('modal:close', {
        detail: { modalId: 'modal-programmatic-overlay' }
      })
    )
  }

  const handleCloseAll = () => {
    closeAll()
  }

  return (
    <div>
      <button onClick={handleOpenModal}>Abrir Modal Programáticamente</button>
      <button onClick={handleCloseModal}>Cerrar Modal</button>
      <button onClick={handleCloseAll}>Cerrar Todos</button>

      <Modal id='programmatic'>
        <h2>Modal controlado programáticamente</h2>
      </Modal>
    </div>
  )
}
```

---

## 9. Múltiples Modales en la Misma Página

```jsx
function Example() {
  return (
    <div>
      <Modal id='modal-1' trigger={<Button>Modal 1</Button>}>
        <h2>Primer Modal</h2>
      </Modal>

      <Modal id='modal-2' trigger={<Button>Modal 2</Button>}>
        <h2>Segundo Modal</h2>
      </Modal>

      <Modal id='modal-3' trigger={<Button>Modal 3</Button>}>
        <h2>Tercer Modal</h2>
      </Modal>
    </div>
  )
}
```

---

## 10. Modal con Contenido Complejo (Formulario)

```jsx
function Example() {
  const handleSubmit = e => {
    e.preventDefault()
    // Procesar formulario
    closeModalById('form-modal-overlay')
  }

  return (
    <Modal id='form-modal' size='md' trigger={<Button>Abrir Formulario</Button>}>
      <h2>Formulario de Contacto</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='name'>Nombre:</label>
          <input type='text' id='name' name='name' required />
        </div>
        <div>
          <label htmlFor='email'>Email:</label>
          <input type='email' id='email' name='email' required />
        </div>
        <div>
          <label htmlFor='message'>Mensaje:</label>
          <textarea id='message' name='message' rows='4' required />
        </div>
        <button type='submit'>Enviar</button>
      </form>
    </Modal>
  )
}
```

---

## 11. Modal Alineado Arriba (No Centrado)

```jsx
<Modal id='top-modal' centered={false} trigger={<Button>Modal Arriba</Button>}>
  <p>Este modal está alineado en la parte superior de la pantalla.</p>
</Modal>
```

---

## 12. Modal con Clases Personalizadas

Agrega clases CSS personalizadas para estilos específicos.

```jsx
<Modal id='custom-modal' className='my-custom-overlay' contentClassName='my-custom-content' trigger={<Button>Modal Personalizado</Button>}>
  <p>Este modal tiene clases CSS personalizadas.</p>
</Modal>
```

```scss
// Estilos personalizados
.my-custom-overlay {
  background-color: rgba(var(--primary-600-rgb), 0.8);
}

.my-custom-content {
  border: 3px solid var(--primary-500);
}
```

---

## 13. Ejemplo Real: InfoItem con Modal (Horarios)

Este es el caso de uso real del componente InfoItem del proyecto.

```jsx
import { Modal, Button, Caption, Paragraph } from '@library/components'

function InfoItem({ label, icon, modalContent, modalId }) {
  return (
    <div className='info-item'>
      <div className='info-item__icon'>
        <i className={`ph ${icon}`}></i>
      </div>

      <div className='info-item__content'>
        <Caption size='sm'>{label}</Caption>

        {/* Modal con trigger integrado */}
        <Modal
          id={modalId}
          size='sm'
          trigger={
            <Button variant='shadow' size='sm' endIcon={<i className='ph ph-info'></i>}>
              Ver detalles
            </Button>
          }>
          <div className='program-detail-modal__header'>
            <Caption as='h3' size='lg' bold={true}>
              {label}
            </Caption>
          </div>
          <div className='program-detail-modal__body'>{modalContent}</div>
        </Modal>
      </div>
    </div>
  )
}

// Uso
function Example() {
  return (
    <InfoItem
      icon='ph-clock'
      label='Horarios'
      modalId='modal-horarios-doctorado'
      modalContent={
        <Paragraph>
          <p>
            <strong>Jornada de atención:</strong>
          </p>
          <ul>
            <li>
              <strong>Lunes a viernes:</strong> 7:00 a.m. a 11:00 a.m.
            </li>
            <li>
              <strong>Sábados:</strong> 8:00 a.m. a 12:00 p.m.
            </li>
          </ul>
        </Paragraph>
      }
    />
  )
}
```

---

## Props del Componente

| Prop                  | Tipo                             | Default   | Descripción                                           |
| --------------------- | -------------------------------- | --------- | ----------------------------------------------------- |
| `id`                  | `string`                         | `'modal'` | ID único del modal (requerido para múltiples modales) |
| `className`           | `string`                         | `''`      | Clases adicionales para el overlay                    |
| `children`            | `ReactNode`                      | -         | Contenido del modal                                   |
| `trigger`             | `ReactNode`                      | -         | Elemento que abre el modal                            |
| `autoOpen`            | `boolean`                        | `false`   | Abrir automáticamente                                 |
| `closeOnOverlayClick` | `boolean`                        | `true`    | Cerrar al hacer click fuera                           |
| `closeOnEsc`          | `boolean`                        | `true`    | Cerrar con tecla Escape                               |
| `showCloseButton`     | `boolean`                        | `true`    | Mostrar botón X                                       |
| `onOpen`              | `Function`                       | -         | Callback al abrir                                     |
| `onClose`             | `Function`                       | -         | Callback al cerrar                                    |
| `size`                | `'sm'｜'md'｜'lg'｜'xl'｜'full'` | `'md'`    | Tamaño del modal                                      |
| `contentClassName`    | `string`                         | `''`      | Clases para el contenido                              |
| `centered`            | `boolean`                        | `true`    | Centrado verticalmente                                |

---

## API de Script (Funciones Exportadas)

```jsx
import { openModalById, closeModalById, closeAll } from '@library/components/feedback/modal/script.js'

// Abrir modal por ID
openModalById('my-modal-overlay') // Retorna true si existe

// Cerrar modal por ID
closeModalById('my-modal-overlay') // Retorna true si existe

// Cerrar todos los modales
closeAll()
```

---

## Eventos Personalizados

```jsx
// Escuchar apertura de modal
window.addEventListener('modal:opened', e => {
  console.log('Modal abierto:', e.detail.modalId)
})

// Escuchar cierre de modal
window.addEventListener('modal:closed', e => {
  console.log('Modal cerrado:', e.detail.modalId)
})

// Abrir modal mediante evento
window.dispatchEvent(
  new CustomEvent('modal:open', {
    detail: { modalId: 'modal-my-modal-overlay' }
  })
)

// Cerrar modal mediante evento
window.dispatchEvent(
  new CustomEvent('modal:close', {
    detail: { modalId: 'modal-my-modal-overlay' }
  })
)

// Cerrar todos los modales mediante evento
window.dispatchEvent(new CustomEvent('modal:close'))
```

---

## Características Clave

✅ **Accesibilidad:** Focus trap, navegación con teclado, ARIA labels ✅ **Múltiples instancias:** Soporta múltiples modales en la misma
página ✅ **Modales dinámicos:** MutationObserver detecta modales agregados después del DOM load ✅ **Responsive:** Tamaños adaptados para
móvil, tablet y desktop ✅ **Tema oscuro:** Soporte automático para dark mode ✅ **Liferay compatible:** Visible en modo edición de Liferay
✅ **Performance:** Usa requestIdleCallback para inicialización no bloqueante ✅ **Prevención de scroll:** El body no hace scroll cuando hay
un modal activo

---

## Variables SCSS Personalizables

Si necesitas ajustar valores específicos del modal, edita las variables SCSS en `styles.scss`:

```scss
$modal-overlay-bg-opacity: 0.65;
$modal-overlay-bg-edit-opacity: 0.3;
$modal-overlay-blur: 10px;
$modal-z-index: 10001;
$modal-close-btn-z-index: 10002;
$modal-close-btn-size: 35px;
$modal-close-btn-size-tablet: 40px;
$modal-animation-offset: -16px;
$modal-timing-function: cubic-bezier(0.2, 0, 0.2, 1);
```

---

## Migración desde el Modal Antiguo

### Antes (modal-system.js personalizado)

```jsx
// InfoItem antiguo
<Button data-modal-target={modalId}>Ver detalles</Button>

<div id={modalId} className='program-detail-modal'>
  <div className='program-detail-modal__content'>
    <button className='program-detail-modal__close'>×</button>
    <div className='program-detail-modal__body'>{modalContent}</div>
  </div>
</div>
```

### Después (Modal de librería)

```jsx
// InfoItem nuevo
<Modal id={modalId} trigger={<Button>Ver detalles</Button>}>
  {modalContent}
</Modal>
```

**Beneficios de la migración:**

- ✅ Menos código boilerplate
- ✅ No necesitas el ModalSystem personalizado
- ✅ Mejor accesibilidad out-of-the-box
- ✅ Consistencia con el resto de componentes de la librería

---

## Notas Importantes

1. **IDs únicos:** Cada modal necesita un `id` único en la página
2. **Sufijo automático:** El componente agrega automáticamente `-overlay` al ID interno
3. **SSR compatible:** El script se inicializa de forma segura en el navegador
4. **Re-inicialización:** Los modales agregados dinámicamente se detectan automáticamente

---

## Soporte

Para más información o reportar issues:

- Documentación interna del proyecto
- Revisar el código fuente en `app/_library/components/feedback/modal/`
