import { useState } from "react";

export default function CourseFilters({
  studyAreas,
  priceRanges,
  durationRanges,
  selectedStudyAreas,
  selectedPriceRanges,
  selectedDuration,
  onStudyAreasChange,
  onPriceRangesChange,
  onDurationChange,
  onReset,
}) {
  const [mobileExpanded, setMobileExpanded] = useState(false);

  function toggleSelection(value, selected, onChange) {
    onChange(
      selected.includes(value)
        ? selected.filter((item) => item !== value)
        : [...selected, value],
    );
  }

  return (
    <div className="catalog-filter-container">
      <button
        className="filter-mobile-toggle"
        type="button"
        aria-expanded={mobileExpanded}
        onClick={() => setMobileExpanded((expanded) => !expanded)}
      >
        Filter kelas
        <span aria-hidden="true">{mobileExpanded ? "−" : "+"}</span>
      </button>
      <div
        className={`filter-panel${mobileExpanded ? "" : " filter-panel--collapsed"}`}
      >
        <div className="filter-panel-heading">
          <strong>Filter</strong>
          <button type="button" onClick={onReset}>
            Reset
          </button>
        </div>

        <details className="filter-group" open>
          <summary>
            <span className="filter-icon" aria-hidden="true">
              ▦
            </span>
            Bidang Studi
          </summary>
          <div className="filter-options">
            {studyAreas.map((area) => (
              <label key={area}>
                <input
                  type="checkbox"
                  checked={selectedStudyAreas.includes(area)}
                  onChange={() =>
                    toggleSelection(
                      area,
                      selectedStudyAreas,
                      onStudyAreasChange,
                    )
                  }
                />
                <span>{area}</span>
              </label>
            ))}
          </div>
        </details>

        <details className="filter-group" open>
          <summary>
            <span className="filter-icon" aria-hidden="true">
              ◉
            </span>
            Harga
          </summary>
          <div className="filter-options">
            {priceRanges.map((range) => (
              <label key={range.id}>
                <input
                  type="checkbox"
                  checked={selectedPriceRanges.includes(range.id)}
                  onChange={() =>
                    toggleSelection(
                      range.id,
                      selectedPriceRanges,
                      onPriceRangesChange,
                    )
                  }
                />
                <span>{range.label}</span>
              </label>
            ))}
          </div>
        </details>

        <details className="filter-group" open>
          <summary>
            <span className="filter-icon" aria-hidden="true">
              ◷
            </span>
            Durasi
          </summary>
          <div className="filter-options">
            {durationRanges.map((range) => (
              <label key={range.id}>
                <input
                  type="radio"
                  name="duration"
                  checked={selectedDuration === range.id}
                  onChange={() => onDurationChange(range.id)}
                />
                <span>{range.label}</span>
              </label>
            ))}
          </div>
        </details>
      </div>
    </div>
  );
}
