import { useEffect, useRef } from 'react'
import html2canvas from 'html2canvas'

const useScreenshot = componentName => {
  const ref = useRef(null)

  useEffect(() => {
    html2canvas(ref.current).then(canvas => {
      const image = canvas.toDataURL('image/png')
      const link = document.createElement('a')
      link.href = image
      link.download = `${componentName}.png`
      link.click()
    })
  }, [componentName])

  return ref
}

export default useScreenshot
