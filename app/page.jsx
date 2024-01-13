import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className='text-4xl'>text-4xl</h1>
     Home Page
     <a href="/task">Task</a>
    </main>
  )
}
