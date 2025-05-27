$(document).ready(() => {
  console.log('🟠 [Modal de alerta] Cargando...')
  $('#promoModal').modal('show')
  console.log('🟢 [Modal de alerta] Cargado con éxito')

  $('#promoModal-btn-close').on('click', function () {
    $('#promoModal').modal('hide')
  })

  const editMode = $('.has-edit-mode-menu')

  if (editMode) $('#promoModal').addClass('show')
})
