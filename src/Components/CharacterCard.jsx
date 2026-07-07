function CharacterCard({ character }) {
  const { name, faction, age, status, image } = character;
  return (
    <div className="character-card">
      <img src={image} alt={name} className="character-image" />
      <div className="character-info">
        <h3>{name}</h3>
        <p className="faction-tag">{faction}</p>
        <p className="character-meta">
          Age: {age} · {status}
        </p>
      </div>
    </div>
  );
}
export default CharacterCard;