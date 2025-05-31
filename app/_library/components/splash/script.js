export default () => {
  const splash = document.getElementById('splash')
  const content = document.querySelector('.content')

  if (splash) {
    splash.classList.add('hidden')
    setTimeout(() => {
      if (splash) splash.style.display = 'none'
      if (content) content.style.display = 'block'
    }, 2000)
  }
}
