const accountLinks = [
  { label: "Profil Saya", href: "#profil-saya" },
  { label: "Kelas Saya", href: "#kelas-saya" },
  { label: "Pesanan Saya", href: "#pesanan-saya" },
];

function AccountMenuItems({ onLogout }) {
  return (
    <>
      {accountLinks.map((item) => (
        <a className="account-menu-item" href={item.href} key={item.label}>
          {item.label}
        </a>
      ))}
      <button
        className="account-menu-item account-menu-logout"
        type="button"
        onClick={onLogout}
      >
        Keluar <span aria-hidden="true">⇥</span>
      </button>
    </>
  );
}

export default function Header({ user, onLogout }) {
  const isLoggedIn = Boolean(user?.email);

  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <a className="logo" href="/">
          videobelajar
        </a>

        <nav className="desktop-nav" aria-label="Navigasi utama">
          <a href="/courses">Kategori</a>
          {isLoggedIn ? (
            <details className="account-menu">
              <summary
                className="account-menu-trigger"
                aria-label="Buka menu akun"
                title={user.name || user.email}
              >
                <img
                  className="avatar"
                  src="https://i.pravatar.cc/80?img=47"
                  alt="Profil"
                />
              </summary>
              <div className="account-dropdown">
                <AccountMenuItems onLogout={onLogout} />
              </div>
            </details>
          ) : (
            <div className="auth-actions">
              <a className="nav-button nav-login" href="/login">
                Masuk
              </a>
              <a className="nav-button nav-register" href="/register">
                Daftar
              </a>
            </div>
          )}
        </nav>

        <details
          className={`mobile-menu${isLoggedIn ? " mobile-menu--logged-in" : ""}`}
        >
          <summary className="hamburger" aria-label="Buka menu navigasi">
            <span />
            <span />
            <span />
          </summary>
          <nav
            className={`mobile-dropdown${isLoggedIn ? " mobile-dropdown--account" : ""}`}
            aria-label="Navigasi ponsel"
          >
            {isLoggedIn ? (
              <>
                <a href="/courses">Kategori</a>
                <AccountMenuItems onLogout={onLogout} />
              </>
            ) : (
              <>
                <a href="/courses">Kategori</a>
                <div className="mobile-auth-actions">
                  <a className="nav-button nav-login" href="/login">
                    Masuk
                  </a>
                  <a className="nav-button nav-register" href="/register">
                    Daftar
                  </a>
                </div>
              </>
            )}
          </nav>
        </details>
      </div>
    </header>
  );
}
