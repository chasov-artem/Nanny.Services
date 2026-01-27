# Nanny Services

Застосунок для компанії, що пропонує послуги нянь. Дозволяє користувачам переглядати профілі нянь, додавати їх в обрані та записуватися на особисту зустріч.

## 🚀 Основні можливості

- **Авторизація** - реєстрація та вхід через Firebase Authentication
- **Перегляд нянь** - список нянь з детальною інформацією
- **Фільтрація та сортування** - за ціною, рейтингом, алфавітом
- **Обрані** - збереження улюблених нянь (тільки для авторизованих користувачів)
- **Запис на зустріч** - форма для запису на особисту зустріч з нянею
- **Адаптивний дизайн** - працює на мобільних, планшетах та десктопах

## 🛠 Технології

- **React 19** - бібліотека для побудови UI
- **Vite** - інструмент збірки та розробки
- **React Router** - маршрутизація
- **Firebase Authentication** - авторизація користувачів
- **Firebase Realtime Database** - зберігання даних про нянь та обраних
- **React Hook Form** - робота з формами
- **Yup** - валідація форм
- **CSS** - стилізація компонентів

## 📋 Вимоги

- Node.js 18+ 
- npm або yarn
- Firebase проект з налаштованими Authentication та Realtime Database

## 🔧 Встановлення та запуск

1. Клонуйте репозиторій:
```bash
git clone https://github.com/chasov-artem/Nanny.Services.git
cd Nanny.Services
```

2. Встановіть залежності:
```bash
npm install
```

3. Створіть файл `.env` в корені проекту з наступними змінними:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_DATABASE_URL=your_database_url
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

4. Запустіть dev сервер:
```bash
npm run dev
```

5. Відкрийте браузер на `http://localhost:5173`

## 📦 Налаштування Firebase

1. Створіть проект у [Firebase Console](https://console.firebase.google.com/)
2. Увімкніть **Authentication** (Email/Password)
3. Створіть **Realtime Database** (режим тестування для початку)
4. Налаштуйте правила безпеки:
```json
{
  "rules": {
    "nannies": {
      ".read": true,
      ".write": false
    },
    "users": {
      "$uid": {
        "favorites": {
          ".read": "$uid === auth.uid",
          ".write": "$uid === auth.uid"
        }
      }
    }
  }
}
```

5. Імпортуйте дані нянь:
   - Відкрийте `http://localhost:5173/import-data.html`
   - Натисніть "Import Nannies"
   - Або імпортуйте вручну через Firebase Console

## 📱 Структура проекту

```
src/
├── components/          # Переісні компоненти
│   ├── AuthModal/     # Модальне вікно авторизації
│   ├── NannyCard/     # Картка няні
│   ├── AppointmentModal/ # Модальне вікно запису
│   ├── Filters/       # Компонент фільтрів
│   └── Layout/        # Layout з навігацією
├── pages/             # Сторінки
│   ├── Home/          # Головна сторінка
│   ├── Nannies/       # Сторінка зі списком нянь
│   └── Favorites/     # Сторінка обраних
├── services/          # Сервіси для роботи з Firebase
│   ├── firebase.js    # Конфігурація Firebase
│   ├── auth.js        # Функції авторизації
│   └── database.js    # Функції роботи з БД
├── context/           # React Context
│   └── AuthContext.jsx # Контекст авторизації
└── utils/             # Допоміжні функції
    └── validation.js  # Схеми валідації Yup
```

## 🎨 Особливості

- **Пагінація** - початкове відображення 3 карток, можливість завантажити більше
- **Фільтрація** - за ціною (діапазони)
- **Сортування** - за ім'ям (A-Z / Z-A) та рейтингом (від низького до високого / від високого до низького)
- **Приватні роути** - сторінка Favorites доступна тільки авторизованим користувачам
- **Валідація форм** - всі форми мають валідацію через Yup
- **Responsive дизайн** - адаптивна верстка від 320px до 1440px

## ✅ Як реалізовано ТЗ

- Реалізовано три сторінки (`Home`, `Nannies`, `Favorites`) зі сторінкою `Favorites`, доступною лише авторизованим користувачам через `React Router` + `PrivateRoute`.
- Авторизація/реєстрація працює через Firebase Authentication, форми (`AuthModal`, `AppointmentModal`) обробляються `react-hook-form` з `yup`-валидацією, включно з обов'язковими полями та кнопкою “хрестик”, backdrop, Esc.
- Список нянь завантажується з Realtime Database, підтримує “Load more”, фільтрацію за ціною, сортування за ім'ям/рейтинґом, а картки відкривають деталі та модалку запису.
- Натискання “серця” додає/видаляє няню у фаворити у Firebase, стан зберігається після перезавантаження, у Favorites видно лише обрані картки.
- Модалки (`AuthModal`, `AppointmentModal`) і кнопки мають стиль згідно з макетом (розміри, топографія, кольори, піллові кнопки).

## 📄 Макет

Макет проекту доступний за посиланням:
https://www.figma.com/file/u36ajEOsnwio2GDGiabVPD/Nanny-Sevices

## 🚢 Деплой

### Netlify

1. Підключіть репозиторій до Netlify
2. Додайте змінні оточення з `.env` файлу
3. Build command: `npm run build`
4. Publish directory: `dist`

### GitHub Pages

1. Додайте в `package.json`:
```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

2. Встановіть gh-pages: `npm install --save-dev gh-pages`
3. Запустіть: `npm run deploy`

## 📝 Технічне завдання

Детальне ТЗ доступне в плані розробки проекту.

## 👤 Автор

chasov-artem

## 📄 Ліцензія

MIT
