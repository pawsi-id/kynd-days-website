import { Service, AdditionalService, Branch, Testimonial, NavItem } from '@/types';

export const services: Service[] = [
  {
    id: 'signature-massage',
    name: 'Kynd Days Signature Massage',
    nameId: 'Pijat Signature Kynd Days',
    description: 'Our signature full-body massage combining traditional techniques with modern relaxation methods',
    descriptionId: 'Pijat seluruh tubuh khas kami yang menggabungkan teknik tradisional dengan metode relaksasi modern',
    durations: [
      { minutes: 60, price: 145, happyHourPrice: 123 },
      { minutes: 90, price: 190, happyHourPrice: 162 },
      { minutes: 120, price: 225, happyHourPrice: 191 },
    ],
    category: 'massage',
    isPopular: true,
  },
  {
    id: 'thai-massage',
    name: 'Thai Massage',
    nameId: 'Pijat Thai',
    description: 'Traditional Thai massage using stretching and pressure point techniques',
    descriptionId: 'Pijat Thai tradisional menggunakan teknik peregangan dan titik tekanan',
    durations: [
      { minutes: 60, price: 175, happyHourPrice: 149 },
      { minutes: 90, price: 235, happyHourPrice: 200 },
      { minutes: 120, price: 290, happyHourPrice: 247 },
    ],
    category: 'massage',
  },
  {
    id: 'aromatherapy-massage',
    name: 'Kynd Days Aromatherapy Massage',
    nameId: 'Pijat Aromaterapi Kynd Days',
    description: 'Relaxing massage with premium essential oils for ultimate stress relief',
    descriptionId: 'Pijat relaksasi dengan minyak esensial premium untuk menghilangkan stres',
    durations: [
      { minutes: 60, price: 175, happyHourPrice: 149 },
      { minutes: 90, price: 220, happyHourPrice: 187 },
      { minutes: 120, price: 255, happyHourPrice: 217 },
    ],
    category: 'massage',
    isPopular: true,
  },
  {
    id: 'reflexology',
    name: 'Kynd Days Reflexology',
    nameId: 'Refleksi Kynd Days',
    description: 'Foot reflexology targeting pressure points to improve overall wellness',
    descriptionId: 'Refleksi kaki yang menargetkan titik-titik tekanan untuk meningkatkan kesehatan',
    durations: [
      { minutes: 60, price: 85, happyHourPrice: 72 },
      { minutes: 90, price: 120, happyHourPrice: 102 },
      { minutes: 120, price: 155, happyHourPrice: 132 },
    ],
    category: 'reflexology',
  },
  {
    id: 'hot-stone-massage',
    name: 'Hot Stone Massage',
    nameId: 'Pijat Batu Panas',
    description: 'Deep relaxation with heated volcanic stones placed on key body points',
    descriptionId: 'Relaksasi mendalam dengan batu vulkanik panas yang ditempatkan pada titik-titik tubuh',
    durations: [
      { minutes: 90, price: 225, happyHourPrice: 191 },
      { minutes: 120, price: 275, happyHourPrice: 234 },
    ],
    category: 'massage',
  },
  {
    id: 'dry-massage',
    name: 'Kynd Days Dry Massage',
    nameId: 'Pijat Kering Kynd Days',
    description: 'Oil-free massage perfect for those who prefer a non-oily experience',
    descriptionId: 'Pijat tanpa minyak, sempurna bagi yang tidak suka minyak',
    durations: [
      { minutes: 60, price: 185, happyHourPrice: 157 },
      { minutes: 90, price: 235, happyHourPrice: 200 },
    ],
    category: 'massage',
  },
];

export const additionalServices: AdditionalService[] = [
  {
    id: 'body-massage-30',
    name: 'Body Massage',
    nameId: 'Pijat Badan',
    duration: 30,
    price: 60,
    happyHourPrice: 51,
  },
  {
    id: 'face-massage-30',
    name: 'Face Massage',
    nameId: 'Pijat Wajah',
    duration: 30,
    price: 60,
    happyHourPrice: 51,
  },
  {
    id: 'hot-stone-30',
    name: 'Hot Stone',
    nameId: 'Batu Panas',
    duration: 30,
    price: 95,
    happyHourPrice: 81,
  },
  {
    id: 'kerokan',
    name: 'Kerokan',
    nameId: 'Kerokan',
    duration: 30,
    price: 60,
    happyHourPrice: 51,
  },
];

export const vipCoupleRoom = {
  name: 'VIP Couple Room',
  nameId: 'Ruang VIP Couple',
  price: 50,
  description: 'Upgrade to our private couple room for a more intimate experience',
  descriptionId: 'Upgrade ke ruang couple privat kami untuk pengalaman yang lebih intim',
};

export const branches: Branch[] = [
  {
    id: 'gading-serpong',
    name: 'Kynd Days Gading Serpong',
    address: 'Ruko Aniva Grande Paramount Land, Blok GA No.7, Cijantra, Pagedangan, Tangerang Regency, Banten 15334',
    phone: '0896-0200-9669',
    whatsapp: '6289602009669',
  },
  {
    id: 'alam-sutera',
    name: 'Kynd Days Alam Sutera',
    address: 'Alam Sutera, Ruko Woodlake.7, Panunggangan Tim., Kec. Pinang, Kota Tangerang, Banten 15143',
    phone: '0877-2276-9027',
    whatsapp: '6287722769027',
  },
  {
    id: 'bsd',
    name: 'Kynd Days BSD',
    address: 'Ruko Tol Boulevard, Rw. Buntu, Kec. Serpong, Tangerang, Banten 15318',
    phone: '0819-5723-1717',
    whatsapp: '6281957231717',
  },
];

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah M.',
    rating: 5,
    comment: 'Pelayanan luar biasa! Terapisnya sangat profesional dan suasananya sangat nyaman.',
    service: 'Signature Massage',
    date: '2024-12-15',
  },
  {
    id: '2',
    name: 'Budi S.',
    rating: 5,
    comment: 'Reflexology terbaik yang pernah saya coba. Kaki saya terasa sangat ringan setelahnya.',
    service: 'Reflexology',
    date: '2024-12-10',
  },
  {
    id: '3',
    name: 'Anita R.',
    rating: 5,
    comment: 'Aromatherapy massage-nya sangat relaxing. Wangi essential oil-nya sangat menenangkan.',
    service: 'Aromatherapy Massage',
    date: '2024-12-05',
  },
  {
    id: '4',
    name: 'David W.',
    rating: 5,
    comment: 'Hot stone massage-nya amazing! Perfect untuk menghilangkan pegal setelah bekerja.',
    service: 'Hot Stone Massage',
    date: '2024-11-28',
  },
];

export const navItems: NavItem[] = [
  { label: 'Beranda', href: '/' },
  { label: 'Layanan', href: '/layanan' },
  { label: 'Harga', href: '/harga' },
  { label: 'Tentang Kami', href: '/tentang-kami' },
  { label: 'Galeri', href: '/galeri' },
];

export const businessHours = {
  open: '10:00',
  close: '22:00',
  days: 'Setiap Hari',
};

export const happyHour = {
  discount: 15,
  days: 'Senin - Kamis',
  startTime: '10:00',
  endTime: '14:00',
};
