import React, { useState, useEffect, useRef } from 'react';
import '../styles/CarrosselMidia.css';

// MUDANÇA: Agora ele recebe a lista de mídias e a imagem de fundo diretamente do Certificado
export default function CarrosselMidia({ midia = [], backgroundImage = '' }) {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [loading, setLoading] = useState(true);
  const intervalRef = useRef(null);
  const videoRef = useRef(null);
  const touchStartX = useRef(null);

  // Se a lista de mídia mudar (ex: trocou de certificado), volta pro início
  useEffect(() => {
    setIndex(0);
  }, [midia]);

  useEffect(() => {
    if (midia.length > 0 && midia[index]?.type === 'image' && !isHovered) {
      intervalRef.current = setTimeout(() => {
        setIndex((i) => (i + 1) % midia.length);
      }, 3000);
    } else {
      clearTimeout(intervalRef.current);
    }
    return () => clearTimeout(intervalRef.current);
  }, [index, isHovered, midia]);

  useEffect(() => {
    if (midia.length > 0 && midia[index]?.type === 'video' && videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.volume = 1;
    }
  }, [index, midia]);

  useEffect(() => {
    setFade(false);
    setLoading(true);
    const timeout = setTimeout(() => setFade(true), 10);
    return () => clearTimeout(timeout);
  }, [index]);

  const next = () => setIndex((i) => (i + 1) % midia.length);
  const prev = () => setIndex((i) => (i - 1 + midia.length) % midia.length);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (diff > 50) prev();
    else if (diff < -50) next();
    touchStartX.current = null;
  };

  // Proteção: Se não tiver mídia ainda, não renderiza nada e evita erros
  if (!midia || midia.length === 0) return null;

  return (
    <div className="carrosselMidia">
      <img 
        className='carrosselMidiaImg'
        src={backgroundImage} 
        alt="Fundo do carrossel"/>
      <div style={{ position: 'static', zIndex: 1, width: '100%' }}>
        <div className="carrossel-container">
          <button className="carrossel-btn" onClick={prev}>&lt;</button>
          <div className='carrosselMidiaWrapper'>
            <div
              className={`carrosselMidiaContent ${fade ? 'carrossel-fade carrossel-fade-active' : 'carrossel-fade'}`}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {loading && midia[index].type === 'image' && (
                <div className="media-loader">
                  <div className="loader-spinner"></div>
                </div>
              )}

              {midia[index].type === 'image' ? (
                <img
                  className='imageElement'
                  src={midia[index].src}
                  alt="Carrossel"
                  onLoad={() => setLoading(false)}/>
              ) : (
                <video
                  className='videoElement'
                  key={midia[index].src}
                  ref={videoRef}
                  src={midia[index].src}
                  controls
                  autoPlay
                  loop={false}
                  onEnded={next}
                  onLoadedData={() => setLoading(false)}
                  controlsList="nodownload"/>
              )}
            </div>
          </div>
          <button className="carrossel-btn" onClick={next}>&gt;</button>
        </div>
        <div className='labelCarrossel' style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 18, width: '100%' }}>
          {midia.map((item, i) => (
            <span className='spanItem'
              key={i}
              style={{
                background: i === index ? 'var(--azul-escuro, #1a237e)' : '#bbb',
                border: i === index ? '2px solid #3949ab' : '2px solid transparent',
              }}
              onClick={() => setIndex(i)}
              aria-label={`Ir para mídia ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}