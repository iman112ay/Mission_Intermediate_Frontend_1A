export default function Footer({ groups }) {
  return (
    <footer id="footer" className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <a className="logo" href="/">
            videobelajar
          </a>
          <h3>
            Gali Potensi Anda Melalui
            <br />
            Pembelajaran Video di hariesok.id!
          </h3>
          <p>Jl. Usman Effendi No. 50 Lowokwaru, Malang</p>
          <p>+62-877-7123-1234</p>
        </div>

        <div className="footer-links">
          {groups.map((group) => (
            <div key={group.title}>
              <h4>{group.title}</h4>
              {group.links.map((link) => (
                <a href="#" key={link}>
                  {link}
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="container footer-bottom">
        <p>@2023 Gerobak Sayur All Rights Reserved.</p>
        <div className="socials">
          <a href="#" aria-label="LinkedIn">
            in
          </a>
          <a href="#" aria-label="Facebook">
            f
          </a>
          <a href="#" aria-label="Instagram">
            ◎
          </a>
          <a href="#" aria-label="Twitter">
            ♥
          </a>
        </div>
      </div>
    </footer>
  );
}
