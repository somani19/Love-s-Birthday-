import { GiftItem, ButterflyItem, StarItem, BalloonItem, WishCard } from '../types';

export const PERSONAL_INFO = {
  name: 'Soni My Doll 🪆',
  nickname: 'Soni',
  title: 'My Little Doll',
  age: 16,
  gender: 'Girl',
  createdBy: 'Mannu 🐻',
  theme: 'Sweet 16 Fairytale Starlight',
  primaryColor: '#F472B6', // Rose pink
  secondaryColor: '#C084FC', // Soft violet
  accentColor: '#FBBF24', // Golden starlight
};

// Level 3: 10 Unique Gift Boxes
export const GIFT_BOXES: GiftItem[] = [
  {
    id: 1,
    boxColor: 'from-pink-500 to-rose-600',
    ribbonColor: 'bg-amber-300',
    title: 'The Gift of Eternal Joy 🌸',
    wish: 'May your 16th year be filled with genuine, effortless laughter that bubbles straight from your heart every single day.',
    icon: '🌸',
    sparkleType: 'sparkle-pink'
  },
  {
    id: 2,
    boxColor: 'from-purple-500 to-indigo-600',
    ribbonColor: 'bg-pink-300',
    title: 'The Gift of Courage & Confidence 👑',
    wish: 'May you always walk with your head held high, knowing you are capable of achieving anything your beautiful mind dreams of.',
    icon: '👑',
    sparkleType: 'sparkle-gold'
  },
  {
    id: 3,
    boxColor: 'from-amber-400 to-orange-500',
    ribbonColor: 'bg-rose-400',
    title: 'The Gift of Radiant Health 🌿',
    wish: 'Wishing you vibrant health, glowing energy, and peace that protects your soft, caring soul wherever you go.',
    icon: '🌿',
    sparkleType: 'sparkle-green'
  },
  {
    id: 4,
    boxColor: 'from-cyan-400 to-blue-500',
    ribbonColor: 'bg-yellow-200',
    title: 'The Gift of Big Dreams 🚀',
    wish: 'Step fearlessly into your Sweet 16! May every door of opportunity swing open for you and turn your aspirations into gold.',
    icon: '✨',
    sparkleType: 'sparkle-cyan'
  },
  {
    id: 5,
    boxColor: 'from-fuchsia-500 to-pink-600',
    ribbonColor: 'bg-violet-200',
    title: 'The Gift of Unbreakable Friendship 💖',
    wish: 'Surround yourself with people who treasure your innocence and celebrate your sweet, funny, dramatic self just like Mannu does.',
    icon: '💖',
    sparkleType: 'sparkle-pink'
  },
  {
    id: 6,
    boxColor: 'from-emerald-400 to-teal-600',
    ribbonColor: 'bg-amber-200',
    title: 'The Gift of Serenity & Calm 🕊️',
    wish: 'In moments when anger or chaos tries to disturb your cute mind, may peace find you instantly and wrap you in warmth.',
    icon: '🕊️',
    sparkleType: 'sparkle-emerald'
  },
  {
    id: 7,
    boxColor: 'from-rose-400 to-pink-500',
    ribbonColor: 'bg-white',
    title: 'The Gift of Forever Protection 🧿',
    wish: 'Buri nazar se hamesha mehfooz raho! May divine blessings protect your innocence, your sweet smile, and your golden spirit.',
    icon: '🧿',
    sparkleType: 'sparkle-blue'
  },
  {
    id: 8,
    boxColor: 'from-violet-500 to-purple-700',
    ribbonColor: 'bg-pink-300',
    title: 'The Gift of Magic & Wonder 🪄',
    wish: 'Never lose that cute spark in your eyes that turns simple everyday moments into unforgettable fairy tales.',
    icon: '🪄',
    sparkleType: 'sparkle-purple'
  },
  {
    id: 9,
    boxColor: 'from-yellow-400 to-amber-500',
    ribbonColor: 'bg-rose-400',
    title: 'The Gift of Mannu’s Unconditional Support 🐻',
    wish: 'Remember that no matter how big you grow, Mannu is always just one call away, ready to listen, advise, or fight the world for you.',
    icon: '🐻',
    sparkleType: 'sparkle-amber'
  },
  {
    id: 10,
    boxColor: 'from-pink-400 to-rose-500',
    ribbonColor: 'bg-yellow-300',
    title: 'The Gift of Sweet 16 Glory 🪆',
    wish: 'Happy Sweet 16, my doll! This year marks a gorgeous new chapter filled with discovery, elegance, happiness, and love.',
    icon: '🪆',
    sparkleType: 'sparkle-gold'
  }
];

// Level 4: Butterfly Challenge Compliments
export const BUTTERFLY_COMPLIMENTS: ButterflyItem[] = [
  { id: 1, color: '#F472B6', accent: '#FBCFE8', size: 48, speed: 1.2, compliment: "Your smile can brighten the darkest storm! 🌸" },
  { id: 2, color: '#A78BFA', accent: '#DDD6FE', size: 52, speed: 1.4, compliment: "You're genuinely one of a kind, my doll! ✨" },
  { id: 3, color: '#38BDF8', accent: '#BAE6FD', size: 44, speed: 1.0, compliment: "Even your cute gussa makes everyone adore you! 😂💖" },
  { id: 4, color: '#FBBF24', accent: '#FEF3C7', size: 50, speed: 1.3, compliment: "You possess a heart of pure gold and kindness! 🌟" },
  { id: 5, color: '#34D399', accent: '#A7F3D0', size: 46, speed: 1.1, compliment: "Never stop being your wonderfully crazy, naughty self! 🦋" },
  { id: 6, color: '#FB7185', accent: '#FECDD3', size: 54, speed: 1.5, compliment: "16 looks absolutely radiant on you, Princess! 👑" },
  { id: 7, color: '#E879F9', accent: '#F5D0FE', size: 48, speed: 1.2, compliment: "Mannu is forever proud to have you in his life! 🐻💕" },
  { id: 8, color: '#818CF8', accent: '#C7D2FE', size: 46, speed: 1.4, compliment: "Your innocence is your greatest superpower! 🌈" }
];

// Level 5: Balloon Compliments
export const BALLOON_COMPLIMENTS: string[] = [
  "You're amazing 🌸",
  "Keep smiling ✨",
  "Stay happy 💖",
  "Keep shining 🌟",
  "Never stop dreaming 🌈",
  "Believe in yourself ⭐",
  "Your future is bright ✨",
  "Keep growing 💙",
  "You're one of a kind 🌼",
  "Enjoy every moment 🎉",
  "The sweetest doll in the universe 🪆",
  "Mannu's forever secret-keeper 🐻",
  "Sweet Sixteen and fabulous! 🎂",
  "Always stay this cute & crazy 🥹❤️",
  "May all your wishes turn into reality! 🪄"
];

// Level 6: 5 Star Constellation
export const STAR_WISHES: StarItem[] = [
  {
    id: 1,
    title: 'Star of Innocence & Purity 🌟',
    message: 'Your sweet, transparent heart is your greatest beauty. Never let the world change the genuine kindness inside you.',
    constellationPoint: { x: 20, y: 30 },
    color: '#FDE047'
  },
  {
    id: 2,
    title: 'Star of Secret Bonds 💖',
    message: 'Hamari apni alag hi duniya hai… jahan har secret safe hai, aur har baat bina jhijhak ke share hoti hai.',
    constellationPoint: { x: 35, y: 70 },
    color: '#F472B6'
  },
  {
    id: 3,
    title: 'Star of Laughter & Nautanki 😂',
    message: 'Teri cute-cute nautanki aur tera pyaara sa gussa hum sabke chehre par muskaan laata hai. Stay crazy always!',
    constellationPoint: { x: 50, y: 25 },
    color: '#A78BFA'
  },
  {
    id: 4,
    title: 'Star of Endless Dreams 🌌',
    message: 'At 16, the universe is your canvas. Paint it with your wildest dreams, highest achievements, and brightest colors.',
    constellationPoint: { x: 65, y: 65 },
    color: '#38BDF8'
  },
  {
    id: 5,
    title: 'Star of Eternal Blessing 🧿',
    message: 'Mannu’s warmest prayers will forever follow you, shielding you from harm and lighting every path you tread.',
    constellationPoint: { x: 80, y: 35 },
    color: '#34D399'
  }
];

// Level 7: 30 Wishes in Treasure Chest
export const TREASURE_WISHES: WishCard[] = [
  { id: 1, category: 'Love & Bond', title: 'Hamari Apni Duniya ❤️', message: 'That rare space where we share everything without second-guessing. A bond built on pure trust and endless care.', icon: '❤️' },
  { id: 2, category: 'Love & Bond', title: 'Beyond Age Differences ⏳', message: 'A 10-year gap that disappeared the moment we started talking. Ageless friendship and understanding.', icon: '⏳' },
  { id: 3, category: 'Love & Bond', title: 'Mannu’s Little Doll 🪆', message: 'No matter how tall you stand or how wise you grow, you will always be my precious little doll.', icon: '🪆' },
  { id: 4, category: 'Love & Bond', title: 'Precious Memories 🥹', message: 'Those silly conversations, shared laughs, and that sweet memory that will forever bring a smile to my face.', icon: '💫' },
  { id: 5, category: 'Love & Bond', title: 'An Unshakable Shelter 🛡️', message: 'Whenever life feels overwhelming, remember you always have a listening ear and a safe haven in Mannu.', icon: '🛡️' },

  { id: 6, category: 'Sweet 16', title: 'Welcome to Sweet 16! 🎂', message: 'Sixteen years of spreading warmth, sweetness, and magic everywhere you step. Celebrate your milestone!', icon: '🎂' },
  { id: 7, category: 'Sweet 16', title: 'Crowned in Grace 👑', message: 'May this year bloom with self-discovery, new adventures, and confidence that makes you unstoppable.', icon: '👑' },
  { id: 8, category: 'Sweet 16', title: 'Sweet Sixteen Magic ✨', message: 'May this special year open thrilling doors, unforgettable journeys, and lifelong wonderful memories.', icon: '✨' },
  { id: 9, category: 'Sweet 16', title: 'Blossoming Beauty 🌸', message: 'Watching you grow into such a graceful, thoughtful young lady is an absolute joy.', icon: '🌸' },
  { id: 10, category: 'Sweet 16', title: 'Milestone Radiance 🌟', message: 'May 16 be your most vibrant chapter yet, sprinkled with stardust and filled with triumphant moments.', icon: '🌟' },

  { id: 11, category: 'Dreams', title: 'Sky Has No Limit 🚀', message: 'Aim for the highest stars; your determination and talent will carry you to the summit.', icon: '🚀' },
  { id: 12, category: 'Dreams', title: 'Unfolding Wings 🦋', message: 'Fly fearlessly towards every goal. The world is waiting for your unique brilliance to shine.', icon: '🦋' },
  { id: 13, category: 'Dreams', title: 'Golden Opportunities 🗝️', message: 'May the right doors open effortlessly and guide you to greatness and fulfillment.', icon: '🗝️' },
  { id: 14, category: 'Dreams', title: 'Courage Over Fear 🦁', message: 'Trust your intuition. Whenever you face a crossroads, know you are stronger than any doubt.', icon: '🦁' },
  { id: 15, category: 'Dreams', title: 'Creating Wonders 🎨', message: 'May your creativity flourish, painting your life with vibrant colors of success.', icon: '🎨' },

  { id: 16, category: 'Joy & Smiles', title: 'That Signature Smile 😄', message: 'May the sparkle on your face never dim. Your smile has the power to heal anyone around you.', icon: '😄' },
  { id: 17, category: 'Joy & Smiles', title: 'Cute Nautanki Forever 😂', message: 'Never give up your cute tantrums and dramatic stories! They make life ten times more fun.', icon: '🎭' },
  { id: 18, category: 'Joy & Smiles', title: 'Uncontrollable Giggles 🫧', message: 'May your year be packed with inside jokes, midnight snacks, and laughing until your stomach aches.', icon: '🫧' },
  { id: 19, category: 'Joy & Smiles', title: 'Purest Heart 💖', message: 'Your childlike wonder combined with your growing maturity makes you remarkably enchanting.', icon: '💖' },
  { id: 20, category: 'Joy & Smiles', title: 'Lightness of Soul 🎈', message: 'Leave all worries to the wind; may every morning greet you with lightness, peace, and excitement.', icon: '🎈' },

  { id: 21, category: 'Radiance', title: 'Inner & Outer Glow 💎', message: 'You are naturally stunning, both in your graceful appearance and your empathetic soul.', icon: '💎' },
  { id: 22, category: 'Radiance', title: 'A Rare Gem 🔮', message: 'Some people become part of life, but very few become part of the heart. You are that rare gem.', icon: '🔮' },
  { id: 23, category: 'Radiance', title: 'Gentle Strength 🌿', message: 'May you navigate challenges with the gentleness of a flower and the resilience of a rooted tree.', icon: '🌿' },
  { id: 24, category: 'Radiance', title: 'Unapologetically You 🦚', message: 'Celebrate every quirk, every habit, and every dream. You are masterfully designed just as you are.', icon: '🦚' },
  { id: 25, category: 'Radiance', title: 'Warmth to Others 🕯️', message: 'Your kindness is a beacon. Keep sharing warmth with the world without losing yourself in it.', icon: '🕯️' },

  { id: 26, category: 'Mannu\'s Blessings', title: 'Always in My Prayers 🧿', message: 'May divine protection surround you, warding off every evil eye and bringing only blessings.', icon: '🧿' },
  { id: 27, category: 'Mannu\'s Blessings', title: 'Always in Your Corner 🐻', message: 'Whatever life throws at you, know that Mannu is always standing beside you, cheering you on.', icon: '🐻' },
  { id: 28, category: 'Mannu\'s Blessings', title: 'Eternal Connection ♾️', message: 'No distance, time, or circumstance can ever weaken the trust and comfort we share.', icon: '♾️' },
  { id: 29, category: 'Mannu\'s Blessings', title: 'Forever My Princess 👸', message: 'Wishing you the happiest, sweetest, most magical 16th birthday, my forever little doll.', icon: '👸' },
  { id: 30, category: 'Mannu\'s Blessings', title: 'A Lifetime of Love ❤️', message: 'Deepest respect, boundless care, and unconditional affection today and through all the years to come.', icon: '❤️' }
];

// Level 9: The EXACT Secret Letter provided by user
export const SECRET_LETTER = {
  salutation: "Happy 16th Birthday, My Little Doll! 🎂🧿❤️",
  paragraphs: [
    "Pata nahi kaise express karun ki tu mere liye kitni special hai. Tu meri life ke un kuch logon mein se hai jinke saath main bina soche-samjhe kuch bhi share kar sakta hoon. Tere secrets mere paas aur mere secrets tere paas… hamari apni ek alag hi duniya hai, jahan har baat share kar sakte hain, bina kisi hesitation ke. ❤️",
    "Tu jitni cute aur adorable hai na, utni hi gusse wali aur chidchidi bhi hai. 😂 Kabhi-kabhi toh tera gussa handle karna bhi ek alag task hota hai, but honestly, teri ye saari cute-cute nautanki bhi mujhe bahut pasand hai.",
    "Age mein humare beech 10 saal ka difference hai, lekin kabhi aisa feel nahi hua. Tere saath waqt bitana, hasi-mazaak karna, random baatein karna aur ek-doosre ko samajhna… ye sab mere liye bahut precious hai. Kabhi-kabhi lagta hai ki agar hum cousins na hote, toh shayad hum ek-doosre ke 😁  , But jo rishta humein mila hai, woh bhi mere liye kisi blessing se kam nahi hai. ❤️",
    "Bas meri ek wish hai ki chahe time kitna bhi change ho, life mein kitne bhi ups and downs aayein, hamara ye bond kabhi change na ho. Hum hamesha aise hi ek-doosre se har baat share karein, ek-doosre ko samjhein, support karein aur hamara pyaar aur trust har saal aur badhta rahe.",
    "I hope tu life mein bahut khush rahe, apne saare dreams achieve kare aur tere face par ye pyari si smile hamesha bani rahe.",
    "Stay the same cute, crazy, naughty and adorable little doll that you are. 🥹❤️",
    "And remember, no matter how grown up you become, you'll always be my little doll.",
    "Happy Sweet 16, Princess! 👑❤️🧿",
    "Love you loads! ❤️",
    "And you know what? Some people become a part of your life, but a very few become a part of your heart. You're one of those people for me. There are little moments, silly conversation and one such memory of ours will always remain close to mine. That one little kiss, that special moment and the beautiful feeling attached to it… I'll probably remember it for my entire lifetime. Maybe it was just a small moment, but it became one of those memories that will always bring a smile to my face. Some memories are simply too precious to ever forget. ❤️🥹",
    "You know, I genuinely hope you realise how much your presence means to me. You're not just someone I share family moments with; you're someone I can laugh with, talk to about anything, share my secrets with and trust without hesitation. I hope we never lose this comfort and connection."
  ],
  signOff: "With all my heart & blessings,",
  sender: "Mannu 🐻"
};
