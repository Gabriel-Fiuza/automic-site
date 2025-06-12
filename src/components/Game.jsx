import './componentIndex.css';
import komb from '../assets/komb-automic.png';
import muro from '../assets/muro-tijolo.jpg';

export default function Game() {
  
  return (
    <div className="game">
      <img className='komb' src={komb} alt="" />
      <img className='wall' src={muro} alt="" />
    </div>
  )
}