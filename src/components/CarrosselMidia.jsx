import React, { useState, useEffect, useRef } from 'react';
import '../components/componentIndex.css';
import '../styles/CarrosselMidia.css';

const midia = [
  { type: 'image', src: '/foto1carrosel.jpg' },
  { type: 'image', src: '/foto2carrosel.jpg' },
  { type: 'image', src: '/foto3carrossel.jpg' },
  { type: 'image', src: '/foto4carrossel.jpg' },
  { type: 'image', src: '/foto5carrossel.jpg' },
  { type: 'image', src: '/foto6carrossel.jpg' },
  { type: 'image', src: '/foto7carrossel.jpg' },
  { type: 'video', src: '/video1carrossel.mp4' },
  { type: 'video', src: '/video2carrossel.mp4' },
  { type: 'video', src: '/video3carrossel.mp4' },
  { type: 'video', src: '/video4carrossel.mp4' },
];

export default function CarrosselMidia() {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [loading, setLoading] = useState(true); // Adicionado estado de loading
  const intervalRef = useRef(null);
  const videoRef = useRef(null);
  const touchStartX = useRef(null);

  // Avanço automático para imagens
  useEffect(() => {
    if (midia[index].type === 'image' && !isHovered) {
      intervalRef.current = setTimeout(() => {
        setIndex((i) => (i + 1) % midia.length);
      }, 3000);
    } else {
      clearTimeout(intervalRef.current);
    }
    return () => clearTimeout(intervalRef.current);
  }, [index, isHovered]);

  // Habilita som do vídeo ao trocar para vídeo
  useEffect(() => {
    if (midia[index].type === 'video' && videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.volume = 1;
    }
  }, [index]);

  // Efeito de fade ao trocar de mídia
  useEffect(() => {
    setFade(false);
    setLoading(true); // Ativa o loading ao trocar de mídia
    const timeout = setTimeout(() => setFade(true), 10); // trigger reflow
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
    if (diff > 50) prev();      // Swipe para direita
    else if (diff < -50) next(); // Swipe para esquerda
    touchStartX.current = null;
  };

  return (
    <div className="carrosselMidia">
      {/* Imagem de fundo fixa, com desfoque */}
      <img 
        className='carrosselMidiaImg'
        src="/foto5carrossel.jpg" 
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
        {/* Indicadores (bolinhas) abaixo do carrossel */}
        <div className='labelCarrossel' style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 18, width: '100%' }}>
          {midia.map((item, i) => (
            <span className='spanItem'
              key={i}
              style={{
                // CSS inline pois envolve JS
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

// Sugestões de melhoria:
// - Pausar o avanço automático ao passar o mouse sobre o carrossel.
// - Adicionar legendas ou títulos para cada mídia.
// - Suporte a swipe no mobile.
// - Transições animadas entre as mídias.
