// Анаграм — Велика база речи са емоџијима
// Организовано по разредима и категоријама
// Свака реч има emoji уместо слике

const gameData = {
    // ═══════════════════════════════════════════
    // 1. РАЗРЕД — Основно читање и писање
    // ═══════════════════════════════════════════
    "1": {
        label: "1. разред",
        categories: {
            "animals_short": {
                label: "Животиње (кратке речи)",
                words: [
                    { word: "ПАС", emoji: "🐕", image: "images/pas.png" },
                    { word: "ЋУК", emoji: "🦉" },
                    { word: "МИШ", emoji: "🐭", image: "images/mis.png" },
                    { word: "ЛАВ", emoji: "🦁", image: "images/lav.png" },
                    { word: "ПУЖ", emoji: "🐌", image: "images/puz.png" },
                    { word: "КОС", emoji: "🐦", image: "images/kos.png" },
                    { word: "ЗЕЦ", emoji: "🐰" },
                    { word: "ВУК", emoji: "🐺" },
                    { word: "РАК", emoji: "🦀" },
                    { word: "СОМ", emoji: "🐟" },
                    { word: "ЈЕЖ", emoji: "🦔" },
                    { word: "БИК", emoji: "🐂" },
                    { word: "РОД", emoji: "🦩" },
                    { word: "ВОЛ", emoji: "🐮" },
                    { word: "КОЊ", emoji: "🐴" }
                ]
            },
            "body": {
                label: "Тело",
                words: [
                    { word: "ОКО", emoji: "👁️", image: "images/oko.png" },
                    { word: "УХО", emoji: "👂", image: "images/uho.png" },
                    { word: "НОС", emoji: "👃", image: "images/nos.png" },
                    { word: "ЗУБ", emoji: "🦷" },
                    { word: "ДЛАН", emoji: "🤲" },
                    { word: "РУКА", emoji: "💪", image: "images/ruka.png" },
                    { word: "НОГА", emoji: "🦵", image: "images/noga.png" },
                    { word: "ВРАТ", emoji: "🫁" },
                    { word: "УСТА", emoji: "👄" },
                    { word: "ГЛАВА", emoji: "🗣️" },
                    { word: "ПРСТ", emoji: "👆" },
                    { word: "КОСА", emoji: "💇" },
                    { word: "ЛЕЂА", emoji: "🔙" }
                ]
            },
            "family": {
                label: "Породица",
                words: [
                    { word: "МАМА", emoji: "👩", image: "images/mama.png" },
                    { word: "ТАТА", emoji: "👨", image: "images/tata.png" },
                    { word: "БАТА", emoji: "👦", image: "images/bata.png" },
                    { word: "СЕКА", emoji: "👧" },
                    { word: "БАБА", emoji: "👵" },
                    { word: "ДЕДА", emoji: "👴", image: "images/deda.png" },
                    { word: "БЕБА", emoji: "👶" },
                    { word: "ТЕТКА", emoji: "👩‍🦱" },
                    { word: "ЧИКА", emoji: "🧔" },
                    { word: "УЈАК", emoji: "👨‍🦳" },
                    { word: "СТРИЦ", emoji: "👨‍🦰" }
                ]
            },
            "animals_long": {
                label: "Животиње (дуже речи)",
                words: [
                    { word: "МАЦА", emoji: "🐱", image: "images/maca.png" },
                    { word: "ПИЛЕ", emoji: "🐣", image: "images/pile.png" },
                    { word: "КРАВА", emoji: "🐄", image: "images/krava.png" },
                    { word: "ОВЦА", emoji: "🐑" },
                    { word: "КОЗА", emoji: "🐐" },
                    { word: "КОКОШКА", emoji: "🐔" },
                    { word: "ПАТКА", emoji: "🦆" },
                    { word: "СВИЊА", emoji: "🐷" },
                    { word: "ПЧЕЛА", emoji: "🐝" },
                    { word: "ЖАБА", emoji: "🐸" },
                    { word: "ГОЛУБ", emoji: "🕊️" },
                    { word: "ОРАО", emoji: "🦅" },
                    { word: "МЕДВЕД", emoji: "🐻" },
                    { word: "МАЧКА", emoji: "🐈" },
                    { word: "ЛИСИЦА", emoji: "🦊" },
                    { word: "СОВА", emoji: "🦉" },
                    { word: "ДЕЛФИН", emoji: "🐬" },
                    { word: "ЖИРАФА", emoji: "🦒" },
                    { word: "СЛОН", emoji: "🐘" },
                    { word: "ТИГАР", emoji: "🐅" },
                    { word: "ЗМИЈА", emoji: "🐍" }
                ]
            },
            "objects": {
                label: "Предмети",
                words: [
                    { word: "САТ", emoji: "⏰", image: "images/sat.png" },
                    { word: "СОК", emoji: "🧃", image: "images/sok.png" },
                    { word: "ЗИД", emoji: "🧱", image: "images/zid.png" },
                    { word: "ТОП", emoji: "⚽" },
                    { word: "ЛЕД", emoji: "🧊" },
                    { word: "МЕД", emoji: "🍯" },
                    { word: "ЧАЈ", emoji: "🍵" },
                    { word: "ШАЛ", emoji: "🧣" },
                    { word: "КИША", emoji: "🌧️" },
                    { word: "КУЋА", emoji: "🏠", image: "images/kuca.png" },
                    { word: "ДРВО", emoji: "🌳", image: "images/drvo.png" },
                    { word: "ЦВЕТ", emoji: "🌸" },
                    { word: "КОЛО", emoji: "🎡" },
                    { word: "ТОРБА", emoji: "🎒", image: "images/torba.png" },
                    { word: "СУНЦЕ", emoji: "☀️", image: "images/sunce.png" },
                    { word: "МЕСЕЦ", emoji: "🌙" },
                    { word: "ЗВЕЗДА", emoji: "⭐" },
                    { word: "ОБЛАК", emoji: "☁️" },
                    { word: "СНЕГ", emoji: "❄️" },
                    { word: "ВАТРА", emoji: "🔥" }
                ]
            },
            "school": {
                label: "Школа",
                words: [
                    { word: "ШКОЛА", emoji: "🏫", image: "images/skola.png" },
                    { word: "КЊИГА", emoji: "📖", image: "images/knjiga.png" },
                    { word: "ОЛОВКА", emoji: "✏️", image: "images/olovka.png" },
                    { word: "ГУМИЦА", emoji: "📏", image: "images/gumica.png" },
                    { word: "ТАБЛА", emoji: "📋", image: "images/tabla.png" },
                    { word: "КЛУПА", emoji: "🪑", image: "images/klupa.png" },
                    { word: "СТОЛИЦА", emoji: "💺", image: "images/stolica.png" },
                    { word: "СВЕСКА", emoji: "📓" },
                    { word: "БОЈА", emoji: "🎨" },
                    { word: "ЧЕТКА", emoji: "🖌️" },
                    { word: "ЛЕЊИР", emoji: "📐" },
                    { word: "ПЛОЧА", emoji: "🟫", image: "images/ploca.png" },
                    { word: "КРПА", emoji: "🧽" }
                ]
            },
            "food": {
                label: "Храна",
                words: [
                    { word: "ХЛЕБ", emoji: "🍞" },
                    { word: "МЛЕКО", emoji: "🥛" },
                    { word: "ЈАЈЕ", emoji: "🥚" },
                    { word: "СИР", emoji: "🧀" },
                    { word: "ЈАБУКА", emoji: "🍎" },
                    { word: "БАНАНА", emoji: "🍌" },
                    { word: "ГРОЖЂЕ", emoji: "🍇" },
                    { word: "ЛУБЕНИЦА", emoji: "🍉" },
                    { word: "ЈАГОДА", emoji: "🍓" },
                    { word: "ВИШЊА", emoji: "🍒" },
                    { word: "ШАРГАРЕПА", emoji: "🥕" },
                    { word: "КУКУРУЗ", emoji: "🌽" },
                    { word: "ПАРАДАЈЗ", emoji: "🍅" },
                    { word: "ПАПРИКА", emoji: "🫑" },
                    { word: "КРОМПИР", emoji: "🥔" },
                    { word: "ТОРТА", emoji: "🎂" },
                    { word: "КОЛАЧ", emoji: "🍰" },
                    { word: "БОМБОН", emoji: "🍬" },
                    { word: "СЛАДОЛЕД", emoji: "🍦" },
                    { word: "ПИЦА", emoji: "🍕" }
                ]
            }
        }
    },
    // ═══════════════════════════════════════════
    // 2. РАЗРЕД — Именице, глаголи, природа
    // ═══════════════════════════════════════════
    "2": {
        label: "2. разред",
        categories: {
            "professions": {
                label: "Занимања",
                words: [
                    { word: "ПЕКАР", emoji: "👨‍🍳", image: "images/pekar.png" },
                    { word: "ЛЕКАР", emoji: "👨‍⚕️", image: "images/lekar.png" },
                    { word: "СЛИКАР", emoji: "👨‍🎨", image: "images/slikar.png" },
                    { word: "ЗИДАР", emoji: "👷", image: "images/zidar.png" },
                    { word: "КРОВАР", emoji: "🏗️", image: "images/krovar.png" },
                    { word: "УЧИТЕЉ", emoji: "👩‍🏫", image: "images/ucitelj.png" },
                    { word: "ВОЗАЧ", emoji: "🚗", image: "images/vozac.png" },
                    { word: "КУВАР", emoji: "🧑‍🍳", image: "images/kuvar.png" },
                    { word: "КЊИЖАР", emoji: "📚", image: "images/knjizar.png" },
                    { word: "ВРТЛАР", emoji: "👨‍🌾", image: "images/vrtlar.png" },
                    { word: "ПИЛОТ", emoji: "✈️" },
                    { word: "СУДИЈА", emoji: "⚖️" },
                    { word: "ВАТРОГАСАЦ", emoji: "🧑‍🚒" },
                    { word: "ГЛУМАЦ", emoji: "🎭" },
                    { word: "ПЕВАЧ", emoji: "🎤" },
                    { word: "ФРИЗЕР", emoji: "💇" },
                    { word: "СТРАЖАР", emoji: "💂" },
                    { word: "ПОШТАР", emoji: "📮" },
                    { word: "МУЗИЧАР", emoji: "🎵" },
                    { word: "НАУЧНИК", emoji: "🔬" }
                ]
            },
            "verbs": {
                label: "Глаголи — шта радимо",
                words: [
                    { word: "ТРЧАТИ", emoji: "🏃", image: "images/trcati.png" },
                    { word: "ПЕВАЋУ", emoji: "🎶", image: "images/pevacu.png" },
                    { word: "СКАЧЕМ", emoji: "🤸", image: "images/skacem.png" },
                    { word: "ЧИТАМО", emoji: "📖", image: "images/citamo.png" },
                    { word: "ПИШЕТЕ", emoji: "✍️", image: "images/pisete.png" },
                    { word: "ГЛЕДАЈ", emoji: "👀", image: "images/gledaj.png" },
                    { word: "СЛУШАЈ", emoji: "👂", image: "images/slusaj.png" },
                    { word: "РАДИМО", emoji: "💪", image: "images/radimo.png" },
                    { word: "УЧИМО", emoji: "📚", image: "images/ucimo.png" },
                    { word: "ВОЛИМО", emoji: "❤️", image: "images/volimo.png" },
                    { word: "ИГРАМО", emoji: "⚽" },
                    { word: "ЦРТАМО", emoji: "🖍️" },
                    { word: "КУВАМО", emoji: "🍳" },
                    { word: "ПЕВАМО", emoji: "🎵" },
                    { word: "ВОЗИМО", emoji: "🚙" },
                    { word: "ЛЕТИМО", emoji: "✈️" },
                    { word: "ПЛИВАМ", emoji: "🏊" },
                    { word: "ЈЕДЕМО", emoji: "🍽️" },
                    { word: "СПАВАМ", emoji: "😴" },
                    { word: "МИСЛИМ", emoji: "🤔" }
                ]
            },
            "nature": {
                label: "Природа",
                words: [
                    { word: "ШУМА", emoji: "🌲" },
                    { word: "РЕКА", emoji: "🏞️" },
                    { word: "ЈЕЗЕРО", emoji: "🏔️" },
                    { word: "ПЛАНИНА", emoji: "⛰️" },
                    { word: "ПОЉЕ", emoji: "🌾" },
                    { word: "ЛИВАДА", emoji: "🌿" },
                    { word: "ОСТРВО", emoji: "🏝️" },
                    { word: "ПЕЋИНА", emoji: "🕳️" },
                    { word: "ВОДОПАД", emoji: "💧" },
                    { word: "МОРЕ", emoji: "🌊" },
                    { word: "ТРАВА", emoji: "🌱" },
                    { word: "КАМЕН", emoji: "🪨" },
                    { word: "ПЕСАК", emoji: "🏖️" },
                    { word: "ИЗВОР", emoji: "💦" },
                    { word: "ВЕТАР", emoji: "💨" }
                ]
            },
            "transport": {
                label: "Превоз",
                words: [
                    { word: "АУТО", emoji: "🚗" },
                    { word: "АУТОБУС", emoji: "🚌" },
                    { word: "ВОЗ", emoji: "🚂" },
                    { word: "БРОД", emoji: "🚢" },
                    { word: "АВИОН", emoji: "✈️" },
                    { word: "БИЦИКЛ", emoji: "🚲" },
                    { word: "ТРАМВАЈ", emoji: "🚋" },
                    { word: "ХЕЛИКОПТЕР", emoji: "🚁" },
                    { word: "РАКЕТА", emoji: "🚀" },
                    { word: "КАМИОН", emoji: "🚛" },
                    { word: "МОТОР", emoji: "🏍️" },
                    { word: "ТАКСИ", emoji: "🚕" },
                    { word: "СКУТЕР", emoji: "🛵" },
                    { word: "ЧАМАЦ", emoji: "⛵" },
                    { word: "МЕТРО", emoji: "🚇" }
                ]
            },
            "seasons": {
                label: "Годишња доба и време",
                words: [
                    { word: "ПРОЛЕЋЕ", emoji: "🌷" },
                    { word: "ЛЕТО", emoji: "☀️" },
                    { word: "ЈЕСЕН", emoji: "🍂" },
                    { word: "ЗИМА", emoji: "❄️" },
                    { word: "ОЛУЈА", emoji: "⛈️" },
                    { word: "ДУГА", emoji: "🌈" },
                    { word: "МАГЛА", emoji: "🌫️" },
                    { word: "ГРАД", emoji: "🌨️" },
                    { word: "МРАЗ", emoji: "🥶" },
                    { word: "ТОПЛО", emoji: "🌡️" },
                    { word: "ХЛАДНО", emoji: "🧊" },
                    { word: "РОСА", emoji: "💧" }
                ]
            }
        }
    },
    // ═══════════════════════════════════════════
    // 3. РАЗРЕД — Придеви, географија, спорт
    // ═══════════════════════════════════════════
    "3": {
        label: "3. разред",
        categories: {
            "adjectives": {
                label: "Придеви — какво је?",
                words: [
                    { word: "ВЕСЕО", emoji: "😊", image: "images/veseo.png" },
                    { word: "ТУЖАН", emoji: "😢", image: "images/tuzan.png" },
                    { word: "СРЕЋАН", emoji: "😃", image: "images/srecan.png" },
                    { word: "БРЗ", emoji: "⚡", image: "images/brz.png" },
                    { word: "СПОРО", emoji: "🐢", image: "images/sporo.png" },
                    { word: "ВИСОК", emoji: "🏔️", image: "images/visok.png" },
                    { word: "НИЗАК", emoji: "⬇️", image: "images/nizak.png" },
                    { word: "ДЕБЕО", emoji: "🐘", image: "images/debeo.png" },
                    { word: "МРШАВ", emoji: "🦴", image: "images/mrsav.png" },
                    { word: "ПЛАВИ", emoji: "🔵", image: "images/plavi.png" },
                    { word: "ЦРВЕН", emoji: "🔴" },
                    { word: "ЗЕЛЕН", emoji: "🟢" },
                    { word: "ЖУТИ", emoji: "🟡" },
                    { word: "БЕЛИ", emoji: "⚪" },
                    { word: "ЦРНИ", emoji: "⚫" },
                    { word: "ВЕЛИК", emoji: "🦣" },
                    { word: "МАЛИ", emoji: "🐜" },
                    { word: "ТВРД", emoji: "💎" },
                    { word: "МЕКАН", emoji: "🧸" },
                    { word: "СЛАДАК", emoji: "🍭" },
                    { word: "ГОРАК", emoji: "🫒" },
                    { word: "КИСЕЛО", emoji: "🍋" },
                    { word: "ХРАБАР", emoji: "🦸" },
                    { word: "ПАМЕТАН", emoji: "🧠" },
                    { word: "ЛЕДЕН", emoji: "🧊" }
                ]
            },
            "geography": {
                label: "Градови и географ.",
                words: [
                    { word: "БЕОГРАД", emoji: "🏛️", image: "images/beograd.png" },
                    { word: "НОВИ САД", emoji: "🌉", image: "images/novi_sad.png" },
                    { word: "НИШ", emoji: "🏰", image: "images/nis.png" },
                    { word: "КРАГУЈЕВАЦ", emoji: "🏭", image: "images/kragujevac.png" },
                    { word: "СУБОТИЦА", emoji: "🏘️", image: "images/subotica.png" },
                    { word: "ЗЛАТИБОР", emoji: "🏔️", image: "images/zlatibor.png" },
                    { word: "КОПАОНИК", emoji: "⛷️", image: "images/kopaonik.png" },
                    { word: "ДУНАВ", emoji: "🌊", image: "images/dunav.png" },
                    { word: "САВА", emoji: "🏞️", image: "images/sava.png" },
                    { word: "МОРАВА", emoji: "💧", image: "images/morava.png" },
                    { word: "ТАРА", emoji: "🌲" },
                    { word: "УЖИЦЕ", emoji: "🏙️" },
                    { word: "ЛЕСКОВАЦ", emoji: "🌶️" },
                    { word: "ВРАЊЕ", emoji: "🏘️" },
                    { word: "СОМБОР", emoji: "🌻" },
                    { word: "ЗРЕЊАНИН", emoji: "🏛️" },
                    { word: "ЧАЧАК", emoji: "🏔️" },
                    { word: "ВАЉЕВО", emoji: "🌳" },
                    { word: "ШАБАЦ", emoji: "🏘️" },
                    { word: "СМЕДЕРЕВО", emoji: "🏰" }
                ]
            },
            "sports": {
                label: "Спорт",
                words: [
                    { word: "ФУДБАЛ", emoji: "⚽" },
                    { word: "КОШАРКА", emoji: "🏀" },
                    { word: "ОДБОЈКА", emoji: "🏐" },
                    { word: "ТЕНИС", emoji: "🎾" },
                    { word: "ПЛИВАЊЕ", emoji: "🏊" },
                    { word: "ТРЧАЊЕ", emoji: "🏃" },
                    { word: "СКИЈАЊЕ", emoji: "⛷️" },
                    { word: "КАРАТЕ", emoji: "🥋" },
                    { word: "БОКС", emoji: "🥊" },
                    { word: "АТЛЕТИКА", emoji: "🏅" },
                    { word: "ГОЛМАН", emoji: "🧤" },
                    { word: "УТАКМИЦА", emoji: "🏟️" },
                    { word: "ПОБЕДА", emoji: "🏆" },
                    { word: "МЕДАЉА", emoji: "🥇" },
                    { word: "РЕКОРД", emoji: "📊" }
                ]
            },
            "space": {
                label: "Свемир",
                words: [
                    { word: "ОРБИТА", emoji: "🌀" },
                    { word: "ПЛУТОН", emoji: "🔵" },
                    { word: "ЗЕМЉА", emoji: "🌍" },
                    { word: "МАРС", emoji: "🔴" },
                    { word: "ВЕНЕРА", emoji: "🌟" },
                    { word: "ЈУПИТЕР", emoji: "🪐" },
                    { word: "САТУРН", emoji: "💫" },
                    { word: "ТЕЛЕСКОП", emoji: "🔭" },
                    { word: "АСТЕРОИД", emoji: "☄️" },
                    { word: "КОМЕТА", emoji: "☄️" },
                    { word: "ГАЛАКСИЈА", emoji: "🌌" },
                    { word: "КОСМОС", emoji: "🛸" },
                    { word: "НЕБО", emoji: "🌈" }
                ]
            },
            "music": {
                label: "Музика",
                words: [
                    { word: "ГИТАРА", emoji: "🎸" },
                    { word: "КЛАВИР", emoji: "🎹" },
                    { word: "БУБАЊ", emoji: "🥁" },
                    { word: "ВИОЛИНА", emoji: "🎻" },
                    { word: "ФЛАУТА", emoji: "🪈" },
                    { word: "ПЕСМА", emoji: "🎶" },
                    { word: "КОНЦЕРТ", emoji: "🎼" },
                    { word: "ОРКЕСТАР", emoji: "🎵" },
                    { word: "ХАРМОНИКА", emoji: "🪗" },
                    { word: "НОТА", emoji: "🎵" }
                ]
            }
        }
    },
    // ═══════════════════════════════════════════
    // 4. РАЗРЕД — Граматика, наука, сложеније
    // ═══════════════════════════════════════════
    "4": {
        label: "4. разред",
        categories: {
            "grammar": {
                label: "Граматика",
                words: [
                    { word: "ИМЕНИЦА", emoji: "📝" },
                    { word: "ГЛАГОЛ", emoji: "🏃" },
                    { word: "ПРИДЕВ", emoji: "🎨" },
                    { word: "ЗАМЕНИЦА", emoji: "👆" },
                    { word: "БРОЈ", emoji: "🔢" },
                    { word: "СУБЈЕКАТ", emoji: "👤" },
                    { word: "ПРЕДИКАТ", emoji: "⚡" },
                    { word: "ОБЈЕКАТ", emoji: "📦" },
                    { word: "РЕЧЕНИЦА", emoji: "💬" },
                    { word: "ПРИЛОГ", emoji: "📎" },
                    { word: "ПРЕДЛОГ", emoji: "📍" },
                    { word: "ВЕЗНИК", emoji: "🔗" },
                    { word: "УЗВИК", emoji: "❗" },
                    { word: "ПАДЕЖ", emoji: "📋" },
                    { word: "ЈЕДНИНА", emoji: "1️⃣" },
                    { word: "МНОЖИНА", emoji: "👥" },
                    { word: "СЛАГАЊЕ", emoji: "🧩" }
                ]
            },
            "science": {
                label: "Наука",
                words: [
                    { word: "АТОМ", emoji: "⚛️" },
                    { word: "МОЛЕКУЛ", emoji: "🔬" },
                    { word: "ЕНЕРГИЈА", emoji: "⚡" },
                    { word: "МАГНЕТ", emoji: "🧲" },
                    { word: "БИЉКА", emoji: "🌱" },
                    { word: "ПЛОД", emoji: "🍎" },
                    { word: "КОРЕН", emoji: "🌿" },
                    { word: "СТАБЛО", emoji: "🌳" },
                    { word: "ЛИСТ", emoji: "🍃" },
                    { word: "СЕМЕ", emoji: "🌰" },
                    { word: "ВАЗДУХ", emoji: "💨" },
                    { word: "ВОДА", emoji: "💧" },
                    { word: "ТЕЛО", emoji: "🫀" },
                    { word: "КИСЕОНИК", emoji: "🌬️" },
                    { word: "СВЕТЛОСТ", emoji: "💡" }
                ]
            },
            "technology": {
                label: "Технологија",
                words: [
                    { word: "РАЧУНАР", emoji: "💻" },
                    { word: "ТЕЛЕФОН", emoji: "📱" },
                    { word: "ИНТЕРНЕТ", emoji: "🌐" },
                    { word: "ТЕЛЕВИЗОР", emoji: "📺" },
                    { word: "РОБОТ", emoji: "🤖" },
                    { word: "ПРОЦЕСОР", emoji: "🧠" },
                    { word: "ТАСТАТУРА", emoji: "⌨️" },
                    { word: "ЕКРАН", emoji: "🖥️" },
                    { word: "ШТАМПАЧ", emoji: "🖨️" },
                    { word: "КАМЕРА", emoji: "📸" },
                    { word: "САТЕЛИТ", emoji: "🛰️" },
                    { word: "ДРОН", emoji: "🛸" },
                    { word: "БАТЕРИЈА", emoji: "🔋" },
                    { word: "СИГНАЛ", emoji: "📡" },
                    { word: "ПРОГРАМ", emoji: "👨‍💻" }
                ]
            },
            "complex_words": {
                label: "Сложеније речи",
                words: [
                    { word: "АУТОМОБИЛ", emoji: "🚗" },
                    { word: "БИБЛИОТЕКА", emoji: "📚" },
                    { word: "УНИВЕРЗИТЕТ", emoji: "🎓" },
                    { word: "ПРЕДСЕДНИК", emoji: "🏛️" },
                    { word: "ДЕМОКРАТИЈА", emoji: "🗳️" },
                    { word: "ИСТОРИЈА", emoji: "📜" },
                    { word: "ГЕОГРАФИЈА", emoji: "🗺️" },
                    { word: "МАТЕМАТИКА", emoji: "🔢" },
                    { word: "КЊИЖЕВНОСТ", emoji: "📖" },
                    { word: "УМЕТНОСТ", emoji: "🎨" },
                    { word: "АРХИТЕКТУРА", emoji: "🏗️" },
                    { word: "ФОТОГРАФИЈА", emoji: "📷" },
                    { word: "АСТРОНОМИЈА", emoji: "🔭" },
                    { word: "ЕКОЛОГИЈА", emoji: "♻️" },
                    { word: "КРЕАТИВНОСТ", emoji: "💡" }
                ]
            },
            "emotions": {
                label: "Осећања",
                words: [
                    { word: "РАДОСТ", emoji: "😊" },
                    { word: "ТУГА", emoji: "😢" },
                    { word: "СТРАХ", emoji: "😨" },
                    { word: "ЉУТЊА", emoji: "😠" },
                    { word: "НАДА", emoji: "🌅" },
                    { word: "ЉУБАВ", emoji: "❤️" },
                    { word: "ПОНОС", emoji: "😤" },
                    { word: "СТИД", emoji: "😳" },
                    { word: "СМЕХ", emoji: "😂" },
                    { word: "ПЛАЧ", emoji: "😭" },
                    { word: "МИР", emoji: "☮️" },
                    { word: "СРЕЋА", emoji: "🍀" },
                    { word: "ХРАБРОСТ", emoji: "🦁" },
                    { word: "ДРУЖБА", emoji: "🤝" },
                    { word: "СНАГА", emoji: "💪" }
                ]
            },
            "history": {
                label: "Историја Србије",
                words: [
                    { word: "НЕМАЊИЋ", emoji: "👑" },
                    { word: "ОБИЛИЋ", emoji: "⚔️" },
                    { word: "КОСОВО", emoji: "🏔️" },
                    { word: "КАРАЂОРЂЕ", emoji: "🗡️" },
                    { word: "УСТАНАК", emoji: "⚔️" },
                    { word: "СЛОБОДА", emoji: "🕊️" },
                    { word: "СРБИЈА", emoji: "🇷🇸" },
                    { word: "ХИМНА", emoji: "🎵" },
                    { word: "ЗАСТАВА", emoji: "🏴" },
                    { word: "ЈУНАК", emoji: "🦸" },
                    { word: "ВИТЕЗ", emoji: "⚔️" },
                    { word: "МАНАСТИР", emoji: "⛪" },
                    { word: "СТЕФАН", emoji: "👑" },
                    { word: "ДУШАН", emoji: "📜" },
                    { word: "ЛАЗАР", emoji: "⚔️" }
                ]
            }
        }
    }
};

window.gameData = gameData;
