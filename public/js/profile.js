(async function(){
  const res = await fetch('/api/users/profile', {
    headers:{ 'Authorization':'Bearer '+localStorage.getItem('token') }
  });
  const user = await res.json();
  const form = document.getElementById('profileForm');
  form.username.value = user.username;
  form.email.value = user.email;

  form.onsubmit = async e=>{
    e.preventDefault();
    await fetch('/api/users/profile', {
      method:'PUT',
      headers:{
        'Content-Type':'application/json',
        'Authorization':'Bearer '+localStorage.getItem('token')
      },
      body: JSON.stringify({
        username: e.target.username.value,
        email:    e.target.email.value
      })
    });
    alert('Güncellendi');
  };
})();
