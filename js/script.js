document.querySelector('.submit-email').addEventListener('mousedown', (e) => {
    e.preventDefault();
    document.querySelector('.subscription').classList.add('done');
  });
  
  // variabel
  const waktu_expired = 3 * 60 * 1000; // 3 menit
  const login_btn = document.querySelector('#login-btn');
  const signup_btn = document.querySelector('#signup-btn');
  const logout_btn = document.querySelector('#logout-btn');
  const profile_btn = document.querySelector('#profile-btn');
  const btn_close_login = document.querySelector('#btn_close_login');
  const login_section = document.querySelector('#login_section');
  const bg_login_register = document.querySelector('#bg_login_register');
  const html = document.querySelector('html');
  
  // login
  const login_form = document.querySelector("#form_login");
  const login_email = document.querySelector("#login_email");
  const login_password = document.querySelector("#login_password");
  
  
  // action
  function checkLogin() {
    const dt_login = JSON.parse(localStorage.getItem('login'));
    const session_login = sessionStorage.getItem('login');
    if(session_login == null) {
        logout();
        return false;
    }
    if(dt_login == null) {
        return false;
    }
    const detik_sekarang = new Date().getTime();
    if(detik_sekarang - dt_login.last_login > waktu_expired) {
        logout();
        return false;
    } else {
        // perbaharui last login nya
        const data_login = {
            status: true,
            last_login: new Date().getTime(),
        }
        localStorage.setItem('login', JSON.stringify(data_login));
    }
    return true;
  }
  
  window.addEventListener("load", (e) => {
    // check login atau blm
    const isLogin = checkLogin();
    if(isLogin == true) {
        showNavLogin(true);
    } else {
        showNavLogin(false);
    }
  })
  
  function showSuccessLogin() {
  Swal.fire({
      title: 'Selamat!',
      text: 'Login Berhasil',
      icon: 'success',
  })
  showLoginSection(false);
  emptyModalLogin();
  }
  
  function showLoginSection(show) {
  if(show == true) {
      bg_login_register.classList.add('active');
      login_section.classList.add('active');
      html.classList.add('hidden-ovrflw')
  } else {
      bg_login_register.classList.remove('active');
      login_section.classList.remove('active');
      html.classList.remove('hidden-ovrflw')
  }
  }
  
  login_form.addEventListener("submit", (e) => {
    e.preventDefault();
    validasiLogin(login_email.value,login_password.value,);
  }); 
  
  login_btn.addEventListener('click', (e) => {
    showLoginSection(true);
  });
  btn_close_login.addEventListener('click', (e) => {
    showLoginSection(false);
  });
  