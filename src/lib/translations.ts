
export type Language = 'ru' | 'en' | 'ky';

export const translations = {
  ru: {
    nav: {
      services: 'Услуги',
      masters: 'Мастера',
      booking: 'Запись',
      contacts: 'Контакты',
      bookNow: 'Записаться'
    },
    hero: {
      tagline: 'Культура мужского грумминга в центре столицы. Традиции, воплощенные в современном стиле.',
      book: 'Записаться',
      catalog: 'Услуги',
      location: 'Москва-Сити',
      hours: '10:00 — 22:00',
      rating: 'Рейтинг',
      reviews: '1500+ отзывов'
    },
    services: {
      menu: 'Меню услуг',
      title: 'Искусство',
      accent: 'Детали',
      products: 'Мы используем только премиальную косметику.',
      items: [
        { title: "Мужская стрижка", price: "от 3 000₽", desc: "Консультация, мытье головы, стрижка, стайлинг." },
        { title: "Моделирование бороды", price: "от 2 000₽", desc: "Создание формы, работа с контурами, распаривание." },
        { title: "Королевское бритье", price: "от 2 500₽", desc: "Ультра-близкое бритье опасной бритвой с уходом." },
        { title: "Камуфляж седины", price: "от 1 500₽", desc: "Естественное восстановление цвета волос и бороды." },
        { title: "Гримминг лица", price: "от 1 000₽", desc: "Уход за кожей, патчи, удаление волос воском." },
        { title: "Детская стрижка", price: "от 2 500₽", desc: "Стильный образ для будущих аристократов (до 12 лет)." },
      ]
    },
    team: {
      title: 'Наши',
      accent: 'Мастера',
      role: 'Топ Мастер',
      exp: 'опыта'
    },
    booking: {
      reservation: 'Бронирование',
      title: 'Записаться онлайн',
      step1: 'Услуги',
      step2: 'Дата и время',
      step3: 'Контакты',
      selectDate: 'Выберите дату',
      selectTime: 'Выберите время',
      confirm: 'Подтвердить запись',
      next: 'Далее',
      back: 'Назад',
      name: 'Имя',
      phone: 'Телефон',
      notes: 'Пожелания',
      success: 'Заявка принята!'
    },
    chat: {
      greeting: 'Здравствуйте! Я ваш персональный ассистент Aristocrat Moscow. Чем могу помочь?',
      placeholder: 'Задайте вопрос...',
      typing: 'Печатает...',
      error: 'К сожалению, сервис временно недоступен.'
    },
    style: {
      title: 'AI Стилист',
      accent: 'Визуализация',
      desc: 'Загрузите ваше фото, выберите стиль, и наш ИИ проанализирует, как эта стрижка подойдет именно вам.',
      upload: 'Загрузить фото',
      analyzing: 'Анализируем ваш стиль...',
      result: 'Рекомендация мастера',
      cta: 'Записаться на этот образ',
      selectStyle: 'Выберите стиль для теста',
      tryOn: 'Потяните прическу, чтобы примерить',
      liveMode: 'Live AR режим',
      photoMode: 'Фото режим',
      cameraError: 'Доступ к камере отклонен или недоступен',
      videoViz: 'Видео Визуализация 360°',
      rendering: 'Идет рендеринг видео...',
      styles: {
        classic: 'Классика',
        fade: 'Фэйд',
        long: 'Удлиненная',
        top: 'Топ-нот'
      }
    }
  },
  en: {
    nav: {
      services: 'Services',
      masters: 'Team',
      booking: 'Booking',
      contacts: 'Contacts',
      bookNow: 'Book Now'
    },
    hero: {
      tagline: 'Male grooming culture in the heart of the capital. Traditions embodied in modern style.',
      book: 'Book Now',
      catalog: 'Services',
      location: 'Moscow City',
      hours: '10:00 — 22:00',
      rating: 'Rating',
      reviews: '1500+ reviews'
    },
    services: {
      menu: 'Grooming Menu',
      title: 'Art of',
      accent: 'Detail',
      products: 'We use only premium cosmetics.',
      items: [
        { title: "Haircut", price: "from 3 000₽", desc: "Consultation, washing, haircut, styling." },
        { title: "Beard Trimming", price: "from 2 000₽", desc: "Shaping, contour work, hot towel service." },
        { title: "Royal Shave", price: "from 2 500₽", desc: "Ultra-close straight razor shave with premium care." },
        { title: "Grey Camouflage", price: "from 1 500₽", desc: "Natural color restoration for hair and beard." },
        { title: "Facial Grooming", price: "from 1 000₽", desc: "Skin care, eye patches, wax hair removal." },
        { title: "Premium Kid Cut", price: "from 2 500₽", desc: "Stylish look for future aristocrats (under 12)." },
      ]
    },
    team: {
      title: 'Our',
      accent: 'Masters',
      role: 'Top Master',
      exp: 'years exp'
    },
    booking: {
      reservation: 'Reservation',
      title: 'Book Online',
      step1: 'Services',
      step2: 'Date & Time',
      step3: 'Contacts',
      selectDate: 'Select Date',
      selectTime: 'Select Time',
      confirm: 'Confirm Booking',
      next: 'Next',
      back: 'Back',
      name: 'Name',
      phone: 'Phone',
      notes: 'Special Requests',
      success: 'Booking received!'
    },
    chat: {
      greeting: 'Hello! I am your personal Aristocrat Moscow assistant. How can I help you?',
      placeholder: 'Ask a question...',
      typing: 'Typing...',
      error: 'Sorry, the service is temporarily unavailable.'
    },
    style: {
      title: 'AI Style',
      accent: 'Advisor',
      desc: 'Upload your photo, select a style, and our AI will analyze how this haircut suits you specifically.',
      upload: 'Upload Photo',
      analyzing: 'Analyzing your style...',
      result: 'Master Recommendation',
      cta: 'Book this look',
      selectStyle: 'Select Style to Test',
      tryOn: 'Drag the hair to fit',
      liveMode: 'Live AR Mode',
      photoMode: 'Photo Mode',
      cameraError: 'Camera access denied or unavailable',
      videoViz: '360° Video Visualization',
      rendering: 'Rendering video...',
      styles: {
        classic: 'Classic',
        fade: 'Fade',
        long: 'Long',
        top: 'Top Knot'
      }
    }
  },
  ky: {
    nav: {
      services: 'Кызматтар',
      masters: 'Мастерлер',
      booking: 'Запись',
      contacts: 'Байланыш',
      bookNow: 'Жазылуу'
    },
    hero: {
      tagline: 'Борбор калаанын чок ортосунда эркектердин сырткы келбетине кам көрүү маданияты. Заманбап стилде ишке ашырылган салттар.',
      book: 'Жазылуу',
      catalog: 'Кызматтар',
      location: 'Москва-Сити',
      hours: '10:00 — 22:00',
      rating: 'Рейтинг',
      reviews: '1500+ пикир'
    },
    services: {
      menu: 'Кызматтар менюсу',
      title: 'Деталдын',
      accent: 'Чеберчилиги',
      products: 'Биз премиум-класс косметикасын гана колдонобуз.',
      items: [
        { title: "Эркектердин чач жасалгасы", price: "3 000₽-дон баштап", desc: "Кеңеш берүү, чач жуу, кыркуу, стайлинг." },
        { title: "Сакалды моделдөө", price: "2 000₽-дон баштап", desc: "Форма берүү, контурлар менен иштөө, демдетүү." },
        { title: "Падышалык кырынуу", price: "2 500₽-дон баштап", desc: "Атайын кыргыч менен ультра-жакын кырынуу." },
        { title: "Агарган чачты жашыруу", price: "1 500₽-дон баштап", desc: "Чач жана сакалдын түсүн табигый калыбына келтирүү." },
        { title: "Бетке кам көрүү", price: "1 000₽-дон баштап", desc: "Териге кам көрүү, патчтар, мом менен түктөрдү алуу." },
        { title: "Балдардын чач жасалгасы", price: "2 500₽-дон баштап", desc: "Келечектеги аристократтар үчүн стилдүү образ (12 жашка чейин)." },
      ]
    },
    team: {
      title: 'Биздин',
      accent: 'Мастерлер',
      role: 'Топ Мастер',
      exp: 'тажрыйбасы'
    },
    booking: {
      reservation: 'Бронирование',
      title: 'Онлайн жазылуу',
      step1: 'Кызматтар',
      step2: 'Күнү жана убактысы',
      step3: 'Байланыштар',
      selectDate: 'Күндү тандаңыз',
      selectTime: 'Убакытты тандаңыз',
      confirm: 'Жазууну ырастоо',
      next: 'Кийинки',
      back: 'Артка',
      name: 'Атыңыз',
      phone: 'Телефон',
      notes: 'Каалоо-тилектер',
      success: 'Өтүнмө кабыл алынды!'
    },
    chat: {
      greeting: 'Саламатсызбы! Мен Aristocrat Moscow жеке ассистентиңизмин. Кантип жардам бере алам?',
      placeholder: 'Суроо бериңиз...',
      typing: 'Жазып жатат...',
      error: 'Тилекке каршы, сервис убактылуу иштебей жатат.'
    },
    style: {
      title: 'AI Стилист',
      accent: 'Визуализация',
      desc: 'Сүрөтүңүздү жүктөңүз, стилди тандаңыз, ошондо биздин ИИ бул чач жасалгасы сизге кандайча туура келерин талдап берет.',
      upload: 'Сүрөт жүктөө',
      analyzing: 'Стилиңиз талданууда...',
      result: 'Мастердин сунушу',
      cta: 'Бул образга жазылуу',
      selectStyle: 'Тест үчүн стилди тандаңыз',
      tryOn: 'Чач жасалгасын тууралаңыз',
      liveMode: 'Live AR режими',
      photoMode: 'Сүрөт режими',
      cameraError: 'Камерага кирүүгө тыюу салынган',
      videoViz: '360° Видео Визуализация',
      rendering: 'Видео рендеринг жүрүүдө...',
      styles: {
        classic: 'Классика',
        fade: 'Фэйд',
        long: 'Узун',
        top: 'Топ-нот'
      }
    }
  }
};
