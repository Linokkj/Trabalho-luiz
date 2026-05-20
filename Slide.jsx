import { useState, useEffect } from 'react';
import './Slide.css'; 

const slideData = [
  {
    id: 1,
    titulo: "Batman: O Cavaleiro das Trevas",
    desc: "O confronto definitivo entre o Batman e o Coringa.",
    imagemUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 2,
    titulo: "Interestelar",
    desc: "Uma viagem pelas estrelas para salvar a humanidade.",
    imagemUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 3,
    titulo: "Stranger Things",
    desc: "Coisas estranhas acontecem em uma pequena cidade.",
    imagemUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80"
  }
];

export default function Slide() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === slideData.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === slideData.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slideData.length - 1 : prev - 1));
  };

  return (
    <div className="SlideCon">
      <button className="slider-button prev" onClick={prevSlide}>❮</button>
      <button className="slider-button next" onClick={nextSlide}>❯</button>

      {slideData.map((slide, index) => (
        <div
          key={slide.id}
          className={`slide ${index === currentIndex ? 'active' : ''}`}
        >
          <img src={slide.imagemUrl} alt={slide.titulo} className="slideImagem" />
          <div className="slideSo"></div>

          <div className="slideConteudo">
            <h1>{slide.titulo}</h1>
            <p>{slide.desc}</p>
          </div>
        </div>
      ))}

      <div className="BolaCon">
        {slideData.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}