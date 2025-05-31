$(document).ready(() => {
  console.log('🟠 [Modal de alerta] Cargando...')
  $('#modalAlert').modal('show')
  console.log('🟢 [Modal de alerta] Cargado con éxito')

  $('#buttonModalAlert').on('click', function () {
    $('#modalAlert').modal('hide')
  })

  const editMode = $('.has-edit-mode-menu')

  if (editMode) $('#modalAlert').addClass('show')
})
