import React, { useState, useEffect, useRef } from 'react';
import '../components/componentIndex.css';

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
    <div className="carrossel-midia" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', position: 'relative', overflow: 'visible' }}>
      {/* Imagem de fundo fixa, com desfoque */}
      <img 
        src="/foto5carrossel.jpg" 
        alt="Fundo do carrossel" 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
          filter: 'blur(10px) brightness(0.85)',
          pointerEvents: 'none',
        }}
      />
      <div style={{ position: 'static', zIndex: 1, width: '100%' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            minWidth: 745,  
            maxWidth: 900,
            minHeight: 300,
            aspectRatio: '16/9',
            margin: '0 auto',
            position: 'relative',
            background: 'transparent',
          }}
        >
          <button className="carrossel-btn" onClick={prev}>&lt;</button>
          <div
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              background: 'transparent',
              position: 'relative',
            }}
          >
            <div
              className={`carrossel-midia-content ${fade ? 'carrossel-fade carrossel-fade-active' : 'carrossel-fade'}`}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'transparent',
                borderRadius: 8,
                boxShadow: '0 1px 4px #0002',
                overflow: 'hidden',
              }}
            >
              {midia[index].type === 'image' ? (
                <img
                  src={midia[index].src}
                  alt="Carrossel"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    background: 'transparent',
                    display: 'block',
                  }}
                />
              ) : (
                <video
                  key={midia[index].src}
                  ref={videoRef}
                  src={midia[index].src}
                  controls
                  autoPlay
                  loop={false}
                  onEnded={next}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    background: 'transparent',
                    display: 'block',
                  }}
                />
              )}
            </div>
          </div>
          <button className="carrossel-btn" onClick={next}>&gt;</button>
        </div>
        {/* Indicadores (bolinhas) abaixo do carrossel */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 18, width: '100%' }}>
          {midia.map((item, i) => (
            <span
              key={i}
              style={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                background: i === index ? 'var(--azul-escuro, #1a237e)' : '#bbb',
                display: 'inline-block',
                transition: 'background 0.2s',
                cursor: 'pointer',
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
