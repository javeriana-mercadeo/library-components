const currentUrl = encodeURIComponent(window.location.href)
const message = encodeURIComponent('Te invito a visitar este sitio web de la Pontificia Universidad Javeriana.')

let timeOut
const listSocial = [
  {
    type: 'button',
    id: 'btnOpen',
    name: '',
    icon: 'share-fill',
    backgroundColor: '#4866D1'
  },
  {
    type: 'link',
    icon: 'facebook',
    name: 'Compartir con Facebook',
    url: `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`,
    backgroundColor: '#1877F2' // Azul Facebook
  },
  {
    type: 'link',
    icon: 'twitter-x',
    name: 'Compartir con X',
    url: `https://twitter.com/intent/tweet?text=${message}&url=${currentUrl}`,
    backgroundColor: '#14171A' // Azul Twitter
  },
  {
    type: 'link',
    icon: 'linkedin',
    name: 'Compartir con LinkedIn',
    url: `https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}&summary=${message}`,
    backgroundColor: '#0077B5' // Azul LinkedIn
  },
  {
    type: 'link',
    icon: 'whatsapp',
    name: 'Compartir con WhatsApp',
    url: `https://api.whatsapp.com/send?text=${message}%20${currentUrl}`,
    backgroundColor: '#25D366' // Verde WhatsApp
  },
  {
    type: 'button',
    id: 'btnCopy',
    name: 'Copiar enlace',
    icon: 'copy',
    backgroundColor: '#FFC107' // Color adicional
  },
  {
    type: 'button',
    id: 'btnShare',
    name: 'Compartir',
    icon: 'box-arrow-up-right',
    backgroundColor: '#4CAF50' // Color adicional
  }
]

class Item {
  constructor(name, type, id, icon, url, backgroundColor, index) {
    // Crear un elemento <button> o <a> según el tipo
    this.$element = $(document.createElement('div'))
    this.$element.addClass('item')
    this.$element.css('border', `1px solid ${backgroundColor}`)
    this.$element.css('z-index', index + 2)
    this.$item

    if (type === 'button') {
      this.$item = $(document.createElement('button'))
      this.$item.attr('id', id) // Asignar el id
      this.$item.on('click', () => {
        if (id === 'btnCopy') {
          this.copy()
        } else if (id === 'btnShare') {
          this.share()
        }
      })
    } else {
      this.$item = $(document.createElement('a'))
      this.$item.attr('href', url)
      this.$item.attr('target', '_blank')
    }

    // Agregar tooltip solo si no es el primer elemento
    if (index > 0) {
      this.$item.attr('data-bs-toggle', 'tooltip')
      this.$item.attr('data-bs-placement', 'right')
      this.$item.attr('title', name)
    }

    // Asignar clases al elemento
    this.$item.addClass('icon-button')
    this.$element.append(this.$item) // Agregar el botón o enlace al elemento

    // Establecer el color de fondo original
    const originalColor = '#fff'
    const span = $(document.createElement('span'))
    span.css('background-color', originalColor)
    this.$item.append(span)

    // Crear un icono <ion-icon> y un <span> para el texto
    const $icon = $(document.createElement('i'))
    $icon.attr('class', `bi bi-${icon}`) // Asignar el nombre del icono
    $icon.css('color', backgroundColor) // Establecer el color del icono
    this.$item.append($icon) // Agregar el icono al elemento

    // Cambiar el color de fondo al hacer hover
    this.$item.on('mouseenter', () => {
      $icon.css('color', originalColor)
      span.css('background-color', backgroundColor)
    })

    this.$item.on('mouseleave', () => {
      $icon.css('color', backgroundColor)
      span.css('background-color', originalColor)
    })

    // Inicializar referencias para la lista de elementos
    this.prev = null
    this.next = null
    this.isMoving = false

    // Manejo del movimiento del ratón sobre el elemento
    let element = this // Guardar referencia a 'this'
    this.$element.on('mousemove', function () {
      clearTimeout(timeOut) // Limpiar el timeout anterior
      timeOut = setTimeout(function () {
        if (element.next && element.isMoving) {
          element.next.moveTo(element) // Mover al siguiente elemento si está en movimiento
        }
      }, 10) // Esperar 10 ms antes de ejecutar el movimiento
    })
  }

  moveTo(item) {
    anime({
      targets: this.$element[0],
      left: item.$element.css('left'),
      top: item.$element.css('top'),
      duration: 700,
      elasticity: 500
    })
    if (this.next) {
      this.next.moveTo(item)
    }
  }

  updatePosition() {
    anime({
      targets: this.$element[0],
      left: this.prev.$element.css('left'),
      top: this.prev.$element.css('top'),
      duration: 80
    })

    if (this.next) {
      this.next.updatePosition()
    }
  }

  copy() {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        alert('Enlace copiado al portapapeles.')
      })
      .catch(error => {
        console.error('Error al copiar el enlace:', error)
      })
  }

  async share() {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Mi Página Web',
          text: '¡Mira esta increíble página!',
          url: window.location.href
        })
        console.log('Contenido compartido con éxito')
      } catch (error) {
        console.error('Error al compartir:', error)
      }
    } else {
      alert('La funcionalidad de compartir no es compatible con tu dispositivo.')
    }
  }
}

class Menu {
  constructor(menu) {
    this.$element = $(menu)
    this.size = 0
    this.first = null
    this.last = null
    this.timeOut = null
    this.hasMoved = false
    this.status = 'closed'
  }

  add(item) {
    let menu = this
    if (this.first == null) {
      this.first = item
      this.last = item
      this.first.$element.on('mouseup', function () {
        if (menu.first.isMoving) {
          menu.first.isMoving = false
        } else {
          menu.click()
        }
      })
      item.$element.draggable(
        {
          start: function () {
            menu.close()
            item.isMoving = true
          }
        },
        {
          drag: function () {
            if (item.next) {
              item.next.updatePosition()
            }
          }
        },
        {
          stop: function () {
            item.isMoving = false
            item.next.moveTo(item)
          }
        }
      )
    } else {
      this.last.next = item
      item.prev = this.last
      this.last = item
    }
    this.$element.after(item.$element)
  }

  open() {
    this.status = 'open'
    let current = this.first.next
    let iterator = 1
    let head = this.first

    // Detectar si estamos en mobile
    while (current != null) {
      anime({
        targets: current.$element[0],
        left: head.$element.css('left'),
        top: parseInt(head.$element.css('top'), 10) + iterator * 50,
        duration: 500
      })
      iterator++
      current = current.next
    }
  }

  close() {
    this.status = 'closed'
    let current = this.first.next
    let head = this.first
    let iterator = 1
    while (current != null) {
      anime({
        targets: current.$element[0],
        left: head.$element.css('left'),
        top: head.$element.css('top'),
        duration: 500
      })
      iterator++
      current = current.next
    }
  }

  click() {
    if (this.status == 'closed') {
      this.open()
    } else {
      this.close()
    }
  }
}

let menu = new Menu('#myMenu')
listSocial.forEach((element, index) => {
  let item = new Item(element.name, element.type, element.id, element.icon, element.url, element.backgroundColor, listSocial.length - index)
  menu.add(item)
})

$(document)
  .delay(50)
  .queue(function (next) {
    menu.open()
    next()
    $(document)
      .delay(1000)
      .queue(function (next) {
        menu.close()
        next()
      })
  })
