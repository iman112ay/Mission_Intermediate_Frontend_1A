export default function LoginPage({ onLogin }) {
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email").trim();
    const name = email.split("@")[0];
    onLogin({ email, name });
  }

  return (
    <div className="auth-page">
      <header className="auth-navbar">
        <div className="auth-container">
          <a href="/" className="auth-logo" aria-label="VideoBelajar, beranda">
            video<span>belajar</span>
          </a>
        </div>
      </header>

      <main className="login-section">
        <div className="login-card">
          <div className="login-header">
            <h1>Masuk ke Akun</h1>
            <p>Yuk, lanjutin belajarmu di videobelajar.</p>
          </div>

          <form onSubmit={handleSubmit}>
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
              <label htmlFor="password">
                Kata Sandi <span>*</span>
              </label>
              <input
                type="password"
                id="password"
                name="password"
                autoComplete="current-password"
                required
              />
            </div>

            <div className="forgot">
              <a href="#">Lupa Password?</a>
            </div>

            <button type="submit" className="auth-button btn-login">
              Masuk
            </button>
            <a href="/register" className="auth-button btn-register">
              Daftar
            </a>

            <div className="divider">
              <span>atau</span>
            </div>

            <a href="#" className="auth-button btn-google">
              <span className="google-icon" aria-hidden="true">
                G
              </span>
              Masuk dengan Google
            </a>
          </form>
        </div>
      </main>
    </div>
  );
}
