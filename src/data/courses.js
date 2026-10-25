const sharedCourseDetails = {
  title: "Big 4 Auditor Financial Analyst",
  description:
    "Mulai transformasi dengan instruktur profesional, harga yang terjangkau, dan...",
  instructorName: "Jenna Ortega",
  instructorTitle: "Senior Accountant di Gojek",
  rating: "3.5",
  reviewCount: 86,
  price: "Rp 300K",
  priceValue: 300000,
};

const courseImages = [
  {
    detailTitle:
      "Gapai Karier Impianmu sebagai Seorang UI/UX Designer & Product Manager.",
    curriculum: [
      {
        title: "Introduction to HR",
        lessons: [
          { title: "Pengenalan dasar dan ruang lingkup", duration: "12 Menit" },
          { title: "Memahami kebutuhan pengguna", duration: "12 Menit" },
          { title: "Menyusun strategi produk", duration: "12 Menit" },
        ],
      },
      {
        title: "Dasar UI/UX Design",
        lessons: [
          { title: "Riset dan persona pengguna", duration: "18 Menit" },
          { title: "Membuat user journey", duration: "15 Menit" },
        ],
      },
      {
        title: "Product Management",
        lessons: [
          { title: "Validasi ide produk", duration: "16 Menit" },
          { title: "Menyusun roadmap produk", duration: "20 Menit" },
        ],
      },
      {
        title: "Proyek Akhir",
        lessons: [
          { title: "Mempresentasikan hasil proyek", duration: "25 Menit" },
        ],
      },
    ],
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Laptop dan aktivitas belajar",
    instructorImage: "https://i.pravatar.cc/80?img=32",
    studyArea: "Digital & Teknologi",
    durationHours: 3,
  },
  {
    detailTitle: "Bangun Kebiasaan Belajar dan Perencanaan yang Lebih Efektif.",
    image:
      "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Menulis catatan belajar",
    instructorImage: "https://i.pravatar.cc/80?img=47",
    studyArea: "Pengembangan Diri",
    durationHours: 5,
    price: "Rp 150K",
    priceValue: 150000,
  },
  {
    detailTitle: "Pahami Analisis Keuangan untuk Keputusan Bisnis yang Tepat.",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Analisis keuangan",
    instructorImage: "https://i.pravatar.cc/80?img=12",
    studyArea: "Bisnis Manajemen",
    durationHours: 8,
    price: "Rp 650K",
    priceValue: 650000,
  },
  {
    detailTitle: "Kembangkan Strategi Pemasaran Digital yang Berdampak.",
    image:
      "https://images.unsplash.com/photo-1516321165247-4aa89a48be28?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Bekerja menggunakan laptop",
    instructorImage: "https://i.pravatar.cc/80?img=25",
    studyArea: "Pemasaran",
    durationHours: 4,
  },
  {
    detailTitle: "Kolaborasi Tim dan Manajemen Proyek secara Profesional.",
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Diskusi pekerjaan",
    instructorImage: "https://i.pravatar.cc/80?img=5",
    studyArea: "Bisnis Manajemen",
    durationHours: 6,
    price: "Rp 450K",
    priceValue: 450000,
  },
  {
    detailTitle: "Tingkatkan Produktivitas dengan Kebiasaan Kerja yang Sehat.",
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Kopi dan laptop",
    instructorImage: "https://i.pravatar.cc/80?img=16",
    studyArea: "Pengembangan Diri",
    durationHours: 2,
  },
  {
    detailTitle: "Pelajari Riset Pasar dan Perencanaan Bisnis dari Dasar.",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Peta dan perlengkapan perjalanan",
    instructorImage: "https://i.pravatar.cc/80?img=44",
    studyArea: "Pemasaran",
    durationHours: 10,
    price: "Rp 650K",
    priceValue: 650000,
  },
  {
    detailTitle: "Kuasai Teknik Mencatat dan Menyusun Ide dengan Jelas.",
    image:
      "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Catatan dan perencanaan",
    instructorImage: "https://i.pravatar.cc/80?img=9",
    studyArea: "Digital & Teknologi",
    durationHours: 7,
    price: "Rp 150K",
    priceValue: 150000,
  },
  {
    detailTitle: "Susun Dokumen dan Laporan Profesional dengan Efektif.",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Menulis dokumen",
    instructorImage: "https://i.pravatar.cc/80?img=11",
    studyArea: "Bisnis Manajemen",
    durationHours: 3,
  },
];

export const courses = courseImages.map((course, index) => ({
  ...sharedCourseDetails,
  detailTitle: course.detailTitle || sharedCourseDetails.title,
  ...course,
  id: index + 1,
}));
