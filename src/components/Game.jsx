import './componentIndex.css';
import komb from '../assets/komb-automic.png';
import muro from '../assets/muro-tijolo.jpg';
import { useEffect, useState } from 'react'

export default function Game() {
  
  const [isJumping, setIsJumping] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space' && !isJumping) {
        setIsJumping(true)
        setTimeout(() => {
          setIsJumping(false)
        }, 500) // Duração do pulo (deve bater com o CSS)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isJumping])

  return (
    <div className='game'>
      <img className={`komb ${isJumping ? 'jump' : ''}`} src={komb} alt="" />
      <img className='wall' src={muro} alt="" />
    </div>
  )
}