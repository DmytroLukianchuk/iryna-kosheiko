import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Toaster, toast } from "sonner";
import { 
  Home as HomeIcon, 
  Shield, 
  TrendingUp, 
  Phone, 
  Mail, 
  MapPin, 
  Linkedin, 
  Star,
  MessageCircle,
  ChevronDown,
  Globe,
  X,
  Check,
  Clock,
  Wallet,
  FileText,
  Users,
  Instagram,
  Send,
  Car,
  Briefcase,
  Heart,
  PiggyBank,
  Landmark
} from "lucide-react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const EMAIL_RECIPIENT = "iryna.kosheiko@phinance.pl";

const translations = {
  pl: {
    hero: {
      headline: "Iryna Kosheiko – Twój Zaufany Partner Finansowy",
      subtitle: "Profesjonalne doradztwo finansowe w języku polskim i ukraińskim",
      services: "Kredyty • Ubezpieczenia • Inwestycje",
      cta: "Umów Bezpłatną Konsultację"
    },
    about: {
      title: "O Mnie",
      intro: "Kim jestem?",
      text: "Zapewniam obsługę w Twoim języku – biegle posługuję się polskim, ukraińskim oraz rosyjskim. Moje podejście to połączenie szybkości działania z wnikliwą analizą. U mnie nie znajdziesz niejasności, tylko konkretne rozwiązania. Nieustannie inwestuję w swoje kompetencje, aby moja wiedza była zawsze aktualna i gwarantowała bezpieczeństwo Twoich decyzji finansowych.",
      text2: "Specjalizuję się w kredytach hipotecznych oraz gotówkowych, ubezpieczeniach na życie do kredytów hipotecznych, ubezpieczeniu w razie choroby oraz utraty pracy. Ponadto, buduję dla Ciebie przyszłość: projektuję spersonalizowane plany emerytalne i opracowuję strategie optymalizacyjne, które realnie wpływają na Twój majątek – na przykład poprzez umożliwienie wcześniejszej spłaty zobowiązań hipotecznych.",
      text3: "Prywatnie jestem osobą, która żyje aktywnie i uwielbia podróżować. To pragnienie ciągłego odkrywania i poszukiwania nowych ścieżek przenoszę na moją pracę. Moje motto, które prowadzi mnie do osiągania celów, brzmi: 'Jeśli chcesz mieć coś, czego nigdy nie miałeś, musisz być gotów robić rzeczy, których wcześniej nie robiłeś'.",
      stats: {
        clients: "Stałych Klientów",
        credits: "Wypłaconych Kredytów",
        experience: "Lat Doświadczenia"
      },
      team: {
        title: "Mój Zespół",
        members: [
          { name: "Wiktoria Chubatiuk", role: "Specjalista ds. procesów kredytowych", image: "" },
          { name: "Denys Toporko", role: "Specjalista ds. kredytów hipotecznych", image: "" },
          { name: "Paweł Klucznik", role: "Specjalista ds. obsługi klienta", image: "" },
          { name: "Antoni Kasprzyk", role: "Specjalista ds. ubezpieczeń majątkowych", image: "" },
          { name: "Magdalena Kośmider", role: "Specjalista ds. ubezpieczeń majątkowych", image: "" }
        ]
      }
    },
    services: {
      title: "W Czym Pomagam",
      subtitle: "Kompleksowe wsparcie finansowe dostosowane do Twoich potrzeb",
      expandLabel: "Dlaczego potrzebuję tego teraz?",
      exampleLabel: "Przykład",
      items: [
        { 
          title: "Kredyty Hipoteczne", 
          desc: "Zakup nieruchomości na kredyt hipoteczny.",
          whyNow: "Gdy planujesz zakup własnego M, chcesz zamienić wynajem na spłatę swojego lub szukasz finansowania na budowę domu.",
          example: "Rodzina 2+1, która płaci 3000 zł za wynajem, a mogłaby płacić 2500 zł raty za własne mieszkanie."
        },
        { 
          title: "Ubezpieczenia na Życie", 
          desc: "Ochrona dla Ciebie i Twojej rodziny.",
          whyNow: "Gdy masz kredyt, dzieci lub bliskich na utrzymaniu i chcesz zapewnić im bezpieczeństwo finansowe.",
          example: "Ojciec rodziny, główny żywiciel, zabezpiecza przyszłość rodziny w razie swojej śmierci."
        },
        { 
                        title: "Ubezpieczenia Majątkowe", 
                        desc: "Samochód, nieruchomość, firma.",
          whyNow: "Gdy kupujesz auto, mieszkanie lub prowadzisz firmę i boisz się nieprzewidzianych kosztów napraw.",
          example: "Właściciel mieszkania chroni się przed zalaniem sąsiada, unikając kosztów remontu z własnej kieszeni."
        },
        { 
          title: "Emerytura", 
          desc: "Prywatne oszczędności na przyszłość.",
          whyNow: "Gdy nie chcesz polegać tylko na ZUS i marzysz o zachowaniu obecnego standardu życia na starość.",
          example: "30-latka odkłada małe kwoty, by za 30 lat mieć dodatkowe 2000 zł miesięcznie do emerytury."
        },
        { 
          title: "Poduszka Finansowa", 
          desc: "Budowanie bezpieczeństwa finansowego.",
          whyNow: "Gdy chcesz spać spokojnie i nie martwić się utratą pracy czy nagłym wydatkiem.",
          example: "Kasia buduje fundusz na 6 miesięcy życia, by bez stresu szukać nowej pracy w razie zwolnienia."
        },
        { 
          title: "Inwestycje", 
          desc: "Pomnażanie kapitału.",
          whyNow: "Gdy masz wolne środki, które tracą na wartości przez inflację, i chcesz, by pracowały na Ciebie.",
          example: "Inwestor lokuje nadwyżki finansowe, by pokonać inflację i zyskać 6-8% w skali roku."
        }
      ]
    },
    benefits: {
      title: "Dlaczego Warto?",
      items: [
        { title: "Długoterminowa Opieka", desc: "Dbam o Twoje finanse na lata." },
        { title: "Oszczędność Czasu", desc: "Załatwiam formalności za Ciebie." },
        { title: "Bezpłatne Usługi", desc: "Moje doradztwo nic Cię nie kosztuje." },
        { title: "Sprawdzona Wiedza", desc: "Tylko aktualne i rzetelne informacje." },
        { title: "Wszystko w Jednym Miejscu", desc: "Kompleksowa obsługa finansowa." }
      ]
    },
    testimonials: {
      title: "Opinie Klientów",
      subtitle: "Średnia ocena 5.0 na Google Maps",
      reviews: [
        { name: "Anna K.", text: "Profesjonalne podejście i szczegółowe wyjaśnienia. Polecam!", rating: 5, date: "2 miesiące temu" },
        { name: "Piotr M.", text: "Świetna komunikacja i znajomość tematu. Bardzo pomocna!", rating: 5, date: "miesiąc temu" },
        { name: "Kateryna S.", text: "Doskonała porada i wsparcie. Bardzo zadowolona!", rating: 5, date: "3 tygodnie temu" },
        { name: "Marcin W.", text: "Dzięki Irynie udało się skonsolidować kredyty. Polecam serdecznie!", rating: 5, date: "tydzień temu" }
      ],
      linkText: "Zobacz więcej opinii na Google"
    },
    newsletter: {
      title: "Bądź na Bieżąco",
      desc: "Zapisz się, aby otrzymywać porady finansowe i nowości.",
      placeholder: "Twój email",
      cta: "Zapisz się"
    },
    contact: {
      title: "Kontakt",
      subtitle: "Skontaktuj się ze mną, aby omówić Twoje cele finansowe",
      form: {
        name: "Imię i Nazwisko",
        email: "Email",
        phone: "Telefon",
        language: "Preferowany Język",
        message: "Wiadomość",
        submit: "Wyślij Wiadomość"
      },
      address: "Feliksa Radwańskiego 15/3, 30-065 Kraków",
    },
    footer: {
      title: "Iryna Kosheiko — Doradca Finansowy",
      description: "Doradztwo finansowe w języku polskim, ukraińskim i angielskim.",
      disclaimer: "Informacje na tej stronie mają charakter wyłącznie informacyjny.",
      copyright: "Copyright © 2025 Iryna Kosheiko.",
      socialLinks: {
        linkedin: "https://www.linkedin.com/in/iryna-kosheiko-368377357/",
        instagram: "https://www.instagram.com/iryna_kosheiko_doradca?igsh=NnJnNGYyaHg4YjFh",
        telegram: "https://t.me/iryna_kosheiko_doradca",
        maps: "https://www.google.com/maps/search/?api=1&query=Iryna+Kosheiko+Financial+Advisor+Krakow"
      }
    }
  },
  uk: {
    hero: {
      headline: "Ірина Кошейко – Ваш Надійний Фінансовий Партнер",
      subtitle: "Професійне фінансове консультування польською та українською мовами",
      services: "Кредити • Страхування • Інвестиції",
      cta: "Записатися на Безкоштовну Консультацію"
    },
    about: {
      title: "Про Мене",
      intro: "Хто я?",
      text: "Я Твій фінансовий консультант з 7 річним досвідом. Вільно спілкуюся трьома мовами: українською, польською та російською, що забезпечує повний комфорт і зрозумілість у спілкуванні. Мій підхід до роботи – це поєднання оперативності та глибокого аналізу. Я працюю на результат, тому не пропоную туманних рішень, а надаю лише чіткі конкретні стратегії. Я постійно розвиваю свої навички, щоб Ваші фінансові рішення завжди були обґрунтованими, актуальними та безпечними.",
      text2: "Моя спеціалізація охоплює: оформлення іпотечних та готівкових кредитів, а також підбір спеціалізованих страхових продуктів – страхування життя до іпотеки, захист на випадок хвороби чи втрати роботи. Крім того, я допомагаю будувати фінансове майбутнє: розробляю індивідуальні пенсійні плани та створюю стратегії оптимізації заощаджень, які реально збільшують Ваш капітал – наприклад, дозволяють значно раніше погасити іпотечний кредит.",
      text3: "Приватно я дуже активна людина і завзятий мандрівник. Це постійне прагнення відкривати нове і знаходити кращі шляхи мотивує мене і в професійній сфері. Мій життєвий девіз, який допомагає мені досягати цілей, звучить так: «Якщо хочеш мати те, чого ніколи не мав, ти мусиш бути готовим робити те, чого раніше не робив».",
      stats: {
        clients: "Постійних клієнтів",
        credits: "Виплачених кредитів",
        experience: "Років досвіду"
      },
      team: {
                title: "Моя Команда",
                members: [
                  { name: "Wiktoria Chubatiuk", role: "Спеціаліст з кредитних процесів", image: "" },
                  { name: "Denys Toporko", role: "Спеціаліст з іпотечних кредитів", image: "" },
                  { name: "Paweł Klucznik", role: "Спеціаліст з обслуговування клієнтів", image: "" },
                  { name: "Antoni Kasprzyk", role: "Спеціаліст зі страхування майна", image: "" },
                  { name: "Magdalena Kośmider", role: "Спеціаліст зі страхування майна", image: "" }
                ]
              }
    },
    services: {
      title: "У Яких Питаннях Я Допомагаю",
      subtitle: "Комплексна фінансова підтримка, адаптована до ваших потреб",
      expandLabel: "Чому це важливо саме зараз?",
      exampleLabel: "Приклад",
      items: [
        { 
          title: "Купівля нерухомості в кредит", 
          desc: "Іпотека на вигідних умовах для вашого нового дому.",
          whyNow: "Коли ви плануєте купити власне житло, хочете змінити оренду на виплату свого або шукаєте фінансування на будівництво.",
          example: "Сім'я, яка платить за оренду, вирішує інвестувати ці кошти у власну квартиру з комфортним платежем."
        },
        { 
          title: "Страхування життя", 
          desc: "Надійний захист для Вас і Вашої родини.",
          whyNow: "Коли у вас є кредит, діти або близькі на утриманні, і ви хочете гарантувати їм фінансову безпеку.",
          example: "Батько родини забезпечує майбутнє дітей на випадок хвороби або непередбачуваних обставин."
        },
        { 
          title: "Страхування майна та бізнесу", 
          desc: "Автоцивілка, КАСКО, захист нерухомості та бізнесу.",
          whyNow: "Коли ви купуєте авто, квартиру або ведете бізнес і хочете уникнути непередбачуваних витрат.",
          example: "Власник квартири захищає себе від затоплення сусіда, уникаючи витрат на ремонт з власної кишені."
        },
        { 
          title: "Приватні заощадження на пенсію", 
          desc: "Формування капіталу для безтурботної старості.",
          whyNow: "Коли ви не хочете залежати лише від державної пенсії і мрієте зберегти рівень життя у майбутньому.",
          example: "Молода людина відкладає невеликі суми, щоб у майбутньому мати гідну додаткову пенсію."
        },
        { 
          title: "Фінансова подушка", 
          desc: "Створення резервного фонду для непередбачуваних ситуацій.",
          whyNow: "Коли ви хочете спати спокійно і не хвилюватися через втрату роботи чи раптові витрати.",
          example: "Створення фонду на 6 місяців життя, щоб без стресу шукати нову роботу в разі звільнення."
        },
        { 
          title: "Інвестиції", 
          desc: "Розумне вкладення коштів для пасивного доходу.",
          whyNow: "Коли у вас є вільні кошти, які втрачають вартість через інфляцію, і ви хочете змусити їх працювати.",
          example: "Інвестор вкладає надлишки, щоб перегнати інфляцію та отримати пасивний дохід."
        }
      ]
    },
    benefits: {
      title: "Чому Варто Працювати Зі Мною?",
      items: [
        { title: "Довгострокове обслуговування", desc: "Я супроводжую вас на всіх етапах фінансового життя." },
        { title: "Економія Вашого часу", desc: "Беру на себе всю паперову роботу та переговори." },
        { title: "Безкоштовні послуги", desc: "Мої консультації та супровід є безкоштовними для Вас." },
        { title: "Актуальна інформація", desc: "Тільки перевірені дані та прозорі умови." },
        { title: "Усе в одному місці", desc: "Вирішення всіх фінансових питань з одним експертом." }
      ]
    },
    testimonials: {
      title: "Відгуки Клієнтів",
      subtitle: "Середня оцінка 5.0 на Google Maps",
      reviews: [
        { name: "Анна К.", text: "Професійний підхід та детальні пояснення. Рекомендую!", rating: 5, date: "2 місяці тому" },
        { name: "Петро М.", text: "Чудова комунікація та знання теми. Дуже корисно!", rating: 5, date: "місяць тому" },
        { name: "Катерина С.", text: "Досконала порада та підтримка. Дуже задоволена співпрацею!", rating: 5, date: "3 тижні тому" },
        { name: "Марцін В.", text: "Завдяки Ірині вдалося консолідувати кредити. Рекомендую!", rating: 5, date: "тиждень тому" }
      ],
      linkText: "Дивитися більше відгуків на Google"
    },
    newsletter: {
      title: "Корисні Поради",
      desc: "Підпишіться, щоб отримувати актуальні новини про фінанси, інвестиції та страхування.",
      placeholder: "Ваш Email",
      cta: "Підписатися"
    },
    contact: {
      title: "Контакти",
      subtitle: "Зв'яжіться зі мною зручним для вас способом",
      form: {
        name: "Ім'я та Прізвище",
        email: "Email",
        phone: "Телефон",
        language: "Бажана Мова",
        message: "Повідомлення",
        submit: "Надіслати Повідомлення"
      },
      address: "Feliksa Radwańskiego 15, 30-065 Краків",
    },
    footer: {
      title: "Ірина Кошейко — Фінансовий Радник",
      description: "Фінансове консультування польською, українською та англійською.",
      disclaimer: "Інформація на цьому сайті має виключно інформаційний характер і не є офертою у розумінні Цивільного кодексу.",
      copyright: "Copyright © 2025 Ірина Кошейко. Всі права захищені.",
      socialLinks: {
        linkedin: "https://www.linkedin.com/in/iryna-kosheiko-368377357/",
        instagram: "https://www.instagram.com/iryna_kosheiko_doradca?igsh=NnJnNGYyaHg4YjFh",
        telegram: "https://t.me/iryna_kosheiko_doradca",
        maps: "https://www.google.com/maps/search/?api=1&query=Iryna+Kosheiko+Financial+Advisor+Krakow"
      }
    }
  },
  ru: {
    hero: {
      headline: "Ирина Кошейко – Ваш Надёжный Финансовый Партнёр",
      subtitle: "Профессиональные финансовые консультации на польском, украинском и русском языках",
      services: "Кредиты • Страхование • Инвестиции",
      cta: "Записаться на Бесплатную Консультацию"
    },
    about: {
      title: "Обо Мне",
      intro: "Кто я?",
      text: "Обеспечиваю обслуживание на вашем языке – свободно владею польским, украинским и русским. Мой подход – это сочетание скорости действий с глубоким анализом. У меня вы не найдёте неясностей, только конкретные решения. Постоянно инвестирую в свои компетенции, чтобы мои знания были всегда актуальными и гарантировали безопасность ваших финансовых решений.",
      text2: "Специализируюсь на ипотечных и наличных кредитах, страховании жизни к ипотечным кредитам, страховании на случай болезни и потери работы. Кроме того, строю для вас будущее: разрабатываю персонализированные пенсионные планы и оптимизационные стратегии, которые реально влияют на ваш капитал – например, через возможность досрочного погашения ипотечных обязательств.",
      text3: "В частной жизни я активный человек, который обожает путешествовать. Это стремление постоянно открывать новое и искать новые пути я переношу на свою работу. Моё кредо, которое ведёт меня к достижению целей: 'Если хочешь иметь то, чего никогда не имел, будь готов делать то, чего раньше не делал'.",
      stats: {
        clients: "Постоянных клиентов",
        credits: "Выплаченных кредитов",
        experience: "Лет опыта"
      },
      team: {
                title: "Моя Команда",
                members: [
                  { name: "Wiktoria Chubatiuk", role: "Специалист по кредитным процессам", image: "" },
                  { name: "Denys Toporko", role: "Специалист по ипотечным кредитам", image: "" },
                  { name: "Paweł Klucznik", role: "Специалист по обслуживанию клиентов", image: "" },
                  { name: "Antoni Kasprzyk", role: "Специалист по страхованию имущества", image: "" },
                  { name: "Magdalena Kośmider", role: "Специалист по страхованию имущества", image: "" }
                ]
              }
    },
    services: {
      title: "В Чём Я Помогаю",
      subtitle: "Комплексная финансовая поддержка, адаптированная к вашим потребностям",
      expandLabel: "Почему это важно именно сейчас?",
      exampleLabel: "Пример",
      items: [
        { 
          title: "Покупка недвижимости в кредит", 
          desc: "Ипотека на выгодных условиях для вашего нового дома.",
          whyNow: "Когда вы планируете купить собственное жильё, хотите сменить аренду на выплату своего или ищете финансирование на строительство.",
          example: "Семья, которая платит за аренду, решает инвестировать эти средства в собственную квартиру с комфортным платежом."
        },
        { 
          title: "Страхование жизни", 
          desc: "Надёжная защита для Вас и Вашей семьи.",
          whyNow: "Когда у вас есть кредит, дети или близкие на содержании, и вы хотите гарантировать им финансовую безопасность.",
          example: "Отец семьи обеспечивает будущее детей на случай болезни или непредвиденных обстоятельств."
        },
        { 
          title: "Страхование имущества и бизнеса", 
          desc: "Автогражданка, КАСКО, защита недвижимости и бизнеса.",
          whyNow: "Когда вы покупаете авто, квартиру или ведёте бизнес и хотите избежать непредвиденных расходов.",
          example: "Владелец квартиры защищает себя от затопления соседа, избегая расходов на ремонт из своего кармана."
        },
        { 
          title: "Частные накопления на пенсию", 
          desc: "Формирование капитала для беззаботной старости.",
          whyNow: "Когда вы не хотите зависеть только от государственной пенсии и мечтаете сохранить уровень жизни в будущем.",
          example: "Молодой человек откладывает небольшие суммы, чтобы в будущем иметь достойную дополнительную пенсию."
        },
        { 
          title: "Финансовая подушка", 
          desc: "Создание резервного фонда для непредвиденных ситуаций.",
          whyNow: "Когда вы хотите спать спокойно и не волноваться из-за потери работы или внезапных расходов.",
          example: "Создание фонда на 6 месяцев жизни, чтобы без стресса искать новую работу в случае увольнения."
        },
        { 
          title: "Инвестиции", 
          desc: "Разумное вложение средств для пассивного дохода.",
          whyNow: "Когда у вас есть свободные средства, которые теряют стоимость из-за инфляции, и вы хотите заставить их работать.",
          example: "Инвестор вкладывает излишки, чтобы обогнать инфляцию и получить пассивный доход."
        }
      ]
    },
    benefits: {
      title: "Почему Стоит Работать Со Мной?",
      items: [
        { title: "Долгосрочное обслуживание", desc: "Я сопровождаю вас на всех этапах финансовой жизни." },
        { title: "Экономия Вашего времени", desc: "Беру на себя всю бумажную работу и переговоры." },
        { title: "Бесплатные услуги", desc: "Мои консультации и сопровождение бесплатны для Вас." },
        { title: "Актуальная информация", desc: "Только проверенные данные и прозрачные условия." },
        { title: "Всё в одном месте", desc: "Решение всех финансовых вопросов с одним экспертом." }
      ]
    },
    testimonials: {
      title: "Отзывы Клиентов",
      subtitle: "Средняя оценка 5.0 на Google Maps",
      reviews: [
        { name: "Анна К.", text: "Профессиональный подход и детальные объяснения. Рекомендую!", rating: 5, date: "2 месяца назад" },
        { name: "Пётр М.", text: "Отличная коммуникация и знание темы. Очень полезно!", rating: 5, date: "месяц назад" },
        { name: "Екатерина С.", text: "Превосходный совет и поддержка. Очень довольна сотрудничеством!", rating: 5, date: "3 недели назад" },
        { name: "Мартин В.", text: "Благодаря Ирине удалось консолидировать кредиты. Рекомендую!", rating: 5, date: "неделю назад" }
      ],
      linkText: "Смотреть больше отзывов на Google"
    },
    newsletter: {
      title: "Полезные Советы",
      desc: "Подпишитесь, чтобы получать актуальные новости о финансах, инвестициях и страховании.",
      placeholder: "Ваш Email",
      cta: "Подписаться"
    },
    contact: {
      title: "Контакты",
      subtitle: "Свяжитесь со мной удобным для вас способом",
      form: {
        name: "Имя и Фамилия",
        email: "Email",
        phone: "Телефон",
        language: "Предпочитаемый Язык",
        message: "Сообщение",
        submit: "Отправить Сообщение"
      },
      address: "Feliksa Radwańskiego 15, 30-065 Краков",
    },
    footer: {
      title: "Ирина Кошейко — Финансовый Консультант",
      description: "Финансовое консультирование на польском, украинском и русском языках.",
      disclaimer: "Информация на этом сайте носит исключительно информационный характер.",
      copyright: "Copyright © 2025 Ирина Кошейко. Все права защищены.",
      socialLinks: {
        linkedin: "https://www.linkedin.com/in/iryna-kosheiko-368377357/",
        instagram: "https://www.instagram.com/iryna_kosheiko_doradca?igsh=NnJnNGYyaHg4YjFh",
        telegram: "https://t.me/iryna_kosheiko_doradca",
        maps: "https://www.google.com/maps/search/?api=1&query=Iryna+Kosheiko+Financial+Advisor+Krakow"
      }
    }
  }
};

// Service Card Component
const ServiceCard = ({ item, icon: Icon, expandLabel, exampleLabel }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="h-full bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 border border-[#E5E5E5] overflow-hidden flex flex-col"
    >
      <div className="p-8 flex flex-col flex-grow">
        <div className="w-14 h-14 rounded-xl bg-[#F5F5F5] flex items-center justify-center mb-6 text-[#1C1917] group-hover:bg-[#1C1917] group-hover:text-white transition-colors">
          <Icon className="w-6 h-6 stroke-[1.5]" />
        </div>
        <h3 className="font-serif text-xl font-medium text-[#1C1917] mb-3">
          {item.title}
        </h3>
        <p className="text-[#666666] text-sm leading-relaxed mb-6">
          {item.desc}
        </p>
        
        <div className="mt-auto">
          <Popover>
            <PopoverTrigger asChild>
              <Button 
                className="w-full rounded-xl py-6 bg-[#F5EDE3] text-[#1C1917] hover:bg-[#1C1917] hover:text-white hover:shadow-lg transition-all duration-300 font-medium flex items-center justify-center gap-2 group"
              >
                 <span className="text-xs sm:text-sm font-bold">{expandLabel}</span>
                 <ChevronDown className="w-4 h-4 transition-transform duration-300 group-data-[state=open]:rotate-180" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-6 bg-white shadow-xl border border-[#E5E5E5] rounded-xl">
               <div className="space-y-4">
                  <div>
                    <h4 className="font-serif text-sm font-bold text-[#1C1917] mb-2">{expandLabel}</h4>
                    <p className="text-sm text-[#44403C] leading-relaxed">
                      {item.whyNow}
                    </p>
                  </div>
                  
                  <div className="bg-[#F9F9F9] rounded-lg p-4 border border-[#E5E5E5]">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#999999] block mb-1">
                      {exampleLabel}
                    </span>
                    <p className="text-sm text-[#333333] italic">
                      "{item.example}"
                    </p>
                  </div>
               </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </motion.div>
  );
};

export default function Home() {
  const [language, setLanguage] = useState('pl');
  const [showFloatingHeader, setShowFloatingHeader] = useState(false);
  const heroTitleRef = useRef(null);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    language: "",
    message: ""
  });
  
  const [emblaRef] = useEmblaCarousel({ loop: true });

  const isFormValid = Object.values(formData).every(value => value.trim() !== "");


  function openMailTo({ name, email, phone, preferredLanguage, message }) {
    const subject = encodeURIComponent(
      `New contact request from ${name || "Website"}`
    );

    const body = encodeURIComponent(
      [
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        `Preferred language: ${preferredLanguage}`,
        "",
        "Message:",
        message,
      ].join("\n")
    );

    const mailtoUrl = `mailto:${EMAIL_RECIPIENT}?subject=${subject}&body=${body}`;
    globalThis.location.href = mailtoUrl;
  }

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 50,
        damping: 20
      }
    }
  };

  const handleContactSubmit = (e) => {
  e.preventDefault();
  if (!isFormValid) return;

  openMailTo({
    name: formData.name,
    email: formData.email,
    phone: formData.phone,
    preferredLanguage: formData.language,
    message: formData.message,
  });
};

  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  const t = translations[language];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowFloatingHeader(!entry.isIntersecting && entry.boundingClientRect.top < 0);
      },
      { threshold: 0 }
    );

    if (heroTitleRef.current) {
      observer.observe(heroTitleRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Icons mapping for services
  const serviceIcons = [HomeIcon, Heart, Car, PiggyBank, Shield, TrendingUp];
  // Icons mapping for benefits
  const benefitIcons = [Clock, Users, Wallet, FileText, Landmark];

  const GoogleIcon = () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );

  return (
        <div className="min-h-screen bg-[#EFEEEA] text-[#292524] font-sans selection:bg-[#1C1917] selection:text-white">
          <Toaster position="top-center" />

          {/* Floating Back to Top Button */}
          <AnimatePresence>
            {showFloatingHeader && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-[#1C1917] text-white shadow-lg hover:bg-[#333333] transition-all flex items-center justify-center"
              >
                <ChevronDown className="w-5 h-5 rotate-180" />
              </motion.button>
            )}
          </AnimatePresence>
      {/* Navigation */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          showFloatingHeader 
            ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-[#E5E5E5] py-3' 
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* Floating Header Content */}
          <div className={`flex items-center gap-3 transition-all duration-300 ${
            showFloatingHeader 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 -translate-y-4 pointer-events-none'
          }`}>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-10 h-10 rounded-full overflow-hidden shadow-md border border-gray-200 bg-white hover:scale-105 transition-transform"
            >
              <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f2565d12abe71377f293e4/0bd3aba70_photo_2025-12-02160933.jpeg"
                alt="Logo"
                className="w-full h-full object-cover"
              />
            </button>
            <div className="flex flex-col">
              <span className="font-serif font-semibold text-[#1C1917] text-sm leading-tight">
                Iryna Kosheiko
              </span>
              <span className="text-[10px] uppercase tracking-wider text-[#666666] leading-tight hidden sm:block">
                {language === 'pl' ? "Doradca Finansowy" : 
                 language === 'uk' ? "Фінансовий Радник" : 
                 "Финансовый Консультант"}
              </span>
            </div>
          </div>
          
          {/* Language Switcher */}
          <div className="flex items-center gap-1">
            {['pl', 'uk', 'ru'].map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`px-3 py-1 rounded-md text-xs font-bold transition-all uppercase tracking-wider ${
                  language === lang ? 'bg-black text-white' : 'text-gray-500 hover:bg-gray-100'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex flex-col justify-center pt-28 pb-12 overflow-hidden bg-[#F5EDE3]">
        {/* Clean background */}

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="grid lg:grid-cols-12 gap-12 items-center mb-20">
             {/* Photo - Mobile Order 1 */}
             <motion.div 
              className="lg:col-span-5 lg:order-1 order-1 flex justify-center lg:justify-start"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
                <div className="absolute inset-0 rounded-full border border-[#000000]/10 scale-110"></div>
                <div className="w-full h-full rounded-full overflow-hidden shadow-2xl border-4 border-white">
                  <img 
                    src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f2565d12abe71377f293e4/0bd3aba70_photo_2025-12-02160933.jpeg" 
                    alt="Iryna Kosheiko"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>

            {/* Text - Mobile Order 2 */}
            <motion.div 
              className="lg:col-span-7 lg:order-2 order-2 text-center lg:text-left"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >

              <motion.h1 ref={heroTitleRef} variants={itemVariants} className="font-serif text-4xl md:text-6xl lg:text-7xl font-medium text-[#000000] mb-6 leading-[1.1] tracking-tight">
                {t.hero.headline}
              </motion.h1>
              
              <motion.p variants={itemVariants} className="text-lg md:text-xl text-[#333333] mb-8 max-w-xl mx-auto lg:mx-0 font-light leading-relaxed">
                {t.hero.subtitle}
              </motion.p>

              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button 
                  onClick={scrollToContact}
                  size="lg"
                  className="bg-[#000000] hover:bg-[#333333] text-white font-medium text-base px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {t.hero.cta}
                </Button>
                <Button 
                  onClick={() => window.open('https://t.me/iryna_kosheiko_doradca', '_blank')}
                  variant="outline"
                  size="lg"
                  className="bg-white border-[#E5E5E5] hover:bg-gray-50 text-[#000000] font-medium text-base px-8 py-6 rounded-full gap-2"
                >
                  <Send className="w-5 h-5" />
                  Telegram
                </Button>
              </motion.div>
            </motion.div>
          </div>

          {/* Numbers Strip */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-white rounded-2xl p-8 shadow-sm border border-[#E5E5E5]"
          >
            <div className="text-center md:text-left md:border-r border-[#E5E5E5] last:border-0 px-4">
              <h3 className="font-serif text-4xl font-medium text-[#000000] mb-1">1200+</h3>
              <p className="text-sm text-[#666666] uppercase tracking-wider">{t.about.stats.clients}</p>
            </div>
            <div className="text-center md:text-left md:border-r border-[#E5E5E5] last:border-0 px-4">
              <h3 className="font-serif text-4xl font-medium text-[#000000] mb-1">100+ mln</h3>
              <p className="text-sm text-[#666666] uppercase tracking-wider">{t.about.stats.credits}</p>
            </div>
            <div className="text-center md:text-left px-4">
              <h3 className="font-serif text-4xl font-medium text-[#000000] mb-1">7+</h3>
              <p className="text-sm text-[#666666] uppercase tracking-wider">{t.about.stats.experience}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-[#F9F9F9]">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-12 gap-12 items-start"
          >
            <motion.div variants={itemVariants} className="md:col-span-5 relative">
               <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                 <img
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f2565d12abe71377f293e4/d7a4f928a_IrynaKosheiko.png"
                  alt="Iryna Kosheiko"
                  className="w-full h-auto object-cover"
                />
               </div>
               <div className="absolute -bottom-6 -right-6 bg-[#F5EDE3] p-6 rounded-xl shadow-lg max-w-[200px] hidden md:block">
                 <p className="font-serif text-lg font-medium text-[#000000]">"Moim celem jest Twój spokój finansowy."</p>
               </div>
            </motion.div>

            <motion.div variants={containerVariants} className="md:col-span-7 md:pt-0">
              <motion.h2 variants={itemVariants} className="font-serif text-3xl md:text-5xl font-medium text-[#000000] mb-8">
                {t.about.title}
              </motion.h2>
              <motion.div variants={itemVariants} className="space-y-6 text-lg text-[#333333] font-light leading-relaxed">
                <p>{t.about.text}</p>
                <p>{t.about.text2}</p>
                <p>{t.about.text3}</p>
              </motion.div>
              

            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-3xl md:text-5xl font-medium text-[#000000] mb-4">
              {t.about.team.title}
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {t.about.team.members.map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group text-center"
              >
                <div className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-4 rounded-full overflow-hidden bg-[#F5F5F5] border-2 border-[#E5E5E5] group-hover:border-[#000000] transition-colors">
                  {member.image ? (
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#999999] text-2xl md:text-3xl font-serif font-medium">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  )}
                </div>
                <h3 className="font-serif text-sm md:text-base font-medium text-[#000000] mb-1">
                  {member.name}
                </h3>
                <p className="text-xs text-[#666666] leading-tight px-2">
                  {member.role}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-[#F5EDE3]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-3xl md:text-5xl font-medium text-[#000000] mb-4">
              {t.services.title}
            </h2>
            <p className="text-[#333333] max-w-2xl mx-auto font-light text-lg">
              {t.services.subtitle}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.services.items.map((item, idx) => {
              const Icon = serviceIcons[idx] || HomeIcon;
              return (
                <ServiceCard 
                  key={idx} 
                  item={item} 
                  icon={Icon} 
                  expandLabel={t.services.expandLabel} 
                  exampleLabel={t.services.exampleLabel} 
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            className="mb-16 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.h2 variants={itemVariants} className="font-serif text-3xl md:text-4xl font-medium text-[#000000] mb-12">
              {t.benefits.title}
            </motion.h2>
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
            >
              {t.benefits.items.map((item, idx) => {
                const Icon = benefitIcons[idx] || Check;
                return (
                  <motion.div variants={itemVariants} key={idx} className="flex flex-col items-start p-6 rounded-2xl bg-[#F9F9F9] hover:bg-[#F5EDE3] transition-colors duration-300 border border-transparent hover:border-[#E5E5E5]">
                    <div className="mb-4 p-3 rounded-lg bg-white text-[#000000] shadow-sm border border-[#E5E5E5]">
                      <Icon className="w-5 h-5 stroke-[1.5]" />
                    </div>
                    <h3 className="font-serif text-lg font-medium text-[#000000] mb-2">{item.title}</h3>
                    <p className="text-sm text-[#666666] leading-relaxed">{item.desc}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section - Carousel */}
      <section className="py-24 bg-[#F5EDE3] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-5xl font-medium text-[#000000] mb-4">
              {t.testimonials.title}
            </h2>
            <div className="flex items-center justify-center gap-2">
              <div className="flex text-[#000000]">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-sm font-medium text-[#666666]">{t.testimonials.subtitle}</span>
            </div>
          </div>

          <div className="relative cursor-grab active:cursor-grabbing" ref={emblaRef}>
            <div className="flex gap-6">
              {t.testimonials.reviews.map((review, idx) => (
                <div className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.33%] min-w-0" key={idx}>
                  <div className="bg-white p-8 rounded-2xl h-full shadow-sm border border-transparent hover:shadow-md transition-all">
                     <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 rounded-full bg-[#E5E5E5] flex items-center justify-center text-[#000000] font-bold text-lg">
                          {review.name[0]}
                        </div>
                        <div>
                          <p className="font-serif text-lg font-medium text-[#000000]">{review.name}</p>
                          <p className="text-xs text-[#666666]">{review.date}</p>
                        </div>
                        <div className="ml-auto">
                          <GoogleIcon />
                        </div>
                     </div>
                     <div className="flex gap-1 mb-4 text-[#000000]">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-current" />
                        ))}
                     </div>
                     <p className="text-[#333333] leading-relaxed italic opacity-80">"{review.text}"</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-12">
             <Button 
              variant="outline" 
              className="bg-transparent border-[#000000] text-[#000000] hover:bg-[#000000] hover:text-white transition-all px-8 rounded-full gap-2"
              onClick={() => window.open('https://www.google.com/maps/search/?api=1&query=Iryna+Kosheiko+Financial+Advisor+Krakow', '_blank')}
            >
              <GoogleIcon />
              {t.testimonials.linkText}
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-3xl md:text-5xl font-medium text-[#000000] mb-4">
              {t.contact.title}
            </h2>
            <p className="text-[#333333] text-lg">
              {t.contact.subtitle}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Contact Tiles */}
            <div className="space-y-6">
               <div className="bg-white p-6 rounded-2xl shadow-sm flex items-center gap-6">
                  <div className="w-14 h-14 rounded-full bg-[#F5F5F5] flex items-center justify-center text-[#000000]">
                     <Phone className="w-6 h-6" />
                  </div>
                  <div>
                     <p className="text-xs uppercase tracking-wider text-[#999999] font-bold mb-1">Phone</p>
                     <a href="tel:+48792687086" className="text-xl font-serif font-medium text-[#000000] hover:text-[#666666]">+48 792 687 086</a>
                  </div>
               </div>
               
               <div className="bg-white p-6 rounded-2xl shadow-sm flex items-center gap-6">
                  <div className="w-14 h-14 rounded-full bg-[#F5F5F5] flex items-center justify-center text-[#000000]">
                     <Mail className="w-6 h-6" />
                  </div>
                  <div>
                     <p className="text-xs uppercase tracking-wider text-[#999999] font-bold mb-1">Email</p>
                     <a href="mailto:iryna.kosheiko@phinance.pl" className="text-xl font-serif font-medium text-[#000000] hover:text-[#666666]">iryna.kosheiko@phinance.pl</a>
                  </div>
               </div>

               <div className="bg-white p-6 rounded-2xl shadow-sm flex items-center gap-6">
                  <div className="w-14 h-14 rounded-full bg-[#F5F5F5] flex items-center justify-center text-[#000000]">
                     <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                     <p className="text-xs uppercase tracking-wider text-[#999999] font-bold mb-1">Location</p>
                     <p className="text-xl font-serif font-medium text-[#000000]">{t.contact.address}</p>
                  </div>
               </div>

               {/* Direct Contact Actions */}
               <div className="pt-6">
                  <Button 
                    onClick={() => window.open('https://t.me/iryna_kosheiko_doradca', '_blank')}
                    className="w-full h-14 rounded-full bg-[#229ED9] hover:bg-[#1b8bbd] text-white font-medium text-lg shadow-sm transition-all"
                  >
                     <Send className="w-5 h-5 mr-2" />
                     Napisz na Telegram
                  </Button>
               </div>

              
            </div>

            {/* Form */}
            <div className="bg-white p-10 rounded-3xl shadow-lg border border-[#E5E5E5]">
              <h3 className="font-serif text-2xl font-medium text-[#000000] mb-8">{t.contact.form.submit}</h3>
              <form className="space-y-5" onSubmit={handleContactSubmit}>
                  <Input 
                    placeholder={t.contact.form.name} 
                    className="bg-[#F9F9F9] border-none h-14 rounded-xl px-6 text-base focus:ring-1 focus:ring-[#000000] placeholder:text-[#666666]" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                  <Input 
                    placeholder={t.contact.form.email} 
                    type="email" 
                    className="bg-[#F9F9F9] border-none h-14 rounded-xl px-6 text-base focus:ring-1 focus:ring-[#000000] placeholder:text-[#666666]" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                  />
                  <Input 
                    placeholder={t.contact.form.phone} 
                    type="tel" 
                    className="bg-[#F9F9F9] border-none h-14 rounded-xl px-6 text-base focus:ring-1 focus:ring-[#000000] placeholder:text-[#666666]" 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    required
                  />
                  <Select 
                    value={formData.language} 
                    onValueChange={(value) => setFormData({...formData, language: value})}
                    required
                  >
                    <SelectTrigger className="bg-[#F9F9F9] border-none h-14 rounded-xl px-6 text-base focus:ring-1 focus:ring-[#000000] placeholder:text-[#666666]">
                      <SelectValue placeholder={t.contact.form.language} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PL">Polski (PL)</SelectItem>
                      <SelectItem value="UA">Українська (UA)</SelectItem>
                      <SelectItem value="RU">Русский (RU)</SelectItem>
                    </SelectContent>
                  </Select>
                <Textarea 
                  placeholder={t.contact.form.message} 
                  rows={4} 
                  className="bg-[#F9F9F9] border-none rounded-xl p-6 text-base resize-none focus:ring-1 focus:ring-[#000000] placeholder:text-[#666666]" 
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  required
                />
                <div className="text-xs text-[#999999] mt-4 leading-relaxed">
                  {language === 'pl' ? "Twoje dane są bezpieczne. Odpisuję zazwyczaj w ciągu 24 godzin." : 
                   language === 'uk' ? "Ваші дані в безпеці. Зазвичай я відповідаю протягом 24 годин." : 
                   "Ваши данные в безопасности. Обычно я отвечаю в течение 24 часов."}
                </div>
                <Button 
                  type="submit"
                  disabled={!isFormValid}
                  className={`w-full h-14 rounded-full font-medium text-lg transition-all ${
                    isFormValid 
                      ? "bg-[#000000] hover:bg-[#333333] text-white" 
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  {t.contact.form.submit}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#FAF7F2] border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
              {/* Logo + Identity */}
              <div className="flex flex-col md:flex-row items-center md:items-start gap-5 text-center md:text-left">
                <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-xs font-serif font-bold text-[#1C1917] shadow-sm shrink-0">
                  IK
                </div>
                <div>
                  <h3 className="font-serif text-lg font-medium text-[#1C1917]">
                      {t.footer.title}
                  </h3>
                  <p className="text-sm text-[#666666] max-w-md mt-1 leading-relaxed">
                      {t.footer.description}
                  </p>
                </div>
              </div>
              
              {/* Social Icons */}
              <div className="flex gap-3">
                <a href={t.footer.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-[#666666] hover:bg-[#1C1917] hover:text-white hover:border-[#1C1917] transition-all bg-white" title="LinkedIn">
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href={t.footer.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-[#666666] hover:bg-[#1C1917] hover:text-white hover:border-[#1C1917] transition-all bg-white" title="Instagram">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href={t.footer.socialLinks.maps} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-[#666666] hover:bg-[#1C1917] hover:text-white hover:border-[#1C1917] transition-all bg-white" title="Google Maps">
                  <MapPin className="w-4 h-4" />
                </a>
              </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-200 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
            <p className="text-center md:text-left font-medium">
              {t.footer.copyright}
            </p>
            <p className="text-center md:text-right opacity-70">
              {t.footer.disclaimer}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}