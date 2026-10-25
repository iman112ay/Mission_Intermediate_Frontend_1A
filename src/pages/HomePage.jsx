import CourseCard from "../components/CourseCard.jsx";
import CategoryTabs from "../components/CategoryTabs.jsx";
import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";
import { courses } from "../data/courses.js";
import { courseCategories, footerGroups } from "../data/siteContent.js";

export default function HomePage({ user, onLogout }) {
  return (
    <>
      <Header user={user} onLogout={onLogout} />
      <main>
        <section id="beranda" className="hero container">
          <div className="hero-content">
            <h1>
              Revolusi Pembelajaran: Temukan
              <br className="desktop-only" /> Ilmu Baru melalui Platform Video
              Interaktif!
            </h1>
            <p>
              Temukan ilmu baru yang menarik dan mendalam melalui koleksi video
              pembelajaran berkualitas tinggi. Tidak hanya itu, Anda juga dapat
              berpartisipasi dalam latihan interaktif yang akan meningkatkan
              pemahaman Anda.
            </p>
            <a href="#kelas" className="btn btn-primary">
              Temukan Video Course untuk Dipelajari!
            </a>
          </div>
        </section>

        <section id="kelas" className="courses container">
          <div className="section-heading">
            <h2>Koleksi Video Pembelajaran Unggulan</h2>
            <p>Jelajahi Dunia Pengetahuan Melalui Pilihan Kami!</p>
          </div>

          <CategoryTabs
            categories={courseCategories}
            activeCategory={courseCategories[0]}
          />

          <div className="course-grid">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </section>

        <section id="newsletter" className="newsletter container">
          <div className="newsletter-inner">
            <span>NEWSLETTER</span>
            <h2>Mau Belajar Lebih Banyak?</h2>
            <p>
              Daftarkan dirimu untuk mendapatkan informasi terbaru dan
              penawaran spesial dari program-program terbaik hari esok.
            </p>
            <form>
              <input
                type="email"
                name="email"
                placeholder="Masukkan Emailmu"
                aria-label="Email"
                autoComplete="email"
                required
              />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </section>
      </main>
      <Footer groups={footerGroups} />
    </>
  );
}
