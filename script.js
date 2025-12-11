document.addEventListener('DOMContentLoaded', () => {
  // --- Splash Screen Logic ---
  const splashScreen = document.getElementById('splash-screen');
  const enterButton = document.getElementById('enter-btn');

  if (splashScreen && enterButton) {
    enterButton.addEventListener('click', () => {
      splashScreen.classList.add('hidden');
      // Add 'loaded' class to body after splash screen fades out to trigger animations
      setTimeout(() => {
        document.body.classList.add('loaded');
      }, 800); // Delay matches the elegant curtain-up transition
    });
  }

  // --- Sticky Header on Scroll ---
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // --- Single-Page Navigation Logic ---
  const navLinks = document.querySelectorAll('[data-link]');
  const pages = document.querySelectorAll('.page');
  const mainNavLinks = document.querySelectorAll('nav a[data-link]');

  function showPage(targetId) {
    const targetPage = document.getElementById(targetId);
    const currentPage = document.querySelector('.page.active');

    if (!targetPage || (currentPage && currentPage.id === targetId)) {
      return; // Jangan lakukan apa-apa jika target tidak ada atau sama dengan halaman saat ini
    }

    function switchPages() {
      if (currentPage) {
        currentPage.classList.remove('active');
      }
      targetPage.classList.add('active');
    }

    if (currentPage) {
      currentPage.classList.add('is-exiting');
      currentPage.addEventListener('animationend', () => {
        currentPage.classList.remove('is-exiting');
        switchPages();
      }, { once: true });
    } else {
      switchPages(); // Jika tidak ada halaman aktif, langsung tampilkan
    }

    // Update Navigasi (bisa berjalan paralel)
    mainNavLinks.forEach(link => link.classList.remove('active'));

    // 4. Tandai tautan navigasi yang aktif
    const activeNavLink = document.querySelector(`nav a[data-target="${targetId}"]`);
    if (activeNavLink) {
      activeNavLink.classList.add('active');
    }

    // Jika halaman yang dituju adalah kuis, mulai kuisnya
    if (targetId === 'kuis') {
      startQuiz();
    }
  }

  // Tambahkan event listener untuk semua elemen dengan atribut [data-link]
  navLinks.forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault(); // Mencegah browser memuat ulang halaman
      const targetId = link.dataset.target;
      if (targetId) {
        showPage(targetId);
        window.scrollTo(0, 0); // Gulir ke atas halaman saat berpindah
      }
    });
  });

  // --- Back Button Logic ---
  const backButtons = document.querySelectorAll('.back-btn');
  backButtons.forEach(button => {
    button.addEventListener('click', () => {
      showPage('home'); // Selalu kembali ke halaman beranda
      window.scrollTo(0, 0);
    });
  });

  // --- Gallery Modal Logic ---
  const motifData = {
    'mega-mendung': {
      title: 'Batik Mega Mendung',
      description: 'Berasal dari Cirebon, motif ini adalah hasil akulturasi budaya dengan Tiongkok. Pola awan yang megah melambangkan kesabaran, ketenangan, dan pembawa hujan yang memberi kehidupan. Gradasi tujuh warna birunya secara tradisional melambangkan tujuh lapisan langit.',
      image: 'https://bcaf.telkomuniversity.ac.id/wp-content/uploads/2024/06/028577700_1443707050-Batik-Mega-Mendung-1024x768.webp'
    },
    'kawung': {
      title: 'Batik Kawung',
      description: 'Salah satu motif batik tertua dari Kesultanan Mataram, terinspirasi dari buah kawung (aren) yang dibelah empat. Pola ini melambangkan empat penjuru mata angin atau sumber tenaga alam. Filosofinya adalah tentang pengendalian diri, hati yang bersih, dan harapan agar manusia selalu ingat asal-usulnya.',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwgs9uoavwCslxknlu-c9nZfPVFeanj7qKrg&s'
    },
    'parang': {
      title: 'Batik Parang',
      description: 'Motif Parang adalah simbol kekuasaan dan kekuatan, berasal dari keraton Mataram. Pola diagonal seperti huruf "S" yang tak terputus menggambarkan ombak samudra yang melambangkan semangat yang tak pernah padam. Dahulu, motif ini hanya boleh dikenakan oleh raja dan bangsawan sebagai tanda keagungan.',
      image: 'https://static.vecteezy.com/system/resources/thumbnails/048/387/544/small/batik-parang-style-illustration-for-background-wallpaper-and-clothes-textile-free-vector.jpg'
    },
    'tambal': {
      title: 'Batik Tambal',
      description: 'Motif ini secara harfiah berarti "menambal". Terdiri dari gabungan berbagai motif lain dalam bidang-bidang geometris, seperti kain perca. Filosofinya adalah untuk memperbaiki atau menyembuhkan sesuatu yang kurang baik. Di masa lalu, kain ini dipercaya memiliki kekuatan penyembuhan bagi orang sakit.',
      image: 'https://upload.wikimedia.org/wikipedia/id/7/76/BatikTambal.JPG'
    },
    'sekar-jagad': {
      title: 'Batik Sekar Jagad',
      description: 'Berasal dari Surakarta dan Yogyakarta, "Sekar Jagad" berarti "Bunga Dunia". Motif ini terdiri dari kumpulan pola-pola yang menyerupai peta dunia, melambangkan keindahan dan keragaman. Filosofinya adalah tentang keharmonisan dan keindahan hidup yang penuh warna.',
      image: 'https://blog.knitto.co.id/wp-content/uploads/2024/01/Batik-Sekar-Jagad-Warna-Klasik-_-Sumber_-Freepik.jpg'
    },
    'tenun': {
      title: 'Batik Motif Tenun',
      description: 'Ini adalah contoh inovasi di mana motif yang terinspirasi dari kain tenun tradisional, seperti dari Sumatera atau Nusa Tenggara, diaplikasikan dalam teknik batik. Pola geometris yang kaya dan warna-warna cerah mencerminkan kekayaan budaya, keterampilan, dan persatuan antar daerah.',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTElPO_7hpy0lEogv5wGEZoQUIz0pTF1B75EQ&s'
    },
    'tujuh-rupa': {
      title: 'Batik Tujuh Rupa',
      description: 'Berasal dari Pekalongan, kota pelabuhan yang dinamis, motif ini sangat kental dengan nuansa alam pesisir. Umumnya menampilkan gambar hewan atau tumbuhan seperti bunga dan daun dengan gradasi warna yang kaya, mencerminkan akulturasi budaya lokal dengan pendatang, terutama dari Tiongkok.',
      image: 'https://fitinline.com/data/article/20220321/Batik-Tujuh-Rupa-001.jpg'
    },
    'gentongan': {
      title: 'Batik Gentongan',
      description: 'Motif khas dari Madura ini mendapatkan namanya dari penggunaan gentong (tempayan gerabah) untuk merendam kain dalam proses pewarnaan. Warnanya cenderung berani dan tegas seperti merah, kuning, dan hijau, dengan motif yang sering terinspirasi dari flora dan fauna lokal yang ekspresif.',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQykp0jOfCHOYSX0rNbQPYMyLC04oRtOWk7IA&s'
    },
    'lasem': {
      title: 'Batik Lasem',
      description: 'Berasal dari Lasem, Rembang, batik ini adalah simbol kuat akulturasi budaya Jawa dan Tionghoa. Warnanya didominasi merah "darah ayam" yang khas dan motifnya sering menampilkan naga, burung hong (phoenix), serta bunga krisan (seruni) yang sarat akan makna kemakmuran dan kebahagiaan.',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5b3srF1YC_DqPgnHk5o5JcBtY76SaeifDDA&s'
    },
    'pringgondani': {
      title: 'Batik Pringgondani',
      description: 'Motif yang identik dengan Magetan, Jawa Timur ini didominasi oleh gambar rumpun bambu atau "pring". Filosofinya melambangkan keteguhan, kerukunan, dan kehidupan yang lurus, sederhana, namun kuat seperti bambu yang lentur tapi tidak mudah patah.',
      image: 'https://upload.wikimedia.org/wikipedia/id/e/e1/BatikPringgondani.JPG'
    },
    'sidoasih': {
      title: 'Batik Sidoasih',
      description: 'Berasal dari keraton Surakarta, nama "Sidoasih" berasal dari kata "sido" (jadi/menjadi) dan "asih" (kasih sayang). Motif ini melambangkan harapan agar pemakainya selalu dilimpahi cinta kasih dan dapat hidup rukun. Sering digunakan dalam upacara pernikahan.',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCsKi7jPWGn9WEpqVIGPgh9Z4tfOjRlcrVAA&s'
    },
    'ulamsari': {
      title: 'Batik Ulamsari Mas',
      description: 'Motif khas dari Bali ini menampilkan gambar ikan dan udang dalam komposisi yang dinamis. Motif ini melambangkan sumber kehidupan dan kesejahteraan masyarakat pesisir, khususnya para nelayan, serta rasa syukur terhadap hasil laut.',
      image: 'https://i.pinimg.com/564x/fb/d8/16/fbd816929d3c4df72a9c54e6ef9d43f5.jpg'
    },
    'dayak': {
      title: 'Batik Motif Dayak',
      description: 'Batik Kalimantan ini mengadopsi ukiran dan corak khas suku Dayak. Motifnya seringkali abstrak, mistis, dan terinspirasi dari alam serta kepercayaan lokal, seperti Batang Garing (pohon kehidupan) yang melambangkan hubungan vertikal antara manusia dengan Tuhan.',
      image: 'https://cnc-magazine.oramiland.com/parenting/images/Batik_Dayak.width-800.format-webp.webp'
    },
    'cendrawasih': {
      title: 'Batik Cendrawasih',
      description: 'Sebagai ikon kebanggaan Papua, burung Cendrawasih menjadi motif utama pada batik dari daerah ini. Dengan warna-warna cerah, motif ini melambangkan keindahan, keanggunan, dan kekayaan alam Papua yang eksotis dan tak ternilai.',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQk2I_UVCZk-xKNaSQ-plpASgn1TEBktk3HLQ&s'
    }
  };

  const galleryItems = document.querySelectorAll('.gallery-item');
  const modal = document.getElementById('motif-modal');
  const closeModalBtn = document.querySelector('.close-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalImage = document.getElementById('modal-image');
  const modalDescription = document.getElementById('modal-description');

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const motifKey = item.dataset.motif;
      const data = motifData[motifKey];
      if (data) {
        modalTitle.textContent = data.title;
        modalImage.innerHTML = `<img src="${data.image}" alt="${data.title}">`;
        modalDescription.textContent = data.description;
        modal.style.display = 'flex';
      }
    });
  });

  closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  window.addEventListener('click', (event) => {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  });

  // --- Gallery Filter Logic ---
  const filterButtons = document.querySelectorAll('.filter-btn');
  const allGalleryItems = document.querySelectorAll('.gallery-item');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filter = button.dataset.filter;

      allGalleryItems.forEach(item => {
        // Gunakan animasi untuk transisi yang lebih halus
        item.style.display = 'none';
        if (filter === 'all' || item.dataset.region === filter) {
          item.style.display = 'block';
        }
      });
    });
  });

  // --- Basic Quiz Logic ---
  const quizData = [
    { question: "Dari daerah manakah motif Mega Mendung yang terkenal dengan gradasi warna birunya berasal?", answers: ["Yogyakarta", "Cirebon", "Pekalongan", "Bali"], correct: 1 },
    { question: "Motif batik yang melambangkan kekuatan dan kesinambungan, serta dahulu hanya boleh dikenakan oleh raja adalah...", answers: ["Kawung", "Tambal", "Parang", "Sekar Jagad"], correct: 2 },
    { question: "Filosofi 'menambal' atau memperbaiki sesuatu yang rusak terdapat pada motif batik...", answers: ["Tambal", "Mega Mendung", "Kawung", "Tenun"], correct: 0 },
    { question: "Motif 'Sekar Jagad' secara harfiah berarti 'Bunga Dunia'. Dari daerah manakah motif ini berasal?", answers: ["Madura", "Sumatera", "Yogyakarta & Bali", "Cirebon"], correct: 2 },
    { question: "Proses pewarnaan yang menggunakan gentong (tempayan gerabah) adalah ciri khas dari batik...", answers: ["Lasem", "Gentongan", "Pringgondani", "Tujuh Rupa"], correct: 1 },
    { question: "Motif batik yang merupakan simbol akulturasi budaya Jawa dan Tionghoa, dengan warna dominan merah darah ayam adalah...", answers: ["Parang", "Kawung", "Lasem", "Tambal"], correct: 2 },
    { question: "Gambar rumpun bambu ('pring') yang melambangkan keteguhan dan kerukunan adalah ciri utama dari motif...", answers: ["Pringgondani", "Mega Mendung", "Sekar Jagad", "Gentongan"], correct: 0 },
    { question: "Kota di Jawa Tengah yang terkenal dengan motif 'Tujuh Rupa' yang kental dengan nuansa alam adalah...", answers: ["Surakarta", "Rembang", "Magetan", "Pekalongan"], correct: 3 },
    { question: "Pola empat lingkaran lonjong yang saling berpotongan, terinspirasi dari buah aren, adalah ciri dari motif...", answers: ["Kawung", "Parang", "Tambal", "Lasem"], correct: 0 },
    { question: "Motif yang sering menampilkan gambar naga atau burung hong (phoenix) adalah pengaruh kuat dari budaya Tionghoa pada batik...", answers: ["Gentongan", "Lasem", "Pringgondani", "Mega Mendung"], correct: 1 }
  ];

  let shuffledQuestions = [];
  const questionEl = document.getElementById('question');
  const answersEl = document.getElementById('answers');
  const quizResultEl = document.getElementById('quiz-result');
  const scoreValueEl = document.getElementById('score-value');
  const restartQuizBtn = document.getElementById('restart-quiz');
  const questionContainer = document.getElementById('question-container');

  let currentQuestionIndex = 0;
  let score = 0;

  function startQuiz() {
    // Acak urutan pertanyaan setiap kali kuis dimulai
    shuffledQuestions = quizData.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    score = 0;
    quizResultEl.style.display = 'none';
    questionContainer.style.display = 'block';
    document.querySelectorAll('.answer-btn').forEach(btn => {
        btn.classList.remove('correct', 'incorrect');
        btn.disabled = false;
    });
    showQuizQuestion();
  }

  function showQuizQuestion() {
    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    questionEl.textContent = currentQuestion.question;
    answersEl.innerHTML = '';
    currentQuestion.answers.forEach((answer, index) => {
      const button = document.createElement('button');
      button.textContent = answer;
      button.classList.add('answer-btn');
      button.addEventListener('click', () => selectAnswer(index));
      answersEl.appendChild(button);
    });
  }

  function selectAnswer(selectedIndex) {
    const correctIndex = shuffledQuestions[currentQuestionIndex].correct;
    const answerButtons = document.querySelectorAll('.answer-btn');

    // Nonaktifkan semua tombol
    answerButtons.forEach(button => button.disabled = true);

    // Beri tanda pada jawaban yang benar dan salah
    if (selectedIndex === correctIndex) {
      score++;
      answerButtons[selectedIndex].classList.add('correct');
    } else {
      answerButtons[selectedIndex].classList.add('incorrect');
      answerButtons[correctIndex].classList.add('correct');
    }

    // Tunggu sejenak sebelum ke pertanyaan berikutnya
    setTimeout(() => {
      currentQuestionIndex++;
      if (currentQuestionIndex < shuffledQuestions.length) {
        showQuizQuestion();
      } else {
        showResults();
      }
    }, 1500); // Jeda 1.5 detik
  }

  function showResults() {
    questionContainer.style.display = 'none';
    quizResultEl.style.display = 'block';

    const scoreDisplay = document.getElementById('score');
    const feedbackEl = document.getElementById('feedback');
    const percentage = (score / shuffledQuestions.length) * 100;
    let title = '';
    let feedback = '';

    if (percentage <= 30) {
      title = 'Pemula Batik';
      feedback = 'Perjalanan Anda baru saja dimulai! Terus jelajahi galeri untuk mengenal lebih banyak motif.';
    } else if (percentage <= 60) {
      title = 'Pemerhati Budaya';
      feedback = 'Pengetahuan Anda cukup baik! Anda memiliki ketertarikan yang tulus pada warisan batik.';
    } else if (percentage <= 90) {
      title = 'Penggemar Batik Sejati';
      feedback = 'Luar biasa! Anda benar-benar memahami kekayaan dan makna di balik motif-motif batik.';
    } else {
      title = 'Ahli Batik Nusantara';
      feedback = 'Selamat! Pengetahuan Anda tentang batik sangat mendalam. Anda adalah seorang maestro!';
    }

    scoreDisplay.innerHTML = `<div class="score-title">${title}</div><div class="score-value">Skor Anda: ${score}/${shuffledQuestions.length}</div>`;
    feedbackEl.textContent = feedback;
  }

  restartQuizBtn.addEventListener('click', startQuiz);
});