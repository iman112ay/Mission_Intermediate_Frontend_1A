import { useMemo, useState } from "react";
import CourseCard from "../components/CourseCard.jsx";
import CourseFilters from "../components/CourseFilters.jsx";
import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";
import { courses } from "../data/courses.js";
import { footerGroups } from "../data/siteContent.js";

const studyAreas = [
  "Pemasaran",
  "Digital & Teknologi",
  "Pengembangan Diri",
  "Bisnis Manajemen",
];

const priceRanges = [
  {
    id: "under-200",
    label: "Di bawah Rp 200K",
    matches: (price) => price < 200000,
  },
  {
    id: "200-500",
    label: "Rp 200K – Rp 500K",
    matches: (price) => price >= 200000 && price <= 500000,
  },
  {
    id: "over-500",
    label: "Di atas Rp 500K",
    matches: (price) => price > 500000,
  },
];

const durationRanges = [
  { id: "short", label: "Kurang dari 4 Jam" },
  { id: "medium", label: "4 – 8 Jam" },
  { id: "long", label: "Lebih dari 8 Jam" },
];

const PAGE_SIZE = 6;

function matchesDuration(course, duration) {
  if (duration === "short") return course.durationHours < 4;
  if (duration === "medium") {
    return course.durationHours >= 4 && course.durationHours <= 8;
  }
  if (duration === "long") return course.durationHours > 8;
  return true;
}

export default function CourseCatalogPage({ user, onLogout }) {
  const [selectedStudyAreas, setSelectedStudyAreas] = useState([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [selectedDuration, setSelectedDuration] = useState("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("recommended");
  const [page, setPage] = useState(1);

  const filteredCourses = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return courses
      .filter((course) => {
        const matchesStudyArea =
          selectedStudyAreas.length === 0 ||
          selectedStudyAreas.includes(course.studyArea);
        const matchesPrice =
          selectedPriceRanges.length === 0 ||
          selectedPriceRanges.some((rangeId) => {
            const range = priceRanges.find((item) => item.id === rangeId);
            return range.matches(course.priceValue);
          });
        const matchesSearch =
          !normalizedSearch ||
          `${course.title} ${course.instructorName} ${course.studyArea}`
            .toLowerCase()
            .includes(normalizedSearch);

        return (
          matchesStudyArea &&
          matchesPrice &&
          matchesDuration(course, selectedDuration) &&
          matchesSearch
        );
      })
      .sort((first, second) => {
        if (sort === "price-low") return first.priceValue - second.priceValue;
        if (sort === "price-high") return second.priceValue - first.priceValue;
        if (sort === "rating") return Number(second.rating) - Number(first.rating);
        return first.id - second.id;
      });
  }, [
    search,
    selectedDuration,
    selectedPriceRanges,
    selectedStudyAreas,
    sort,
  ]);

  const pageCount = Math.ceil(filteredCourses.length / PAGE_SIZE);
  const currentPage = Math.min(page, Math.max(pageCount, 1));
  const visibleCourses = filteredCourses.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  function resetFilters() {
    setSelectedStudyAreas([]);
    setSelectedPriceRanges([]);
    setSelectedDuration("");
    setSearch("");
    setSort("recommended");
    setPage(1);
  }

  function updateFilter(setter) {
    return (value) => {
      setter(value);
      setPage(1);
    };
  }

  return (
    <>
      <Header user={user} onLogout={onLogout} />
      <main className="catalog-page container">
        <header className="catalog-heading">
          <h1>Koleksi Video Pembelajaran Unggulan</h1>
          <p>Jelajahi Dunia Pengetahuan Melalui Pilihan Kami!</p>
        </header>

        <div className="catalog-layout">
          <aside className="catalog-sidebar" aria-label="Filter kelas">
            <CourseFilters
              studyAreas={studyAreas}
              priceRanges={priceRanges}
              durationRanges={durationRanges}
              selectedStudyAreas={selectedStudyAreas}
              selectedPriceRanges={selectedPriceRanges}
              selectedDuration={selectedDuration}
              onStudyAreasChange={updateFilter(setSelectedStudyAreas)}
              onPriceRangesChange={updateFilter(setSelectedPriceRanges)}
              onDurationChange={updateFilter(setSelectedDuration)}
              onReset={resetFilters}
            />
          </aside>

          <section className="catalog-results" aria-label="Daftar kursus">
            <div className="catalog-toolbar">
              <label className="sort-control">
                <span>Urutkan</span>
                <select
                  value={sort}
                  onChange={(event) => {
                    setSort(event.target.value);
                    setPage(1);
                  }}
                  aria-label="Urutkan kursus"
                >
                  <option value="recommended">Rekomendasi</option>
                  <option value="rating">Rating tertinggi</option>
                  <option value="price-low">Harga terendah</option>
                  <option value="price-high">Harga tertinggi</option>
                </select>
              </label>

              <label className="catalog-search">
                <span className="visually-hidden">Cari kelas</span>
                <input
                  type="search"
                  value={search}
                  onChange={(event) => {
                    setSearch(event.target.value);
                    setPage(1);
                  }}
                  placeholder="Cari Kelas"
                />
                <span aria-hidden="true">⌕</span>
              </label>
            </div>

            {visibleCourses.length > 0 ? (
              <div className="course-grid catalog-course-grid">
                {visibleCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            ) : (
              <p className="catalog-empty" role="status">
                Kelas tidak ditemukan. Coba ubah kata pencarian atau filter.
              </p>
            )}

            {pageCount > 1 && (
              <nav className="catalog-pagination" aria-label="Halaman kursus">
                <button
                  type="button"
                  aria-label="Halaman sebelumnya"
                  disabled={currentPage === 1}
                  onClick={() => setPage((current) => current - 1)}
                >
                  ‹
                </button>
                {Array.from({ length: pageCount }, (_, index) => index + 1).map(
                  (pageNumber) => (
                    <button
                      type="button"
                      className={pageNumber === currentPage ? "active" : ""}
                      aria-current={
                        pageNumber === currentPage ? "page" : undefined
                      }
                      key={pageNumber}
                      onClick={() => setPage(pageNumber)}
                    >
                      {pageNumber}
                    </button>
                  ),
                )}
                <button
                  type="button"
                  aria-label="Halaman berikutnya"
                  disabled={currentPage === pageCount}
                  onClick={() => setPage((current) => current + 1)}
                >
                  ›
                </button>
              </nav>
            )}
          </section>
        </div>
      </main>
      <Footer groups={footerGroups} />
    </>
  );
}
