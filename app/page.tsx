import './home.css'
import './globals.css'
import Image from 'next/image'  
import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <Link href="https://github.com/MichaelBishoper">
        <Image 
          className='github'
          src="/assets/github.png"
          width={60}
          height={60}
          alt='github'
        />
      </Link>
      <div className='mainBanner'>
          <Image
            src='/banners/Heading1.png'
            width={500}
            height={300}
            alt='metro clicker by michaelbishoper'
            draggable="false"
          />
      </div>
      <div className="buttonsContainer fadeInUp-animation">
        
        <div className="button">
          <Link href="/metronome" className=''>
          METRONOME
          </Link>
        </div>
        
        <div className="button">
          <Link href="https://github.com/MichaelBishoper" className=''>
          EAR TRAINING
          </Link>
        </div>
        
        <div className="button">
          <Link href="https://github.com/MichaelBishoper" className=''>
          CREDITS
          </Link>
        </div>
        
      </div>
    </div>
    
  )
}
