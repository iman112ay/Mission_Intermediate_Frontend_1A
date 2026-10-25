export default function RegisterPage({ onRegister }) {
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const password = formData.get("password");
    const confirmPassword = formData.get("konfirmasi-password");

    if (password !== confirmPassword) {
      event.currentTarget.elements.namedItem("konfirmasi-password").setCustomValidity(
        "Konfirmasi kata sandi harus sama.",
      );
      event.currentTarget.reportValidity();
      return;
    }

    const email = formData.get("email").trim();
    const name = formData.get("nama").trim();
    onRegister({ email, name });
  }

  return (
    <div className="auth-page">
      <header className="auth-navbar">
        <div className="auth-container">
          <a href="/" className="auth-logo" aria-label="VideoBelajar, beranda">
            <span>video</span>
            <span>belajar</span>
          </a>
        </div>
      </header>

      <main className="register-section">
        <div className="register-card">
          <div className="register-header">
            <h1>Pendaftaran Akun</h1>
            <p>Yuk, daftarkan akunmu sekarang juga!</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="nama">
                Nama Lengkap <span>*</span>
              </label>
              <input
                type="text"
                id="nama"
                name="nama"
                autoComplete="name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">
                E-Mail <span>*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="nomor-hp">
                No. HP <span aria-hidden="true">*</span>
              </label>
              <div className="phone-wrapper">
                <div className="country-code">
                  <div className="flag" aria-hidden="true">
                    <span className="flag-red" />
                    <span className="flag-white" />
                  </div>
                  <select name="kode-negara" aria-label="Kode negara">
                    <option>+62</option>
                    <option>+60</option>
                    <option>+65</option>
                  </select>
                </div>
                <input
                  type="tel"
                  id="nomor-hp"
                  name="nomor-hp"
                  className="phone-input"
                  autoComplete="tel-national"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">
                Kata Sandi <span>*</span>
              </label>
              <div className="password-wrapper">
                <input
                  type="password"
                  id="password"
                  name="password"
                  autoComplete="new-password"
                  required
                />
                <span className="password-icon" aria-hidden="true">
                  ◉
                </span>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="confirm-password">
                Konfirmasi Kata Sandi <span>*</span>
              </label>
              <div className="password-wrapper">
                <input
                  type="password"
                  id="confirm-password"
                  name="konfirmasi-password"
                  autoComplete="new-password"
                  onChange={(event) => event.currentTarget.setCustomValidity("")}
                  required
                />
                <span className="password-icon" aria-hidden="true">
                  ◉
                </span>
              </div>
            </div>

            <div className="forgot-password">
              <a href="#">Lupa Password?</a>
            </div>

            <button type="submit" className="auth-button btn-register">
              Daftar
            </button>
            <a href="/login" className="auth-button btn-login">
              Masuk
            </a>

            <div className="divider">
              <span />
              <p>atau</p>
              <span />
            </div>

            <button type="button" className="auth-button btn-google">
              <span className="google-icon" aria-hidden="true">
                G
              </span>
              Daftar dengan Google
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
