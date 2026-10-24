
const screens = [...document.querySelectorAll('.screen')];

function go(id) {
  screens.forEach(screen => {
    screen.classList.toggle('active', screen.id === id);
  });

  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// التنقل بين الصفحات وتشغيل الأغنية عند فتح الهدية
document.querySelectorAll('[data-go]').forEach(button => {
  button.addEventListener('click', async () => {
    const targetPage = button.dataset.go;

    go(targetPage);

    if (targetPage === 'letter') {
      try {
        await audio.play();
        updateMusicStatus(true);
      } catch (error) {
        note.textContent =
          'اضغطي على زر التشغيل ♡ لتشغيل الأغنية.';
        console.error('تعذر تشغيل الأغنية:', error);
      }
    }
  });
});

// النوافذ الخاصة بالأمنيات
const modal = document.getElementById('modal');

document.querySelectorAll('[data-wish]').forEach(button => {
  button.addEventListener('click', () => {
    document.getElementById('modalText').textContent =
      button.dataset.wish;

    modal.classList.add('open');
  });
});

function closeModal() {
  modal.classList.remove('open');
}

document.getElementById('close').addEventListener('click', closeModal);
document.getElementById('ok').addEventListener('click', closeModal);

modal.addEventListener('click', event => {
  if (event.target === modal) {
    closeModal();
  }
});

// مشغل الأغنية
const audio = document.getElementById('song');
const playButton = document.getElementById('playBtn');
const note = document.getElementById('musicNote');

function updateMusicStatus(isPlaying) {
  playButton.textContent = isPlaying ? 'Ⅱ' : '▶';
  note.textContent = isPlaying
    ? 'الأغنية شغالة ♡'
    : 'الأغنية متوقفة مؤقتًا.';
}

playButton.addEventListener('click', async () => {
  try {
    if (audio.paused) {
      await audio.play();
      updateMusicStatus(true);
    } else {
      audio.pause();
      updateMusicStatus(false);
    }
  } catch (error) {
    note.textContent =
      'ضيفي ملف MP3 باسم until-i-found-you.mp3 في نفس المجلد، ثم جرّبي التشغيل.';
    console.error('تعذر تشغيل الأغنية:', error);
  }
});

// مزامنة حالة الزر مع الأغنية
audio.addEventListener('play', () => updateMusicStatus(true));
audio.addEventListener('pause', () => {
  if (!audio.ended) updateMusicStatus(false);
});

// تأثير القلوب والنجوم
function sparkles(number) {
  for (let i = 0; i < number; i++) {
    const element = document.createElement('span');

    element.className = 'floaty';
    element.textContent = ['♡', '✦', '✧', '♥'][
      Math.floor(Math.random() * 4)
    ];

    element.style.left = Math.random() * 100 + 'vw';

    element.style.color = [
      '#f3a9ce',
      '#c7b8ff',
      '#fff1fb'
    ][Math.floor(Math.random() * 3)];

    element.style.animationDelay = Math.random() + 's';
    element.style.fontSize = (14 + Math.random() * 20) + 'px';

    document.body.appendChild(element);

    setTimeout(() => element.remove(), 4000);
  }
}

document.getElementById('sparkleBtn').addEventListener('click', () => {
  sparkles(45);
});

// إعادة البداية
document.getElementById('restart').addEventListener('click', () => {
  go('home');
});
