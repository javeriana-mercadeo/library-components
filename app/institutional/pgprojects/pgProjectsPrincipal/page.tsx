'use client'
import HeroCarousel from '@library/_institutional/sections/pgprojects/sections/components/heroCarousel'
import Laboratories from '@library/_institutional/sections/pgprojects/sections/components/laboratories'
import Students from '@library/_institutional/sections/pgprojects/sections/components/students'
import Gallery from '@library/_institutional/sections/pgprojects/sections/components/gallery'
import Multimedia from '@library/_institutional/sections/pgprojects/sections/components/multimedia'
import Tools from '@library/_institutional/sections/pgprojects/sections/components/tools'
import DoubleDegree from '@library/_institutional/sections/pgprojects/sections/components/doubleDegree'
import DoubleDegree2 from '@library/_institutional/sections/pgprojects/sections/components/doubleDegree2'

const Page = () => {
  return (
    <div>
      <HeroCarousel />
      <Laboratories />
      <Students />
      <Gallery />
      <Multimedia />
      <DoubleDegree />
      <DoubleDegree2 />
      <Tools />
    </div>
  )
}

export default Page
