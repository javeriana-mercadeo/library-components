export default () => {
  const splash = document.getElementById('splash')
  const content = document.querySelector('.content')

  splash.classList.add('hidden')

  setTimeout(() => {
    splash.style.display = 'none'
    content.style.display = 'block'
  }, 600)
}
