import "./gallery.css";

const images = [
  "https://images.unsplash.com/photo-1523438097201-512ae7d59c0b?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=1200&q=80",
];

const Gallery = () => {
  return (
    <section className="gallery-section">
      <h2 className="gallery-title">Our Memories</h2>

      <div className="book">
        <div className="cover"></div>

        <div className="pages">
          {images.map((img, i) => (
            <div
              className={`page page-${i + 1}`}
              key={i}
              style={{ backgroundImage: `url(${img})` }}
            ></div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
