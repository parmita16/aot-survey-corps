const FACTIONS = ["All", "Survey Corps", "Military Police", "Garrison", "Warriors"];
function FilterBar({ selectedFaction, onFactionChange, sortBy, onSortChange }) {
  return (
    <div className="filter-bar">
      <select
        value={selectedFaction}
        onChange={(e) => onFactionChange(e.target.value)}
        className="filter-select"
      >
        {FACTIONS.map((faction) => (
          <option key={faction} value={faction}>
            {faction}
          </option>
        ))}
      </select>
      <select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
        className="filter-select"
      >
        <option value="name">Sort by Name</option>
        <option value="age">Sort by Age</option>
      </select>
    </div>
  );
}
export default FilterBar;