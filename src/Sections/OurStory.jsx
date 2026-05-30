import "./ourStory.css";

const storyData = [
  {
    id: 1,
    title: "How we met",
    text: "We first crossed paths in a moment we never expected. What started as a simple introduction slowly became the beginning of something beautiful.",
    image: "storytwo_yk5r3y",
  },
  {
    id: 2,
    title: "Our Journey",
    text: "Through laughter, growth, and shared dreams, we discovered a bond that only grew stronger with time.",
    image: "storyone_zeu8gq",
  },
  {
    id: 3,
    title: "Forever Begins",
    text: "Now we step into forever, grateful for every moment that led us here and excited for what lies ahead.",
    image: "storythree_py1mvd",
  },
];

const OurStory = () => {
  return (
    <section className="our-story container-fluid p-0">
      <div className="story-header text-center py-5">
        <h2>Our Story</h2>
        <p>Three moments. One love. A lifetime ahead.</p>
      </div>

      <div className="story-wrapper">
        {storyData.map((item, index) => (
          <div
            key={item.id}
            className={`story-slide d-flex align-items-center ${
              index % 2 === 0 ? "normal" : "reverse"
            }`}
            style={{
              backgroundImage: `url(https://res.cloudinary.com/dxrjntrjb/image/upload/${item.image})`,
            }}
          >
            <div className="overlay"></div>

            <div className="story-content container">
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurStory;
