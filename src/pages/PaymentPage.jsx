import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";
import { courses } from "../data/courses.js";
import { footerGroups } from "../data/siteContent.js";

export default function PaymentPage({ user, onLogout }) {
  const courseId = Number(new URLSearchParams(window.location.search).get("courseId"));
  const course = courses.find((item) => item.id === courseId);

  return (
    <>
      <Header user={user} onLogout={onLogout} />
      <main className="payment-page container">
        <section className="payment-placeholder">
          <span className="payment-placeholder-icon" aria-hidden="true">
            ✓
          </span>
          <h1>Lanjutkan ke Pembayaran</h1>
          <p>
            Halaman pembayaran sedang disiapkan. Detail desain dan proses
            pembayaran akan tersedia pada tahap berikutnya.
          </p>
          {course && (
            <div className="payment-course-summary">
              <img src={course.image} alt={course.imageAlt} />
              <div>
                <strong>{course.detailTitle}</strong>
                <span>{course.price}</span>
              </div>
            </div>
          )}
          <a
            className="purchase-button purchase-button-secondary"
            href={course ? `/courses/${course.id}` : "/courses"}
          >
            Kembali ke Detail Kelas
          </a>
        </section>
      </main>
      <Footer groups={footerGroups} />
    </>
  );
}
