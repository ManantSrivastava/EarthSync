import { WasteCategoryInfo, RewardItem } from '@/types';

export const WASTE_CATEGORIES: WasteCategoryInfo[] = [
  {
    id: 'paper',
    name: 'Paper',
    icon: 'FileText',
    pointsPerKg: 4,
    co2SavedPerKg: 1.3,
    description: 'Dry notebooks, newspapers, office stationary, exam booklets, shredded paper.',
    examples: 'Newspapers, office paper, notebooks, exam sheets',
    color: 'emerald',
  },
  {
    id: 'cardboard',
    name: 'Cardboard',
    icon: 'Package',
    pointsPerKg: 5,
    co2SavedPerKg: 1.5,
    description: 'Corrugated cartons, e-commerce delivery boxes, cereal boxes, paperboard.',
    examples: 'Shipping boxes, delivery cartons, packaging board',
    color: 'amber',
  },
  {
    id: 'plastic',
    name: 'Plastic',
    icon: 'Package',
    pointsPerKg: 6,
    co2SavedPerKg: 1.8,
    description: 'PET bottles, HDPE containers, cleaned packaging, wrappers & hard plastics.',
    examples: 'Water bottles, milk jugs, shampoo bottles, clean food containers',
    color: 'emerald',
  },
  {
    id: 'metal',
    name: 'Metal',
    icon: 'Shield',
    pointsPerKg: 10,
    co2SavedPerKg: 4.5,
    description: 'Beverage cans, scrap metal, copper wiring, tin food cans, aluminum trays.',
    examples: 'Soda cans, aerosol cans (empty), metal lids, aluminum trays',
    color: 'slate',
  },
  {
    id: 'ewaste',
    name: 'E-waste',
    icon: 'Cpu',
    pointsPerKg: 18,
    co2SavedPerKg: 9.2,
    description: 'Old mobile phones, chargers, laptops, circuit boards, batteries, electronic cords.',
    examples: 'Dead batteries, earphones, old routers, broken motherboards, cables',
    color: 'indigo',
  },
  {
    id: 'glass',
    name: 'Glass',
    icon: 'Wine',
    pointsPerKg: 3,
    co2SavedPerKg: 0.8,
    description: 'Whole or crushed beverage bottles, laboratory glassware, glass jars.',
    examples: 'Beverage bottles, cosmetic jars, sauce containers (clean)',
    color: 'teal',
  },
  {
    id: 'organic',
    name: 'Organic',
    icon: 'Leaf',
    pointsPerKg: 2,
    co2SavedPerKg: 0.6,
    description: 'Cafeteria vegetable scraps, coffee grounds, garden clippings for composting.',
    examples: 'Fruit peelings, vegetable trim, tea leaves, dry clippings',
    color: 'green',
  },
];

export const SOLAR_REGIONS: { state: string; peakSunHours: number; averageTariff: number }[] = [
  { state: 'Delhi NCR', peakSunHours: 4.8, averageTariff: 7.5 },
  { state: 'Maharashtra', peakSunHours: 5.1, averageTariff: 9.2 },
  { state: 'Karnataka', peakSunHours: 5.2, averageTariff: 8.4 },
  { state: 'Gujarat', peakSunHours: 5.5, averageTariff: 7.8 },
  { state: 'Rajasthan', peakSunHours: 5.8, averageTariff: 8.0 },
  { state: 'Tamil Nadu', peakSunHours: 5.0, averageTariff: 7.2 },
  { state: 'Telangana', peakSunHours: 5.2, averageTariff: 8.5 },
  { state: 'Uttar Pradesh', peakSunHours: 4.7, averageTariff: 7.0 },
  { state: 'West Bengal', peakSunHours: 4.5, averageTariff: 7.6 },
  { state: 'Kerala', peakSunHours: 4.6, averageTariff: 7.4 },
];

export const SOLAR_BENCHMARK_ASSUMPTIONS = {
  systemEfficiency: 0.78, // 78% Performance Ratio after thermal & inverter losses
  spacePerKwSqFt: 90,     // 90 sq ft required per 1 kWp panel capacity
  costPerKwInr: 54000,    // Industry benchmark capital cost per kW in INR
  tariffEscalationRatePercent: 3.5, // Expected annual tariff increase %
  co2FactorPerKwh: 0.82,  // kg of CO2e avoided per kWh of solar generation vs Indian grid
  treeAbsorptionKgPerYr: 21, // ~21 kg CO2 absorbed by one mature tree annually
};

export const REWARD_ITEMS: RewardItem[] = [
  {
    id: 'rw-1',
    title: '₹150 Campus Green Cafeteria Voucher',
    description: 'Valid for eco-friendly meals and organic beverages across campus cafes.',
    pointsCost: 150,
    category: 'campus_perk',
    badge: 'Popular',
    partner: 'University EcoDine',
  },
  {
    id: 'rw-2',
    title: 'Verified Tree Plantation Certificate',
    description: 'We sponsor and plant 1 native geo-tagged sapling in our urban micro-forest project.',
    pointsCost: 200,
    category: 'carbon_offset',
    badge: 'High Impact',
    partner: 'SankalpTaru Foundation Partner',
  },
  {
    id: 'rw-3',
    title: '₹1,500 Off Rooftop Solar Technical Audit',
    description: 'Comprehensive drone thermal shading analysis and structural feasibility report.',
    pointsCost: 350,
    category: 'solar_discount',
    badge: 'SolarSaathi Special',
    partner: 'SolarSaathi Certified Engineers',
  },
  {
    id: 'rw-4',
    title: 'EarthSync Recycled Stainless Steel Bottle',
    description: 'Double-walled insulated 750ml flask made from 90% post-consumer recycled steel.',
    pointsCost: 280,
    category: 'voucher',
    badge: 'Zero-Waste Gear',
    partner: 'EarthSync Merch',
  },
  {
    id: 'rw-5',
    title: 'Public Transit Metro Pass Recharge (₹200)',
    description: 'Clean commute incentive credited directly to your registered transit card.',
    pointsCost: 300,
    category: 'campus_perk',
    badge: 'Clean Mobility',
    partner: 'City SmartTransit',
  },
];
