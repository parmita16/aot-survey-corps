function CharacterCard({ character, isFavorite, onToggleFavorite }) {
  const { name, faction, age, status, image } = character;
  return (
    <div className="character-card">
      <button
        className={`favorite-button ${isFavorite ? "favorited" : ""}`}
        onClick={() => onToggleFavorite(character.id)}
      >
        {isFavorite ? "★" : "☆"}
      </button>
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