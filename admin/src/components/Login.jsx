import React, { useState } from 'react';
import axios from 'axios'; // Pastikan Anda sudah menginstal axios: npm install axios
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  // State untuk menyimpan input username dan password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // State untuk menampilkan pesan error atau sukses
  const [message, setMessage] = useState('');
  const [showPass, setShowPass] = useState(false);
  const navigate=useNavigate()
  // URL endpoint login backend
  const API_URL = 'http://localhost:5000/login'; // Sesuaikan jika perlu

  const handleSubmit = async (e) => {
    e.preventDefault(); // Mencegah form reload halaman

    try {
      // Mengirim data login ke backend menggunakan axios
      const response = await axios.post(API_URL, {
        username,
        password,
      });

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        setMessage('Login Berhasil! Mengalihkan ke Dashboard...');

        // --- 3. Arahkan pengguna ke halaman navigasi utama ---
        navigate('/');

      } else {
        setMessage('Login berhasil, tetapi token tidak diterima.');
      }
      // Di sini Anda bisa mengarahkan pengguna ke halaman dashboard
      // Contoh: history.push('/dashboard');

    } catch (error) {
      // Jika login gagal (misalnya, status 401 Unauthorized)
      const errorMsg = error.response ? error.response.data.message : 'Terjadi kesalahan jaringan.';
      setMessage(`Login Gagal: ${errorMsg}`);
      console.error('Error Login:', error);
    }
  };

  return (
    <div className="login-page">
          <div className="login-card">
            <h2 className="title">LOGIN DULU</h2>
            <p className="subtitle">Login untuk ke dashboard</p>

            <form onSubmit={handleSubmit}>
              {/* Email */}
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
              </div>

              {/* Password */}
              <div className="form-group">
                <label>Password</label>
                <div className="password-field">
                  <input
                    type={showPass ? "text" : "password"} id="password" value={password} onChange={(e) => setPassword(e.target.value)}
            required
                  />
                  <button
                    type="button"
                    className="toggle-btn"
                    onClick={() => setShowPass(!showPass)}
                  >
                    {showPass ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <button type='submit' className="login-btn">Login</button>

            </form>
            {message && (
              <p style={{ marginTop: '20px', color: message.includes('Gagal') ? 'red' : 'green' }}>
                {message}
              </p>
            )}
          </div>
        </div>

    // <div style={{ padding: '20px', maxWidth: '400px', margin: '50px auto', border: '1px solid #ccc', borderRadius: '8px' }}>
    //   <h2>Login Pengguna</h2>
    //   <form onSubmit={handleSubmit}>
    //     <div style={{ marginBottom: '15px' }}>
    //       <label htmlFor="username" style={{ display: 'block', marginBottom: '5px' }}>Username:</label>
    //       <input
    //         type="text"
    //         id="username"
    //         value={username}
    //         onChange={(e) => setUsername(e.target.value)}
    //         required
    //         style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
    //       />
    //     </div>
    //     <div style={{ marginBottom: '15px' }}>
    //       <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>Password:</label>
    //       <input
    //         type="password"
    //         id="password"
    //         value={password}
    //         onChange={(e) => setPassword(e.target.value)}
    //         required
    //         style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
    //       />
    //     </div>
    //     <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
    //       Login
    //     </button>
    //   </form>
    //   {/* Menampilkan pesan */}
    //   {message && (
    //     <p style={{ marginTop: '20px', color: message.includes('Gagal') ? 'red' : 'green' }}>
    //       {message}
    //     </p>
    //   )}
    // </div>
  );
};

export default LoginForm;