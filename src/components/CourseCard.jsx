export default function CourseCard({ course }) {
  return (
    <a className="course-card-link" href={`/courses/${course.id}`}>
      <article className="course-card">
        <img src={course.image} alt={course.imageAlt} />
        <div className="course-body">
          <h3>{course.title}</h3>
          <p className="description">{course.description}</p>
          <div className="instructor">
            <img src={course.instructorImage} alt="" />
            <div>
              <strong>{course.instructorName}</strong>
              <small>{course.instructorTitle}</small>
            </div>
          </div>
          <div className="course-meta">
            <span className="rating">
              ★★★<i>★★</i>{" "}
              <u>
                {course.rating} ({course.reviewCount})
              </u>
            </span>
            <strong className="price">{course.price}</strong>
          </div>
        </div>
      </article>
    </a>
  );
}
