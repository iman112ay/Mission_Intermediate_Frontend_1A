export default function CategoryTabs({ categories, activeCategory }) {
  return (
    <nav className="category-tabs" aria-label="Kategori kelas">
      {categories.map((category) => (
        <a
          className={category === activeCategory ? "active" : ""}
          href="#kelas"
          key={category}
        >
          {category}
        </a>
      ))}
    </nav>
  );
}
