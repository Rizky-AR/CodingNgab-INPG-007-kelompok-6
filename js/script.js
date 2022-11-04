document.querySelector('.submit-email').addEventListener('mousedown', (e) => {
    e.preventDefault();
    document.querySelector('.subscription').classList.add('done');
  });
  
const waktu_expired = 3 * 60 * 1000; // 3 menit
const login_btn = document.querySelector('#login-btn');
const signup_btn = document.querySelector('#signup-btn');
const logout_btn = document.querySelector('#logout-btn');
const profile_btn = document.querySelector('#profile-btn');
const btn_close_login = document.querySelector('#btn_close_login');
const btn_close_register = document.querySelector('#btn_close_register');
const login_section = document.querySelector('#login_section');
const register_section = document.querySelector('#register_section');
const bg_login_register = document.querySelector('#bg_login_register');
const html = document.querySelector('html');
  
const login_form = document.querySelector("#form_login");
const login_email = document.querySelector("#login_email");
const login_password = document.querySelector("#login_password");

const register_form = document.querySelector("#form_register");
const register_username = document.querySelector("#register_username");
const register_email = document.querySelector("#register_email");
const register_password = document.querySelector("#register_password");
const register_password_konfirmasi = document.querySelector("#register_password_konfirmasi");
  
  
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
        const data_login = {
            status: true,
            last_login: new Date().getTime(),
        }
        localStorage.setItem('login', JSON.stringify(data_login));
    }
    return true;
  }
  
  window.addEventListener("load", (e) => {
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
  register_form.addEventListener("submit", (e) => {
    e.preventDefault();
    validasiRegister(register_username.value,register_email.value,register_password.value,register_password_konfirmasi.value);
  });

logout_btn.addEventListener('click', (e) => {
    e.preventDefault();
    Swal.fire({
        title: 'Anda Yakin?',
        text: "Yakin Ingin Logout?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.isConfirmed) {
            logout();
            showSuccessLogout();
            showNavLogin(false);
        }
    })
});

signup_btn.addEventListener('click', (e) => {
    showRegisterSection(true);
});
btn_close_register.addEventListener('click', (e) => {
    showRegisterSection(false);
});

function validasiRegister(username, email, password, password_konfirmasi) {
    if (username.length < 5 || username.length > 10) {
      return showValidationError("Panjang username harus 5-10 karakter");
    }
    let usernameContainsNumber = false;
    let usernameContainsAlfabet = false;
    let usernameContainsOther = false;
    for (i = 0; i < username.length; i++) {
      let code = username.charCodeAt(i);
      if (code > 47 && code < 58) {
        usernameContainsNumber = true;
      } else if ((code > 64 && code < 91) || (code > 96 && code < 123)) {
        usernameContainsAlfabet = true;
      } else {
        usernameContainsOther = true;
      }
    }
    if (usernameContainsOther == true) {
      return showValidationError(
        "Username Tidak boleh ada spasi dan karakter lainnya"
      );
    }
    if (!usernameContainsAlfabet || !usernameContainsNumber) {
      return showValidationError("Username harus ada huruf dan angka");
    }

  var karakterAt=email.indexOf("@");
	var karakterTitik=email.indexOf(".");
	if (karakterAt < 1 || karakterTitik < 1) {
        return showValidationError("Email Tidak valid");
    }
  
    if (password.length < 6 || password.length > 12) {
      return showValidationError("Panjang password harus 6-12 karakter");
    }
    let passwordContainsNumber = false;
    let passwordContainsAlfabet = false;
    let passwordContainsOther = false;
    let passwordCapitalAflabet = 0;
    for (i = 0; i < password.length; i++) {
      let code = password.charCodeAt(i);
      if (code > 47 && code < 58) {
        passwordContainsNumber = true;
      } else if (code > 96 && code < 123) {
        passwordContainsAlfabet = true;
      } else if (code > 64 && code < 91) {
        passwordCapitalAflabet = passwordCapitalAflabet + 1;
      } else {
        passwordContainsOther = true;
      }
    }
    if (passwordContainsOther == true) {
      return showValidationError(
        "password Tidak boleh ada spasi dan karakter lainnya"
      );
    }
    if (!passwordContainsAlfabet ||!passwordContainsNumber ||passwordCapitalAflabet != 1) {
      return showValidationError(
        "password harus ada huruf, angka dan satu huruf kapital"
      );
    }
    if (password_konfirmasi != password) {
      return showValidationError("Konfirmasi Password tidak sesuai");
    }
    registerNewAccount(username, email, password);
}
function validasiLogin(email, password) {
    const data = JSON.parse(localStorage.getItem('account'));
    if(data == null) {
        return showValidationError('Akun belum ada, silahkan registrasi akun dulu')
    }
    if(email != data.email || password != data.password) {
        return showValidationError('Email atau Password SALAH')
    }
    const data_login = {
        status: true,
        last_login: new Date().getTime(),
    }
    localStorage.setItem('login', JSON.stringify(data_login));
    sessionStorage.setItem('login', true);
    showSuccessLogin();
    showNavLogin(true);
}
function registerNewAccount(username, email, password) {
    const data = {
      username: username,
      email: email,
      password: password,
    };
    localStorage.setItem("account", JSON.stringify(data));
    showSuccessRegistration();
}
function showValidationError(msg) {
    Swal.fire({
        title: 'Oupss!',
        text: msg,
        icon: 'error',
    })
}

function showSuccessRegistration() {
    Swal.fire({
        title: 'Selamat!',
        text: 'Akun Berhasil Ditambahkan!!',
        icon: 'success',
    })
    showRegisterSection(false);
    emptyModalRegister();
}

function showSuccessLogout() {
    Swal.fire({
        title: 'Selamat!',
        text: 'Anda Berhasil Logout',
        icon: 'success',
    })
}

function showRegisterSection(show) {
    if(show == true) {
        bg_login_register.classList.add('active');
        register_section.classList.add('active');
        html.classList.add('hidden-ovrflw')
      } else {
        bg_login_register.classList.remove('active');
        register_section.classList.remove('active');
        html.classList.remove('hidden-ovrflw')
    }
}

function emptyModalRegister() {
    register_username.value = "";
    register_email.value = "";
    register_password.value = "";
    register_password_konfirmasi.value = "";
}
function emptyModalLogin() {
    login_email.value = "";
    login_password.value = "";
}

function showNavLogin(isLogin = false) {
    if(isLogin == false) {
        login_btn.classList.remove('d-none');
        signup_btn.classList.remove('d-none');
        logout_btn.classList.add('d-none');
        profile_btn.classList.add('d-none');
    } else {
        const dt_login = JSON.parse(localStorage.getItem('account'));
        profile_btn.innerHTML = '';
        profile_btn.innerHTML = dt_login.username;
        login_btn.classList.add('d-none');
        signup_btn.classList.add('d-none');
        logout_btn.classList.remove('d-none');
        profile_btn.classList.remove('d-none');
    }
}

function logout() {
    localStorage.removeItem('login');
    sessionStorage.removeItem('login');
}
const darkBtn = document.querySelector('.icon');
const body = document.querySelector('body');

const darkmode = () =>{
  body.classList.toggle('dark')
}

darkBtn.addEventListener('click', () =>{
  setDarkMode = localStorage.getItem('dark');
  if(setDarkMode !== "on"){
    darkmode();
    setDarkMode = localStorage.setItem('dark', 'on');
  }else{
    darkmode();
    setDarkMode = localStorage.setItem('dark', 'null');
  }

});

let setDarkMode = localStorage.getItem('dark');
if(setDarkMode === 'on'){
  darkmode();
}