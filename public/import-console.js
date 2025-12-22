// Скопіюйте цей код і вставте в консоль браузера (F12) на сторінці http://localhost:5173/nannies
// Або відкрийте будь-яку сторінку вашого застосунку

(async function importNannies() {
  try {
    // Імпортуємо Firebase
    const { initializeApp } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js');
    const { getDatabase, ref, set } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js');

    const firebaseConfig = {
      apiKey: "AIzaSyBhIZaEAJZe-q7R3wNkuzNeEIZQeNnRtI4",
      authDomain: "nanny-709dc.firebaseapp.com",
      databaseURL: "https://nanny-709dc-default-rtdb.europe-west1.firebasedatabase.app",
      projectId: "nanny-709dc",
      storageBucket: "nanny-709dc.firebasestorage.app",
      messagingSenderId: "221473095034",
      appId: "1:221473095034:web:65c72fe726aee1955d6ac3"
    };

    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);

    // Дані нянь (перші 3 для прикладу, додайте решту)
    const nannies = [
      {
        "name": "Anna Shevchenko",
        "avatar_url": "https://ftp.goit.study/img/avatars/23.jpg",
        "birthday": "1996-04-10T22:25:57.010+00:00",
        "experience": "5 years",
        "reviews": [
          {
            "reviewer": "Olga K.",
            "rating": 5,
            "comment": "Anna is wonderful! My kids loved her and she was always punctual."
          },
          {
            "reviewer": "Petr S.",
            "rating": 4,
            "comment": "She's great, but sometimes she had to reschedule on short notice."
          }
        ],
        "education": "Bachelor's in Early Childhood Education, First Aid Certified",
        "kids_age": "1 to 6 years old",
        "price_per_hour": 15,
        "location": "Kyiv, Ukraine",
        "about": "I love children and have been working with them for over 5 years. I believe in creating a positive and nurturing environment for kids. I also love outdoor activities and crafts.",
        "characters": ["patient", "energetic", "creative", "punctual"],
        "rating": 4.5
      },
      {
        "name": "Maria Kovalenko",
        "avatar_url": "https://ftp.goit.study/img/avatars/10.jpg",
        "birthday": "1991-04-10T22:25:57.010+00:00",
        "experience": "7 years",
        "reviews": [
          {
            "reviewer": "Ivan D.",
            "rating": 4.5,
            "comment": "Maria is very caring and knows how to handle kids very well."
          },
          {
            "reviewer": "Lena R.",
            "rating": 5,
            "comment": "Maria has been a blessing for our family. Our children adore her!"
          }
        ],
        "education": "Master's in Child Psychology, CPR Certified",
        "kids_age": "6 months to 8 years old",
        "price_per_hour": 16,
        "location": "Lviv, Ukraine",
        "about": "I have a passion for teaching and mentoring children. I aim to help them grow and learn in a safe and loving environment. I am also a trained child psychologist, which helps me in understanding and catering to the unique needs of every child.",
        "characters": ["compassionate", "knowledgeable", "adaptive", "trustworthy"],
        "rating": 4.75
      },
      {
        "name": "Olena Petrenko",
        "avatar_url": "https://ftp.goit.study/img/avatars/37.jpeg",
        "birthday": "1999-04-10T22:25:57.010+00:00",
        "experience": "6 years",
        "reviews": [
          {
            "reviewer": "Sergiy M.",
            "rating": 4.7,
            "comment": "Olena is dependable and has a natural way with children."
          },
          {
            "reviewer": "Tetiana V.",
            "rating": 5,
            "comment": "My twins love spending time with her. Highly recommend!"
          }
        ],
        "education": "Bachelor's in Child Development, Special Needs Child Care Training",
        "kids_age": "2 to 10 years old",
        "price_per_hour": 17,
        "location": "Odesa, Ukraine",
        "about": "Being with children brings joy to my day. I've worked with children of various birthday groups, including those with special needs. My approach is hands-on, engaging, and tailored to each child's unique personality.",
        "characters": ["empathetic", "skilled", "observant", "enthusiastic"],
        "rating": 4.85
      }
    ];

    console.log(`Importing ${nannies.length} nannies...`);

    for (let i = 0; i < nannies.length; i++) {
      const nanny = nannies[i];
      const nannyId = `nanny-${i + 1}`;
      const nannyRef = ref(database, `nannies/${nannyId}`);
      
      await set(nannyRef, nanny);
      console.log(`✅ Imported ${i + 1}/${nannies.length}: ${nanny.name}`);
    }

    console.log('\n🎉 Successfully imported all nannies! Refresh the page to see them.');
    alert('✅ Successfully imported ' + nannies.length + ' nannies! Refresh the page.');
  } catch (error) {
    console.error('Error:', error);
    alert('Error: ' + error.message);
  }
})();

