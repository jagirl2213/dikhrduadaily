document.addEventListener('DOMContentLoaded', () => {
  loadAllLive();
  var btnAll = document.getElementById('refresh-all');
  var btnQuran = document.getElementById('refresh-quran');
  var btnHadith = document.getElementById('refresh-hadith');
  var btnDua = document.getElementById('refresh-dua');
  if (btnAll) btnAll.addEventListener('click', loadAllLive);
  if (btnQuran) btnQuran.addEventListener('click', loadQuranAPI);
  if (btnHadith) btnHadith.addEventListener('click', loadHadithAPI);
  if (btnDua) btnDua.addEventListener('click', loadDuaAPI);

  // Contact form handler (standalone, mailto)
  var contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      var name = document.getElementById('contact-name').value.trim();
      var email = document.getElementById('contact-email').value.trim();
      var whatsapp = document.getElementById('contact-whatsapp').value.trim();
      var message = document.getElementById('contact-message').value.trim();
      var mailto = 'mailto:jagirl2213@gmail.com'
        + '?subject=' + encodeURIComponent('Contact from Dikhr & Dua Daily')
        + '&body=' + encodeURIComponent(
          'Name: ' + name + '\n'
          + 'Email: ' + email + '\n'
          + (whatsapp ? ('WhatsApp: ' + whatsapp + '\n') : '')
          + 'Message: ' + message
        );
      window.location.href = mailto;
      document.getElementById('contact-success').classList.add('show');
      contactForm.reset();
    });
  }

  // Reveal email button handler
  var revealBtn = document.getElementById('reveal-email-btn');
  var emailReveal = document.getElementById('email-reveal');
  if (revealBtn && emailReveal) {
    revealBtn.addEventListener('click', function() {
      emailReveal.style.display = 'block';
      setTimeout(function() {
        emailReveal.style.opacity = '1';
      }, 10);
      revealBtn.style.display = 'none';
    });
  }
});

// Helper: Get random integer between min and max (inclusive)
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// List of surah and their ayah counts (1-indexed)
const surahAyahCounts = [
  7, 286, 200, 176, 120, 165, 206, 75, 129, 109, 123, 111, 43, 52, 99, 128, 111, 110, 98, 135, 112, 78, 118, 64, 77, 227, 93, 88, 69, 60, 34, 30, 73, 54, 45, 83, 182, 88, 75, 85, 54, 53, 89, 59, 37, 35, 38, 29, 18, 45, 60, 49, 62, 55, 78, 96, 29, 22, 24, 13, 14, 11, 11, 18, 12, 12, 30, 52, 52, 44, 28, 28, 20, 56, 40, 31, 50, 40, 46, 42, 29, 19, 36, 25, 22, 17, 19, 26, 30, 20, 15, 21, 11, 8, 8, 19, 5, 8, 8, 11, 11, 8, 3, 9, 5, 4, 7, 3, 6, 3, 5, 4, 5, 6
];

function loadQuranAPI() {
  // Random surah (1-114)
  const surah = getRandomInt(1, 114);
  const ayah = getRandomInt(1, surahAyahCounts[surah - 1]);
  fetch(`https://quranapi.pages.dev/api/${surah}/${ayah}.json`)
    .then(res => res.json())
    .then(data => {
      const arabic = data.arabic1 || data.arabic2 || '';
      const translation = data.english || '';
      const surahName = data.surahName || '';
      const ayahNo = data.ayahNo || ayah;
      document.getElementById('quran-ar').textContent = arabic;
      document.getElementById('quran-en').textContent = translation + ` (${surahName} ${ayahNo})`;
      document.getElementById('quran-source').textContent = 'QuranAPI';
      document.getElementById('quran-source').href = `https://quran.com/${surah}/${ayah}`;
    })
    .catch(() => {
      document.getElementById('quran-ar').textContent = 'Failed to load Quran verse.';
      document.getElementById('quran-en').textContent = '';
      document.getElementById('quran-source').textContent = '';
    });
}

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Hadith from API
function loadHadithAPI() {
  fetch('http://localhost:5000/api/hadith')
    .then(res => res.json())
    .then(data => {
      document.getElementById('hadith-en').textContent = data.english || data.hadith || 'No hadith found.';
      document.getElementById('hadith-source').textContent = data.source || 'Sunnah.com';
      document.getElementById('hadith-source').href = data.source || 'https://sunnah.com/';
    })
    .catch(() => {
      document.getElementById('hadith-en').textContent = 'Failed to load hadith.';
      document.getElementById('hadith-source').textContent = '';
    });
}

// Dua from API
function loadDuaAPI() {
  fetch('http://localhost:5000/api/dua')
    .then(res => res.json())
    .then(data => {
      document.getElementById('dua-ar').textContent = data.arabic || '';
      document.getElementById('dua-en').textContent = data.english || data.dua || 'No dua found.';
      document.getElementById('dua-source').textContent = data.source || 'Duas.org';
      document.getElementById('dua-source').href = data.source || 'https://www.duas.org/';
    })
    .catch(() => {
      document.getElementById('dua-ar').textContent = 'Failed to load dua.';
      document.getElementById('dua-en').textContent = '';
      document.getElementById('dua-source').textContent = '';
    });
}

function loadAllLive() {
  loadQuranAPI();
  loadHadithAPI();
  loadDuaAPI();
}
