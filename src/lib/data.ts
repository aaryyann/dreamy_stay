
export interface PropertyType {
  id: string;
  title: string;
  location: string;
  price: number;
  rating: number;
  image: string;
  superhost: boolean;
  beds: number;
  baths: number;
  description: string;
  amenities: string[];
  gallery: string[];
  host: {
    name: string;
    image: string;
    joined: string;
    rating: number;
  };
}

export interface FilterType {
  id: string;
  name: string;
  icon: string;
}

export const propertyTypes: FilterType[] = [
  { id: 'apartment', name: 'Apartments', icon: '🏢' },
  { id: 'house', name: 'Houses', icon: '🏠' },
  { id: 'cabin', name: 'Cabins', icon: '🏡' },
  { id: 'beachfront', name: 'Beachfront', icon: '🏖️' },
  { id: 'mansion', name: 'Mansions', icon: '🏰' },
  { id: 'countryside', name: 'Countryside', icon: '🌄' },
  { id: 'lakefront', name: 'Lakefront', icon: '🌊' },
  { id: 'skiing', name: 'Skiing', icon: '⛷️' },
  { id: 'tropical', name: 'Tropical', icon: '🏝️' },
  { id: 'historic', name: 'Historic', icon: '🏛️' },
];

// Mock sample property data
export const properties: PropertyType[] = [
  {
    id: '1',
    title: 'Modern Apartment with City View',
    location: 'New York, NY',
    price: 120,
    rating: 4.92,
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    superhost: true,
    beds: 2,
    baths: 1,
    description: 'Experience the vibrant energy of New York from this stylish apartment with breathtaking city views. This carefully designed space offers modern amenities and is located near major attractions.',
    amenities: ['Wifi', 'Air conditioning', 'Kitchen', 'Washer', 'Dryer', 'TV', 'Elevator'],
    gallery: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1980&q=80',
      'https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      'https://images.unsplash.com/photo-1588854337115-1c67d9247e4d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    ],
    host: {
      name: 'Alex Johnson',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      joined: 'January 2020',
      rating: 4.98,
    },
  },
  {
    id: '2',
    title: 'Luxury Beach House Retreat',
    location: 'Miami, FL',
    price: 350,
    rating: 4.89,
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    superhost: true,
    beds: 4,
    baths: 3,
    description: 'Escape to this beachfront paradise with stunning ocean views and direct beach access. This luxurious retreat offers spacious living areas and a private outdoor space perfect for entertaining.',
    amenities: ['Beachfront', 'Pool', 'Hot tub', 'Wifi', 'Kitchen', 'Free parking', 'BBQ grill'],
    gallery: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      'https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      'https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2336&q=80',
    ],
    host: {
      name: 'Sarah Miller',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      joined: 'March 2018',
      rating: 4.95,
    },
  },
  {
    id: '3',
    title: 'Charming Cottage in the Woods',
    location: 'Asheville, NC',
    price: 175,
    rating: 4.96,
    image: 'https://images.unsplash.com/photo-1542718610-a1d656d1884c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    superhost: false,
    beds: 2,
    baths: 1,
    description: 'Nestled among towering trees, this cozy cottage offers a peaceful retreat in nature. Enjoy the crackling fireplace inside or stargaze from the private deck surrounded by forest views.',
    amenities: ['Fireplace', 'Mountain view', 'Wifi', 'Kitchen', 'Free parking', 'Patio or balcony'],
    gallery: [
      'https://images.unsplash.com/photo-1542718610-a1d656d1884c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      'https://images.unsplash.com/photo-1588854337236-6889d631faa8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    ],
    host: {
      name: 'Daniel White',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      joined: 'August 2019',
      rating: 4.91,
    },
  },
  {
    id: '4',
    title: 'Stylish Downtown Loft',
    location: 'Chicago, IL',
    price: 140,
    rating: 4.85,
    image: 'https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    superhost: false,
    beds: 1,
    baths: 1,
    description: 'This industrial-chic loft in the heart of downtown Chicago offers the perfect urban getaway. Featuring high ceilings, exposed brick, and contemporary décor, it\'s steps from restaurants and attractions.',
    amenities: ['Wifi', 'Air conditioning', 'Kitchen', 'Washer', 'Dryer', 'Gym', 'Doorman'],
    gallery: [
      'https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      'https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      'https://images.unsplash.com/photo-1616137466211-f939a420be84?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    ],
    host: {
      name: 'Jessica Brown',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      joined: 'May 2021',
      rating: 4.89,
    },
  },
  {
    id: '5',
    title: 'Mountain View Cabin Retreat',
    location: 'Denver, CO',
    price: 210,
    rating: 4.97,
    image: 'https://images.unsplash.com/photo-1517320964276-a002fa203177?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    superhost: true,
    beds: 3,
    baths: 2,
    description: 'Escape to this rustic yet modern cabin with breathtaking mountain views. Perfect for outdoor enthusiasts, with hiking trails nearby and a cozy interior for relaxing after a day of adventure.',
    amenities: ['Mountain view', 'Fireplace', 'Hot tub', 'Wifi', 'Kitchen', 'Free parking', 'Patio or balcony'],
    gallery: [
      'https://images.unsplash.com/photo-1517320964276-a002fa203177?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      'https://images.unsplash.com/photo-1588854337221-4cf9fa96059c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      'https://images.unsplash.com/photo-1575517111839-3a3843ee7c8e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    ],
    host: {
      name: 'Michael Scott',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      joined: 'October 2017',
      rating: 4.99,
    },
  },
  {
    id: '6',
    title: 'Secluded Oceanfront Villa',
    location: 'Malibu, CA',
    price: 750,
    rating: 4.94,
    image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    superhost: true,
    beds: 5,
    baths: 4,
    description: 'Indulge in luxury at this stunning oceanfront villa. Fall asleep to the sound of waves and wake up to panoramic ocean views. This exclusive property offers privacy and high-end amenities.',
    amenities: ['Beachfront', 'Pool', 'Hot tub', 'Wifi', 'Kitchen', 'Free parking', 'BBQ grill', 'Fireplace'],
    gallery: [
      'https://images.unsplash.com/photo-1540541338287-41700207dee6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      'https://images.unsplash.com/photo-1502741384106-56538427cde9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      'https://images.unsplash.com/photo-1577003811926-53b288a6e5d0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      'https://images.unsplash.com/photo-1591825729269-caeb344f6df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    ],
    host: {
      name: 'Elizabeth Chen',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      joined: 'April 2016',
      rating: 4.97,
    },
  },
  {
    id: '7',
    title: 'Historic Brownstone in Heart of Boston',
    location: 'Boston, MA',
    price: 280,
    rating: 4.88,
    image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    superhost: false,
    beds: 3,
    baths: 2,
    description: 'Experience Boston\'s rich history in this elegantly restored brownstone. Located in a charming neighborhood, this home combines historic architecture with modern comfort and is walking distance to attractions.',
    amenities: ['Wifi', 'Air conditioning', 'Kitchen', 'Washer', 'Dryer', 'TV', 'Fireplace'],
    gallery: [
      'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      'https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2309&q=80',
      'https://images.unsplash.com/photo-1592247350271-c5efb132d6e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    ],
    host: {
      name: 'Robert Parker',
      image: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      joined: 'July 2018',
      rating: 4.92,
    },
  },
  {
    id: '8',
    title: 'Desert Oasis with Private Pool',
    location: 'Scottsdale, AZ',
    price: 320,
    rating: 4.91,
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    superhost: true,
    beds: 3,
    baths: 2,
    description: 'Relax in this serene desert retreat featuring a private pool and stunning mountain views. The perfect home base for exploring the natural beauty of Arizona or simply unwinding under the sun.',
    amenities: ['Pool', 'Hot tub', 'Wifi', 'Kitchen', 'Free parking', 'BBQ grill', 'Air conditioning'],
    gallery: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      'https://images.unsplash.com/photo-1576941089067-2de3c901e126?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      'https://images.unsplash.com/photo-1604014238170-4def1e4e6fcf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    ],
    host: {
      name: 'Laura Martinez',
      image: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
      joined: 'February 2019',
      rating: 4.96,
    },
  },
];

export interface FilterOption {
  label: string;
  options: {
    value: string;
    label: string;
  }[];
}

export const filterOptions: FilterOption[] = [
  {
    label: "Price Range",
    options: [
      { value: "budget", label: "Under $100" },
      { value: "mid", label: "$100 - $300" },
      { value: "luxury", label: "$300+" },
    ],
  },
  {
    label: "Bedrooms",
    options: [
      { value: "1", label: "1 Bedroom" },
      { value: "2", label: "2 Bedrooms" },
      { value: "3", label: "3 Bedrooms" },
      { value: "4+", label: "4+ Bedrooms" },
    ],
  },
  {
    label: "Amenities",
    options: [
      { value: "pool", label: "Pool" },
      { value: "wifi", label: "Wifi" },
      { value: "kitchen", label: "Kitchen" },
      { value: "ac", label: "Air conditioning" },
      { value: "washer", label: "Washer" },
      { value: "fireplace", label: "Fireplace" },
    ],
  },
  {
    label: "Property Type",
    options: [
      { value: "house", label: "House" },
      { value: "apartment", label: "Apartment" },
      { value: "guesthouse", label: "Guesthouse" },
      { value: "hotel", label: "Hotel" },
    ],
  },
];
