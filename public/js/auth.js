// login.html ve register.html için
document.getElementById('loginForm')?.addEventListener('submit', async e=>{
  e.preventDefault();
  const res = await fetch('/api/auth/login', {
    method:'POST',
    headers:{ 'Content-Type':'application/json' },
    body: JSON.stringify({
      email:e.target.email.value,
      password:e.target.password.value
    })
  });
  const data = await res.json();
  if(data.token){
    localStorage.setItem('token', data.token);
    location.href='index.html';
  } else alert(data.msg);
});

document.getElementById('registerForm')?.addEventListener('submit', async e=>{
  e.preventDefault();
  const res = await fetch('/api/auth/register', {
    method:'POST',
    headers:{ 'Content-Type':'application/json' },
    body: JSON.stringify({
      username:e.target.username.value,
      email:e.target.email.value,
      password:e.target.password.value
    })
  });
  const data = await res.json();
  alert(data.msg);
  if(data.msg==='Kayıt başarılı') location.href='login.html';
});
