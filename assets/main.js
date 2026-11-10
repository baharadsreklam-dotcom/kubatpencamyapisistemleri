(function(){
  var WA = '905010286059';

  // Mobil menü
  var t = document.querySelector('.nav-toggle'), n = document.querySelector('.nav');
  if (t && n) t.addEventListener('click', function(){
    var o = n.classList.toggle('open'); t.setAttribute('aria-expanded', o);
  });

  // Google Ads dönüşüm olayları (gtag yüklüyse)
  function track(name){ if (window.gtag) window.gtag('event', name); }
  document.querySelectorAll('a[href^="tel:"]').forEach(function(a){ a.addEventListener('click', function(){ track('telefon_tikla'); }); });
  document.querySelectorAll('a[href*="wa.me"]').forEach(function(a){ a.addEventListener('click', function(){ track('whatsapp_tikla'); }); });

  // WhatsApp teklif formu
  document.querySelectorAll('form.wa-form').forEach(function(f){
    f.addEventListener('submit', function(e){
      e.preventDefault();
      var d = new FormData(f);
      var msg = 'Merhaba Kubat Pen, teklif almak istiyorum.\n\n' +
        'Ad Soyad: ' + (d.get('ad') || '') + '\n' +
        'Telefon: ' + (d.get('tel') || '') + '\n' +
        'Hizmet: ' + (d.get('hizmet') || '') + '\n' +
        (d.get('konum') ? 'Konum: ' + d.get('konum') + '\n' : '') +
        (d.get('mesaj') ? 'Not: ' + d.get('mesaj') : '');
      track('whatsapp_teklif_formu');
      window.open('https://wa.me/' + WA + '?text=' + encodeURIComponent(msg), '_blank', 'noopener');
    });
  });

  // Galeri filtre + lightbox
  var g = document.querySelector('.gallery');
  if (!g) return;
  var items = Array.prototype.slice.call(g.querySelectorAll('a'));
  document.querySelectorAll('.filters button').forEach(function(b){
    b.addEventListener('click', function(){
      document.querySelectorAll('.filters button').forEach(function(x){ x.classList.remove('active'); });
      b.classList.add('active');
      var c = b.getAttribute('data-f');
      items.forEach(function(a){ a.classList.toggle('hide', c !== 'all' && a.getAttribute('data-c') !== c); });
    });
  });
  var lb = document.querySelector('.lightbox'), img = lb.querySelector('img'), cur = 0;
  function vis(){ return items.filter(function(a){ return !a.classList.contains('hide'); }); }
  function show(i){ var v = vis(); cur = (i + v.length) % v.length; img.src = v[cur].href; img.alt = v[cur].querySelector('img').alt; lb.classList.add('open'); }
  items.forEach(function(a){ a.addEventListener('click', function(e){ e.preventDefault(); show(vis().indexOf(a)); }); });
  lb.querySelector('.lb-close').onclick = function(){ lb.classList.remove('open'); };
  lb.querySelector('.lb-prev').onclick = function(){ show(cur - 1); };
  lb.querySelector('.lb-next').onclick = function(){ show(cur + 1); };
  lb.addEventListener('click', function(e){ if (e.target === lb) lb.classList.remove('open'); });
  document.addEventListener('keydown', function(e){
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') lb.classList.remove('open');
    if (e.key === 'ArrowLeft') show(cur - 1);
    if (e.key === 'ArrowRight') show(cur + 1);
  });
})();
