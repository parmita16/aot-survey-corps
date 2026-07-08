function Tabs({ activeTab, onTabChange, favoritesCount }) {
  return (
    <div className="tabs">
      <button
        className={`tab-button ${activeTab === "all" ? "active" : ""}`}
        onClick={() => onTabChange("all")}
      >
        All Characters
      </button>
      <button
        className={`tab-button ${activeTab === "favorites" ? "active" : ""}`}
        onClick={() => onTabChange("favorites")}
      >
        Favorites ({favoritesCount})
      </button>
    </div>
  );
}
export default Tabs;