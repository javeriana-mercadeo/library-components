import Splash from '@/app/_library/components/splash'

export default function ThankYouPage() {
  return (
    <>
      <Splash />

      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold mb-4">Thank You!</h1>
        <p className="text-lg">Your submission has been received.</p>
        <p className="text-lg">We will get back to you soon.</p>
        <p className="text-lg">In the meantime, feel free to explore our site.</p>
        <p className="text-lg">Thank you for your interest!</p>
        <p className="text-lg">- The Team</p>
      </div>
    </>
  )
}
