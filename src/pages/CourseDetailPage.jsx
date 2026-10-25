import { useState } from "react";
import CourseCard from "../components/CourseCard.jsx";
import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";
import { courses } from "../data/courses.js";
import { footerGroups } from "../data/siteContent.js";

const defaultCurriculum = [
  {
    title: "Introduction to HR",
    lessons: [
      { title: "Pengenalan dasar dan ruang lingkup", duration: "12 Menit" },
      { title: "Memahami kebutuhan pengguna", duration: "12 Menit" },
      { title: "Menyusun strategi produk", duration: "12 Menit" },
    ],
  },
  {
    title: "Dasar dan praktik profesional",
    lessons: [
      { title: "Riset dan analisis kebutuhan", duration: "18 Menit" },
      { title: "Membuat rencana kerja", duration: "15 Menit" },
    ],
  },
  {
    title: "Studi kasus",
    lessons: [
      { title: "Menyelesaikan studi kasus", duration: "20 Menit" },
      { title: "Evaluasi hasil pembelajaran", duration: "16 Menit" },
    ],
  },
  {
    title: "Proyek Akhir",
    lessons: [{ title: "Mempresentasikan hasil proyek", duration: "25 Menit" }],
  },
];

const tutorBiography =
  "Berkarier di bidang profesional selama lebih dari 3 tahun. Saat ini bekerja sebagai Senior Talent Acquisition Specialist di Wings Group Indonesia (Sayap Mas Utama) selama hampir 1 tahun.";

const reviews = [
  { cohort: "Alumni Batch 2", rating: "3.5" },
  { cohort: "Alumni Batch 4", rating: "3.5" },
];

function Stars({ rating }) {
  return (
    <span className="rating">
      ★★★<i>★★</i> <u>{rating} (86)</u>
    </span>
  );
}

function InstructorCard({ course }) {
  return (
    <article className="detail-instructor-card">
      <div className="detail-instructor-heading">
        <img src={course.instructorImage} alt="" />
        <div>
          <strong>Gregorius Edrik Lawanto</strong>
          <small>Senior Talent Acquisition di WingsGroup</small>
        </div>
      </div>
      <p>{tutorBiography}</p>
    </article>
  );
}

function Curriculum({ sections }) {
  return (
    <section className="detail-panel curriculum-panel">
      <h2>Kamu akan Mempelajari</h2>
      <div className="curriculum-list">
        {sections.map((section, index) => (
          <details className="curriculum-section" key={section.title} open={index === 0}>
            <summary>{section.title}</summary>
            <ul>
              {section.lessons.map((lesson) => (
                <li key={lesson.title}>
                  <span>{lesson.title}</span>
                  <span className="lesson-meta">
                    <span aria-hidden="true">▷</span> Video
                    <span aria-hidden="true">◷</span> {lesson.duration}
                  </span>
                </li>
              ))}
            </ul>
          </details>
        ))}
      </div>
    </section>
  );
}

function PurchaseCard({ course, isLoggedIn }) {
  const [shareMessage, setShareMessage] = useState("");
  const oldPrice = new Intl.NumberFormat("id-ID").format(course.priceValue * 2);

  async function shareCourse() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShareMessage("Tautan kelas berhasil disalin.");
    } catch {
      setShareMessage("Tautan kelas tidak dapat disalin di browser ini.");
    }
  }

  function buyCourse() {
    const paymentUrl = `/payment?courseId=${course.id}`;
    if (isLoggedIn) {
      window.location.href = paymentUrl;
      return;
    }

    window.location.href = `/login?next=${encodeURIComponent(paymentUrl)}`;
  }

  return (
    <aside className="purchase-card" aria-label="Informasi pembelian kelas">
      <h2>{course.detailTitle}</h2>
      <div className="purchase-price">
        <strong>{course.price}</strong>
        <del>Rp {oldPrice}</del>
        <span>Diskon 50%</span>
      </div>
      <p className="purchase-promo">
        Penawaran spesial tersisa 2 hari lagi!
      </p>
      <button
        className="purchase-button purchase-button-primary"
        type="button"
        onClick={buyCourse}
      >
        Beli Sekarang
      </button>
      <button
        className="purchase-button purchase-button-secondary"
        type="button"
        onClick={shareCourse}
      >
        Bagikan Kelas
      </button>
      {shareMessage && (
        <p className="share-feedback" role="status">
          {shareMessage}
        </p>
      )}

      <h3>Kelas Ini Sudah Termasuk</h3>
      <ul className="course-includes">
        <li>
          <span aria-hidden="true">♧</span> Ujian Akhir
        </li>
        <li>
          <span aria-hidden="true">▣</span> 49 Video
        </li>
        <li>
          <span aria-hidden="true">▤</span> 7 Dokumen
        </li>
        <li>
          <span aria-hidden="true">♧</span> Sertifikat
        </li>
        <li>
          <span aria-hidden="true">♬</span> Pretest
        </li>
      </ul>
      <h3>Bahasa Pengantar</h3>
      <p className="course-language">
        <span aria-hidden="true">◎</span> Bahasa Indonesia
      </p>
    </aside>
  );
}

export default function CourseDetailPage({ course, user, onLogout }) {
  if (!course) {
    return (
      <>
        <Header user={user} onLogout={onLogout} />
        <main className="detail-not-found container">
          <h1>Kelas tidak ditemukan</h1>
          <p>Kelas yang Anda cari tidak tersedia.</p>
          <a href="/courses">Kembali ke katalog kelas</a>
        </main>
        <Footer groups={footerGroups} />
      </>
    );
  }

  const relatedCourses = courses
    .filter((item) => item.id !== course.id)
    .slice(0, 3);
  const curriculum = course.curriculum || defaultCurriculum;
  const isLoggedIn = Boolean(user?.email);

  return (
    <>
      <Header user={user} onLogout={onLogout} />
      <main className="course-detail-page container">
        <nav className="detail-breadcrumb" aria-label="Breadcrumb">
          <a href="/">Beranda</a>
          <span>/</span>
          <a href="/courses">{course.studyArea}</a>
          <span>/</span>
          <span aria-current="page">{course.detailTitle}</span>
        </nav>

        <section
          className="detail-hero"
          style={{ "--detail-cover": `url("${course.image}")` }}
        >
          <div className="detail-hero-content">
            <h1>{course.detailTitle}</h1>
            <p>
              Belajar bersama tutor profesional di Video Course.
              <br />
              Kapanpun, di manapun.
            </p>
            <Stars rating={course.rating} />
          </div>
        </section>

        <div className="detail-columns">
          <div className="detail-main-column">
            <section className="detail-panel description-panel">
              <h2>Deskripsi</h2>
              <p>
                {course.description.replace("...", "")} Semakin banyak materi
                dan studi kasus yang dipelajari, semakin terasah kemampuan Anda.
                Materi dirancang untuk membantu Anda memahami konsep dan
                menerapkannya dalam pekerjaan.
              </p>
            </section>

            <section className="detail-panel tutor-panel">
              <h2>Belajar bersama Tutor Profesional</h2>
              <div className="detail-instructor-grid">
                <InstructorCard course={course} />
                <InstructorCard course={course} />
              </div>
            </section>

            <Curriculum sections={curriculum} />

            <section className="detail-panel reviews-panel">
              <h2>Rating dan Review</h2>
              <div className="review-grid">
                {reviews.map((review) => (
                  <article className="review-card" key={review.cohort}>
                    <div className="detail-instructor-heading">
                      <img src={course.instructorImage} alt="" />
                      <div>
                        <strong>Gregorius Edrik Lawanto</strong>
                        <small>{review.cohort}</small>
                      </div>
                    </div>
                    <p>{tutorBiography}</p>
                    <Stars rating={review.rating} />
                  </article>
                ))}
              </div>
            </section>
          </div>

          <PurchaseCard course={course} isLoggedIn={isLoggedIn} />
        </div>

        <section className="related-courses">
          <h2>Video Pembelajaran Terkait Lainnya</h2>
          <p>Ekspansi Pengetahuan Anda dengan Rekomendasi Spesial Kami!</p>
          <div className="related-course-grid">
            {relatedCourses.map((relatedCourse) => (
              <CourseCard key={relatedCourse.id} course={relatedCourse} />
            ))}
          </div>
        </section>
      </main>
      <Footer groups={footerGroups} />
    </>
  );
}
