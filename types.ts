export type MenuSection = 'Regular' | 'Catering';

export enum Category {
  APPETIZERS = 'Appetizers',
  SALADS = 'Salads',
  SOUPS = 'Soups',
  PASTA = 'Pasta',
  BAKED_PASTA = 'Baked Pasta',
  VEGETABLES = 'Sautéed Vegetables',
  ENTREES = 'Entrees',
  PARMIGIANA = 'Parmigiana Platters',
  WRAPS = 'Wraps',
  HEROES = 'Heroes',
  PIZZA = 'Pizza',
  SPECIALTY_PIZZA = 'Specialty Pies',
  CALZONES = 'Calzones & Rolls',
  SIDES = 'Side Orders',
  DESSERTS = 'Desserts',
  BEVERAGES = 'Beverages'
}

export interface PriceVariant {
  label: string;
  price: number;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number; // Base price (displayed if no variants selected, or "starting at")
  variants?: PriceVariant[];
  category: Category;
  section: MenuSection;
  image: string;
  popular?: boolean;
  spicy?: boolean;
  vegetarian?: boolean;
}

export interface CartItem extends MenuItem {
  cartId: string; // Unique identifier for the cart line (itemId + variant)
  quantity: number;
  selectedVariant?: PriceVariant;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export type EmployeeRole = 'Server' | 'Chef' | 'Manager' | 'Driver';

export interface Shift {
  id: string;
  day: string;
  start: string;
  end: string;
}

export interface Employee {
  id: string;
  name: string;
  role: EmployeeRole;
  pin: string; // Simple auth
  isClockedIn: boolean;
  lastClockIn?: Date;
  schedule: Shift[];
}

export type OrderType = 'pickup' | 'delivery';
export type PaymentMethod = 'card' | 'cash';

export interface CustomerDetails {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address?: string;
  city?: string;
  zip?: string;
  instructions?: string;
}

export interface JobApplication {
  fullName: string;
  phone: string;
  email: string;
  position: string;
  experience: string;
  availability: string;
}