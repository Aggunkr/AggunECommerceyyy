// Navbar’ı tüm sayfalara ekle
(async function(){
  const isLoggedIn = !!localStorage.getItem('token');
  document.getElementById('navbar').innerHTML = `
  <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
    <div class="container">
      <a class="navbar-brand" href="index.html">Aggun</a>
      <button class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navMenu">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div id="navMenu" class="collapse navbar-collapse">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item"><a class="nav-link" href="index.html">Anasayfa</a></li>
          <li class="nav-item"><a class="nav-link" href="products.html">Ürünler</a></li>
          <li class="nav-item"><a class="nav-link" href="cart.html">Sepet</a></li>
          ${isLoggedIn
            ? `<li class="nav-item"><a class="nav-link" href="profile.html">Profil</a></li>
               <li class="nav-item"><a class="nav-link" id="logout" href="#">Çıkış</a></li>`
            : `<li class="nav-item"><a class="nav-link" href="login.html">Giriş</a></li>
               <li class="nav-item"><a class="nav-link btn btn-primary text-white ms-2" href="register.html">Kayıt Ol</a></li>`}
        </ul>
      </div>
    </div>
  </nav>`;
  const lo = document.getElementById('logout');
  if(lo) lo.onclick = ()=>{ localStorage.removeItem('token'); location.href='index.html'; };
})();
