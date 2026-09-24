export interface SurplusListing {
  id: string;
  title: string;
  donorName: string;
  donorType: string;
  category: 'hot-meals' | 'bakery' | 'produce' | 'dry-goods' | 'dairy' | 'banquet';
  description: string;
  portions: number;
  weightKg: number;
  expiryMinutes: number;
  expiryFormatted: string;
  distanceKm: number;
  holdingTemp: string;
  tags: string[];
  dietary: {
    vegetarian?: boolean;
    vegan?: boolean;
    halal?: boolean;
    glutenFree?: boolean;
    nutFree?: boolean;
  };
  pickupSlot: string;
  address: string;
  status: 'available' | 'claimed' | 'in-transit' | 'delivered';
  claimedBy?: string;
  imageUrl?: string;
  lat: number;
  lng: number;
  co2eDiverted: number;
}

export interface VerificationItem {
  id: string;
  donorName: string;
  description: string;
  quantity: string;
  weightKg: number;
  expiryWindow: string;
  qaScore: number;
  holdingTemp: string;
  prepTimestamp: string;
  certifiedSafe: boolean;
  status: 'pending' | 'approved' | 'declined';
}

export interface ShelterDemand {
  id: string;
  shelterName: string;
  requestedPortions: number;
  urgency: 'critical' | 'medium' | 'routine';
  dietaryPreference: string;
  contactPerson: string;
  distanceKm: number;
}

export interface ActiveDelivery {
  id: string;
  shelterName: string;
  batchId: string;
  courierName: string;
  courierVehicle: string;
  portions: number;
  etaMinutes: number;
  status: 'in-transit' | 'delivered' | 'assigned';
  temperature: string;
}

export const INITIAL_SURPLUS_LISTINGS: SurplusListing[] = [
  {
    id: 'ANN-2026-884920',
    title: 'Warm Artisan Lunch Boxes & Fresh Grain Bowls',
    donorName: 'Grand Hyatt Banquet • Hall B',
    donorType: 'Hotel & Banquet',
    category: 'hot-meals',
    description: '120 Warm Artisan Lunch Boxes, Fresh Herb Quinoa Bowls & Steamed Vegetables. Packed in food-grade thermal containers.',
    portions: 120,
    weightKg: 35,
    expiryMinutes: 105,
    expiryFormatted: 'Exp in 1h 45m',
    distanceKm: 1.2,
    holdingTemp: '68°C Hot Hold',
    tags: ['100% Pure Veg', 'Halal', 'Eco-Packaging', 'Thermal Insulated'],
    dietary: { vegetarian: true, halal: true, glutenFree: true },
    pickupSlot: '4:30 PM - 5:15 PM',
    address: 'Grand Hyatt Convention Gate 3, Dock B',
    status: 'available',
    lat: 37.7749,
    lng: -122.4194,
    co2eDiverted: 105
  },
  {
    id: 'ANN-2026-884922',
    title: 'Fresh Dal Makhani, Paneer Tikka & Basmati Rice Trays',
    donorName: 'Marriott Convention Center',
    donorType: 'Conference Caterer',
    category: 'banquet',
    description: '85 Fresh Dal Makhani, Paneer Tikka & Basmati Rice Trays. Kept in verified thermal insulated cambros at 72°C.',
    portions: 85,
    weightKg: 28,
    expiryMinutes: 130,
    expiryFormatted: 'Exp: 2h 10m',
    distanceKm: 1.4,
    holdingTemp: '72°C Hot Hold',
    tags: ['Pure Veg', 'FSSAI Certified', 'Tamper Evident'],
    dietary: { vegetarian: true, nutFree: true },
    pickupSlot: '5:00 PM',
    address: 'Marriott Main Ballroom Kitchen Loading Bay',
    status: 'available',
    lat: 37.7812,
    lng: -122.4065,
    co2eDiverted: 84
  },
  {
    id: 'ANN-2026-884924',
    title: 'Assorted Whole Grain Sourdough Loaves & Croissants',
    donorName: 'Artisan Sourdough Bakery',
    donorType: 'Artisan Bakery',
    category: 'bakery',
    description: '40 Assorted Whole Grain Sourdough Loaves and Morning Croissants. Untouched surplus inventory from today’s morning bake.',
    portions: 40,
    weightKg: 18,
    expiryMinutes: 55,
    expiryFormatted: 'Urgent: 55m left',
    distanceKm: 2.8,
    holdingTemp: 'Ambient Dry (21°C)',
    tags: ['Bakery', 'Dry Goods', 'Contains Gluten'],
    dietary: { vegetarian: true },
    pickupSlot: 'Immediate (until 5:30 PM)',
    address: '742 Bakery Row, Central District',
    status: 'available',
    lat: 37.7658,
    lng: -122.4215,
    co2eDiverted: 54
  },
  {
    id: 'ANN-2026-884926',
    title: 'Steamed Vegetables, Grilled Chicken Bowls & Lentil Stew',
    donorName: 'Google Campus Cafeteria Hub',
    donorType: 'Corporate Cafeteria',
    category: 'hot-meals',
    description: '150 Portions of Steamed Vegetables, Grilled Lemon Herb Chicken Bowls & Lentil Stew in heat-sealed multi-portion trays.',
    portions: 150,
    weightKg: 45,
    expiryMinutes: 210,
    expiryFormatted: 'Exp: 3h 30m',
    distanceKm: 3.1,
    holdingTemp: '69°C Hot Hold',
    tags: ['High Protein', 'Halal', 'Audited Temp'],
    dietary: { halal: true, glutenFree: true },
    pickupSlot: '5:45 PM',
    address: 'Building 43 Kitchen Service Bay',
    status: 'available',
    lat: 37.7901,
    lng: -122.3982,
    co2eDiverted: 135
  },
  {
    id: 'ANN-2026-884928',
    title: 'Organic Honeycrisp Apples & Salad Greens Crates',
    donorName: 'Whole Foods Market Logistics',
    donorType: 'Supermarket',
    category: 'produce',
    description: '40 kg Crisp Organic Apples, Baby Spinach & Cucumbers in ventilated reusable crates.',
    portions: 90,
    weightKg: 40,
    expiryMinutes: 1440,
    expiryFormatted: 'Safe for 48h',
    distanceKm: 3.8,
    holdingTemp: 'Cold Stored (4°C)',
    tags: ['Raw Farm Direct', 'Cold Stored (4°C)', 'Vegan'],
    dietary: { vegetarian: true, vegan: true, glutenFree: true, nutFree: true },
    pickupSlot: 'Anytime before 8:00 PM',
    address: 'Whole Foods Regional Hub Dock 4',
    status: 'available',
    lat: 37.7554,
    lng: -122.4180,
    co2eDiverted: 120
  },
  {
    id: 'ANN-2026-884930',
    title: 'Assorted Gourmet Sandwiches & Wraps',
    donorName: 'Pret A Manger Financial District',
    donorType: 'Quick Service Retail',
    category: 'hot-meals',
    description: '60 Chilled Sandwiches and wraps, individually labeled with production timestamps and allergens.',
    portions: 60,
    weightKg: 20,
    expiryMinutes: 75,
    expiryFormatted: 'Exp in 1h 15m',
    distanceKm: 2.1,
    holdingTemp: 'Chilled (3.5°C)',
    tags: ['Volunteer Assigned', 'Eco Packaging'],
    dietary: { vegetarian: true },
    pickupSlot: '6:00 PM',
    address: '100 Bush St, Service Entrance',
    status: 'in-transit',
    claimedBy: 'Mission Youth Shelter',
    lat: 37.7915,
    lng: -122.4010,
    co2eDiverted: 60
  }
];

export const INITIAL_VERIFICATION_QUEUE: VerificationItem[] = [
  {
    id: 'ANN-2026-884920',
    donorName: 'Grand Hyatt Regency',
    description: 'Braised Lentils & Basmati Pilaf',
    quantity: '120 meals',
    weightKg: 35,
    expiryWindow: '2h 45m left',
    qaScore: 98,
    holdingTemp: '68°C Hot Hold',
    prepTimestamp: '18:45 Today',
    certifiedSafe: true,
    status: 'pending'
  },
  {
    id: 'ANN-2026-884924',
    donorName: 'BakeHouse Artisans',
    description: 'Multigrain Loaves & Brioche',
    quantity: '45 pkgs',
    weightKg: 18,
    expiryWindow: '5h 20m left',
    qaScore: 94,
    holdingTemp: '21°C Ambient Dry',
    prepTimestamp: '16:00 Today',
    certifiedSafe: true,
    status: 'pending'
  },
  {
    id: 'ANN-2026-884931',
    donorName: 'Urban Fresh Co-op',
    description: 'Washed Leafy Greens & Carrots',
    quantity: '70 kg',
    weightKg: 70,
    expiryWindow: '1h 15m left',
    qaScore: 89,
    holdingTemp: '4.2°C Cold Stored',
    prepTimestamp: '14:30 Today',
    certifiedSafe: true,
    status: 'pending'
  }
];

export const INITIAL_SHELTER_DEMANDS: ShelterDemand[] = [
  {
    id: 'DEM-101',
    shelterName: 'Hope Harbor Community Shelter',
    requestedPortions: 80,
    urgency: 'critical',
    dietaryPreference: 'Vegetarian / Halal Preferred',
    contactPerson: 'Sister Maya',
    distanceKm: 2.1
  },
  {
    id: 'DEM-102',
    shelterName: 'St. Joseph Shelter & Community Harvest',
    requestedPortions: 120,
    urgency: 'critical',
    dietaryPreference: 'Cooked Hot Meals',
    contactPerson: 'Mary Jenkins',
    distanceKm: 3.4
  },
  {
    id: 'DEM-103',
    shelterName: 'Downtown Grace Mission',
    requestedPortions: 50,
    urgency: 'medium',
    dietaryPreference: 'Bakery & Fresh Produce',
    contactPerson: 'Rev. Thomas',
    distanceKm: 1.8
  }
];

export const INITIAL_ACTIVE_DELIVERIES: ActiveDelivery[] = [
  {
    id: 'DEL-492',
    shelterName: 'Hope Harbor Shelter',
    batchId: 'ANN-2026-884920',
    courierName: 'Maya R.',
    courierVehicle: 'Honda e-Scooter #V-902',
    portions: 80,
    etaMinutes: 14,
    status: 'in-transit',
    temperature: '64.2°C (Holding Sensor OK)'
  },
  {
    id: 'DEL-491',
    shelterName: 'Downtown Grace Mission',
    batchId: 'ANN-2026-884890',
    courierName: 'Arjun S.',
    courierVehicle: 'Metro Cargo Van #M-12',
    portions: 50,
    etaMinutes: 0,
    status: 'delivered',
    temperature: '3.8°C (Cold Stored Verified)'
  }
];

export const HOTLINK_IMAGES = {
  logo: 'https://lh3.googleusercontent.com/aida/AEtjO1WHAZNs-C9xIQ50kJo4uUHTe1I62CnDCtbppCBt66OCtTG9EZ9wZG2JSkupJFtfats93KqyxrAEbIXSyZHraAsdh_a4S2joHPnPIZ86AOCSWqgWPuQTjX-Q1YzmS0Me8pfu-Qm66OOBULveOu49u6mBEEfLevGaNLl9hypIHzn_9J-O_1xsUGudVOOUxw1M2zDFO7imIDmoobBzpLtNbGQtV7EzD6b8ECanc076P6ML4-jn-ZaJ3oysQ2zW',
  profileCoordinator: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCOGWqVXcTS_9bIZfg11a2ErIdlZ8g9zW-wDN92pyq6QA-be8W0_m0qy-zjKwGF0xYXgiHZhMTYDUqhhOd-gL2bNHPMwQnRQPdfvCL3dM01A1DDP4BbNSRUDNgkAMP7lNTgm_5eCD8DquU1D01ZZdlTyb06mxDDN3NR1HdqEoxv5ZoEk8fatlS5NcOfTzAhUN14s8mqm4_gnxwBx_tDicDmP3KRUd_B8Bpa3JR80rC67CdKWa5w8SYTw',
  mapBackground: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCG8bJcuapulXp27Gl4hvnccBVGtpVccUoSSAU07y0jwtK6R3uzEhxiDZbBt7o7MujP9QpibbURVingm9PpvOua5hp7i-mb9RycXmwqY_ar63wQl4C18P4zQsxsDWsMKW1PlWfaNCK1OqdL5Zq85xEaJmQO-6PvEkxbRTOMUArXWD09Fik7xbN3FgtpEz4WI0kKEAhg37yiBit_ykohenpY76buXgqJFMNMKnHNU_pL7ErD6u_lCs5Aww',
  localFoodDistribution: '/src/assets/images/food_shelter_distribution_1790270948827.jpg',
  localKitchenPacking: '/src/assets/images/kitchen_meal_packing_1790270960472.jpg',
  localCoordinatorPortrait: '/src/assets/images/coordinator_portrait_1790270971795.jpg'
};
