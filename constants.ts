import { MenuItem, Category, Employee } from './types';

export const RESTAURANT_INFO = {
  name: "LaRosa's Restaurant & Pizzeria",
  slogan: "The Art of Flavor",
  address: "504 Hempstead Turnpike, West Hempstead, NY 11552", 
  phone: "516-292-3200",
  email: "info@larosaspizzeria.com",
  hours: "Mon-Thu: 11am-10pm | Fri-Sat: 11am-11pm | Sun: 12pm-10pm"
};

// Helper to create items quickly
const createItem = (
  id: string, 
  name: string, 
  price: number, 
  category: Category, 
  section: 'Regular' | 'Catering', 
  image: string,
  desc: string = "",
  variants?: {label: string, price: number}[],
  flags: {popular?: boolean, spicy?: boolean, vegetarian?: boolean} = {}
): MenuItem => ({
  id, name, price, category, section, image, description: desc, variants, ...flags
});

export const MENU_ITEMS: MenuItem[] = [
  // =========================
  // REGULAR MENU
  // =========================

  // --- APPETIZERS ---
  createItem('app1', "Baked Clams (6)", 15.50, Category.APPETIZERS, 'Regular', "https://images.unsplash.com/photo-1615887023516-9b663b679d9e?auto=format&fit=crop&q=80&w=800", "Whole baked little neck clams with seasoned breadcrumbs."),
  createItem('app2', "Mozzarella Sticks (6)", 12.00, Category.APPETIZERS, 'Regular', "https://images.unsplash.com/photo-1531749668029-2db88e4276c7?auto=format&fit=crop&q=80&w=800", "Served with tomato sauce.", undefined, {vegetarian: true}),
  createItem('app3', "Zucchini Sticks", 12.95, Category.APPETIZERS, 'Regular', "https://images.unsplash.com/photo-1604908554025-f09d8cc4c5d5?auto=format&fit=crop&q=80&w=800", "Crispy fried zucchini.", undefined, {vegetarian: true}),
  createItem('app4', "Fried Calamari", 12.95, Category.APPETIZERS, 'Regular', "https://images.unsplash.com/photo-1626804475297-411dbe63c4fa?auto=format&fit=crop&q=80&w=800", "Golden fried calamari with marinara.", undefined, {popular: true}),
  createItem('app5', "Stuffed Mushrooms", 13.75, Category.APPETIZERS, 'Regular', "https://images.unsplash.com/photo-1623961990059-28356e22bc8e?auto=format&fit=crop&q=80&w=800", "Stuffed with vegetable stuffing."),
  createItem('app6', "Chicken Tenders", 12.95, Category.APPETIZERS, 'Regular', "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&q=80&w=800", "Served with honey mustard."),
  createItem('app7', "Mozzarella Caprese", 8.50, Category.APPETIZERS, 'Regular', "https://images.unsplash.com/photo-1529312266912-b33cf6227e24?auto=format&fit=crop&q=80&w=800", "Fresh mozzarella, tomato, basil.", undefined, {vegetarian: true}),
  createItem('app8', "Buffalo Wings (10)", 16.00, Category.APPETIZERS, 'Regular', "https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&q=80&w=800", "Spicy chicken wings served with bleu cheese.", undefined, {spicy: true}),
  createItem('app9', "Hot Antipasto", 20.50, Category.APPETIZERS, 'Regular', "https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&q=80&w=800", "Clams, mussels, shrimp, eggplant rollatini, mozzarella sticks."),

  // --- SALADS ---
  createItem('sal1', "Garden Salad", 8.55, Category.SALADS, 'Regular', "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800", "Mixed greens and fresh vegetables.", [{label: "Small", price: 8.55}, {label: "Large", price: 12.50}], {vegetarian: true}),
  createItem('sal2', "Caesar Salad", 9.50, Category.SALADS, 'Regular', "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&q=80&w=800", "Romaine, croutons, parmesan.", [{label: "Small", price: 9.50}, {label: "Large", price: 13.50}]),
  createItem('sal3', "Kale Salad", 14.85, Category.SALADS, 'Regular', "https://images.unsplash.com/photo-1539132036485-2c8eb107870a?auto=format&fit=crop&q=80&w=800", "Fresh kale with lemon vinaigrette.", undefined, {vegetarian: true}),
  createItem('sal4', "Chopped Salad", 15.25, Category.SALADS, 'Regular', "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=800", "Finely chopped mixed greens and vegetables.", undefined, {vegetarian: true}),
  createItem('sal5', "Greek Salad", 14.75, Category.SALADS, 'Regular', "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&q=80&w=800", "Feta, olives, cucumber, tomato.", undefined, {vegetarian: true}),
  createItem('sal6', "Sicilian Salad", 15.75, Category.SALADS, 'Regular', "https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?auto=format&fit=crop&q=80&w=800", "Mixed greens, olives, capers, fresh mozzarella, roasted peppers.", undefined, {vegetarian: true}),

  // --- SOUP ---
  createItem('soup1', "Pasta Fagioli", 9.25, Category.SOUPS, 'Regular', "https://images.unsplash.com/photo-1547592166-23acbe346499?auto=format&fit=crop&q=80&w=800", "Pasta and beans.", undefined, {vegetarian: true}),
  createItem('soup2', "Minestrone", 9.25, Category.SOUPS, 'Regular', "https://images.unsplash.com/photo-1547592166-23acbe346499?auto=format&fit=crop&q=80&w=800", "Vegetable soup.", undefined, {vegetarian: true}),
  createItem('soup3', "Chicken Noodle", 9.25, Category.SOUPS, 'Regular', "https://images.unsplash.com/photo-1603569283847-aa295f0d016a?auto=format&fit=crop&q=80&w=800", "Classic chicken soup."),
  createItem('soup4', "Tortellini in Brodo", 9.25, Category.SOUPS, 'Regular', "https://images.unsplash.com/photo-1559563362-c667ba5f5480?auto=format&fit=crop&q=80&w=800", "Cheese tortellini in broth."),

  // --- PASTA ---
  createItem('pas1', "Spaghetti with Tomato Sauce", 11.50, Category.PASTA, 'Regular', "https://images.unsplash.com/photo-1598866594230-a7d127dddb18?auto=format&fit=crop&q=80&w=800", "Classic tomato sauce.", [{label: "Lunch", price: 11.50}, {label: "Dinner", price: 17.50}], {vegetarian: true}),
  createItem('pas2', "Pasta Alla Norma", 13.50, Category.PASTA, 'Regular', "https://images.unsplash.com/photo-1626844131082-256783844137?auto=format&fit=crop&q=80&w=800", "Eggplant, marinara, ricotta salata.", [{label: "Lunch", price: 13.50}, {label: "Dinner", price: 21.25}], {vegetarian: true}),
  createItem('pas3', "Clam Sauce", 15.75, Category.PASTA, 'Regular', "https://images.unsplash.com/photo-1596450502967-826372d89d42?auto=format&fit=crop&q=80&w=800", "Chopped clams in garlic wine sauce (Red or White).", [{label: "Lunch", price: 15.75}, {label: "Dinner", price: 23.50}]),
  createItem('pas4', "Fettuccine Alfredo", 13.50, Category.PASTA, 'Regular', "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&q=80&w=800", "Creamy parmesan sauce.", [{label: "Lunch", price: 13.50}, {label: "Dinner", price: 21.00}], {vegetarian: true}),
  createItem('pas5', "Penne Alla Vodka", 14.75, Category.PASTA, 'Regular', "https://images.unsplash.com/photo-1626844131082-256783844137?auto=format&fit=crop&q=80&w=800", "Pink cream sauce with vodka.", [{label: "Lunch", price: 14.75}, {label: "Dinner", price: 22.25}], {popular: true, vegetarian: true}),
  createItem('pas6', "Spaghetti Carbonara", 14.75, Category.PASTA, 'Regular', "https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&q=80&w=800", "Cream sauce with bacon and onions.", [{label: "Lunch", price: 14.75}, {label: "Dinner", price: 21.50}]),
  createItem('pas7', "Pasta Bolognese", 14.25, Category.PASTA, 'Regular', "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?auto=format&fit=crop&q=80&w=800", "Classic meat sauce.", [{label: "Lunch", price: 14.25}, {label: "Dinner", price: 21.50}]),
  createItem('pas8', "Calamari Marinara", 15.75, Category.PASTA, 'Regular', "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&q=80&w=800", "Over Linguine.", [{label: "Lunch", price: 15.75}, {label: "Dinner", price: 23.50}]),
  createItem('pas9', "Lobster Fra Diavolo", 16.35, Category.PASTA, 'Regular', "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=800", "Spicy marinara with lobster meat.", [{label: "Lunch", price: 16.35}, {label: "Dinner", price: 23.50}], {spicy: true}),
  createItem('pas10', "Shrimp Scampi", 14.50, Category.PASTA, 'Regular', "https://images.unsplash.com/photo-1633337474564-1d9478ca4e2e?auto=format&fit=crop&q=80&w=800", "Garlic, butter, white wine.", [{label: "Lunch", price: 14.50}, {label: "Dinner", price: 22.00}]),
  createItem('pas11', "Rigatoni Montanasa", 15.00, Category.PASTA, 'Regular', "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&q=80&w=800", "Spinach, sun-dried tomatoes, grilled chicken, garlic & oil.", [{label: "Lunch", price: 15.00}, {label: "Dinner", price: 23.50}]),
  createItem('pas12', "Penne Alla Rosa", 17.00, Category.PASTA, 'Regular', "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&q=80&w=800", "Chicken, broccoli, sun-dried tomatoes, garlic & oil.", [{label: "Lunch", price: 17.00}, {label: "Dinner", price: 25.25}]),
  createItem('pas13', "Pasta Pesto", 13.95, Category.PASTA, 'Regular', "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&q=80&w=800", "Fresh basil pesto sauce.", [{label: "Lunch", price: 13.95}, {label: "Dinner", price: 20.95}], {vegetarian: true}),

  // --- BAKED PASTA ---
  createItem('bp1', "Baked Ziti", 17.25, Category.BAKED_PASTA, 'Regular', "https://images.unsplash.com/photo-1595295333158-4742f28fbd85?auto=format&fit=crop&q=80&w=800", "Ricotta, mozzarella, tomato sauce.", undefined, {vegetarian: true}),
  createItem('bp2', "Baked Ravioli", 17.25, Category.BAKED_PASTA, 'Regular', "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&q=80&w=800", "Cheese ravioli baked with mozzarella.", undefined, {vegetarian: true}),
  createItem('bp3', "Homemade Meat Lasagna", 18.60, Category.BAKED_PASTA, 'Regular', "https://images.unsplash.com/photo-1574868235945-060fadb398ea?auto=format&fit=crop&q=80&w=800", "Layers of meat, cheese, and pasta.", undefined, {popular: true}),
  createItem('bp4', "Baked Manicotti", 17.25, Category.BAKED_PASTA, 'Regular', "https://images.unsplash.com/photo-1595295333158-4742f28fbd85?auto=format&fit=crop&q=80&w=800", "Pasta tubes filled with ricotta.", undefined, {vegetarian: true}),
  createItem('bp5', "Baked Stuffed Shells", 17.25, Category.BAKED_PASTA, 'Regular', "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&q=80&w=800", "Jumbo shells filled with ricotta.", undefined, {vegetarian: true}),

  // --- ENTREES ---
  createItem('ent1', "Marsala", 27.00, Category.ENTREES, 'Regular', "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=800", "Mushrooms and marsala wine sauce.", [{label: "Chicken", price: 27.00}, {label: "Veal", price: 29.00}]),
  createItem('ent2', "Francese", 27.00, Category.ENTREES, 'Regular', "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=800", "Lemon butter white wine sauce.", [{label: "Chicken", price: 27.00}, {label: "Veal", price: 29.00}]),
  createItem('ent3', "Piccata", 27.00, Category.ENTREES, 'Regular', "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=800", "Capers, lemon, white wine.", [{label: "Chicken", price: 27.00}, {label: "Veal", price: 29.00}]),
  createItem('ent4', "Chicken Cordon Bleu", 27.95, Category.ENTREES, 'Regular', "https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?auto=format&fit=crop&q=80&w=800", "Stuffed with ham and swiss cheese."),
  createItem('ent5', "Broiled Salmon", 24.25, Category.ENTREES, 'Regular', "https://images.unsplash.com/photo-1467003909585-2f8a7270028d?auto=format&fit=crop&q=80&w=800", "Fresh salmon filet."),
  createItem('ent6', "Shrimp Fra Diavolo", 29.95, Category.ENTREES, 'Regular', "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=800", "Spicy marinara sauce.", undefined, {spicy: true}),
  createItem('ent7', "Grilled Chicken Primavera", 27.00, Category.ENTREES, 'Regular', "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&q=80&w=800", "With fresh vegetables."),

  // --- PARMIGIANA ---
  createItem('parm1', "Chicken Parmigiana", 26.00, Category.PARMIGIANA, 'Regular', "https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?auto=format&fit=crop&q=80&w=800", "Breaded cutlet, marinara, mozzarella.", undefined, {popular: true}),
  createItem('parm2', "Veal Cutlet Parm", 26.00, Category.PARMIGIANA, 'Regular', "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=800", "Tender veal cutlet."),
  createItem('parm3', "Eggplant Parm", 22.15, Category.PARMIGIANA, 'Regular', "https://images.unsplash.com/photo-1590124694936-a3da1d374241?auto=format&fit=crop&q=80&w=800", "Layers of eggplant.", undefined, {vegetarian: true}),
  createItem('parm4', "Meatball Parm", 22.15, Category.PARMIGIANA, 'Regular', "https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&q=80&w=800", "Homemade meatballs."),
  createItem('parm5', "Shrimp Parm", 27.00, Category.PARMIGIANA, 'Regular', "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=800", "Breaded jumbo shrimp."),
  createItem('parm6', "Sausage & Peppers", 22.95, Category.PARMIGIANA, 'Regular', "https://images.unsplash.com/photo-1637332212957-897db6743956?auto=format&fit=crop&q=80&w=800", "Served as a platter."),

  // --- HEROES ---
  createItem('her1', "Meatball Parm Hero", 11.50, Category.HEROES, 'Regular', "https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&q=80&w=800", "Meatballs, sauce, cheese."),
  createItem('her2', "Chicken Cutlet Hero", 12.95, Category.HEROES, 'Regular', "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&q=80&w=800", "Breaded chicken cutlet."),
  createItem('her3', "Chicken Parm Hero", 14.00, Category.HEROES, 'Regular', "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&q=80&w=800", "Chicken parmigiana on bread."),
  createItem('her4', "Sausage & Peppers Hero", 11.95, Category.HEROES, 'Regular', "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&q=80&w=800", "Italian sausage, peppers, onions."),
  createItem('her5', "Eggplant Parm Hero", 11.50, Category.HEROES, 'Regular', "https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&q=80&w=800", "Eggplant parm on bread."),
  createItem('her6', "Veal Parm Hero", 15.25, Category.HEROES, 'Regular', "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&q=80&w=800", "Veal parm on bread."),
  createItem('her7', "Shrimp Parm Hero", 14.80, Category.HEROES, 'Regular', "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=800", "Shrimp parm on bread."),
  createItem('her8', "Potato & Egg Hero", 10.95, Category.HEROES, 'Regular', "https://images.unsplash.com/photo-1525351463902-326720d27571?auto=format&fit=crop&q=80&w=800", "Classic potato and egg."),

  // --- WRAPS ---
  createItem('wr1', "Grilled Chicken Caesar Wrap", 15.50, Category.WRAPS, 'Regular', "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&q=80&w=800", "Chicken, romaine, caesar."),
  createItem('wr2', "California Wrap", 17.75, Category.WRAPS, 'Regular', "https://images.unsplash.com/photo-1563583594-52d9a377d611?auto=format&fit=crop&q=80&w=800", "Chicken, lettuce, tomato, mayo."),
  createItem('wr3', "Cajun Chicken Wrap", 15.50, Category.WRAPS, 'Regular', "https://images.unsplash.com/photo-1563583594-52d9a377d611?auto=format&fit=crop&q=80&w=800", "Spicy cajun chicken."),
  createItem('wr4', "Chicken Cutlet Vodka Wrap", 15.50, Category.WRAPS, 'Regular', "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&q=80&w=800", "Cutlet with vodka sauce."),
  
  // --- PIZZA ---
  createItem('piz1', "Neopolitan (Round 18\")", 23.30, Category.PIZZA, 'Regular', "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&q=80&w=800", "Classic round cheese pizza.", [{label: "Slice", price: 3.90}, {label: "Pie", price: 23.30}], {popular: true}),
  createItem('piz2', "Sicilian (Square 12x18\")", 24.30, Category.PIZZA, 'Regular', "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=800", "Thick crust square pizza.", [{label: "Slice", price: 3.90}, {label: "Pie", price: 24.30}]),
  createItem('piz3', "Grandma Pie", 24.30, Category.PIZZA, 'Regular', "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=800", "Thin square, garlic, fresh basil.", [{label: "Slice", price: 3.90}, {label: "Pie", price: 24.30}], {popular: true}),
  createItem('piz4', "Gluten Free Cauliflower", 18.65, Category.PIZZA, 'Regular', "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&q=80&w=800", "12 inch gluten free crust."),

  // --- SPECIALTY PIZZA ---
  createItem('sp1', "White Pizza", 29.50, Category.SPECIALTY_PIZZA, 'Regular', "https://images.unsplash.com/photo-1511690656952-34342d5c2895?auto=format&fit=crop&q=80&w=800", "Ricotta and mozzarella.", [{label: "Slice", price: 5.00}, {label: "Pie", price: 29.50}]),
  createItem('sp2', "Buffalo Chicken Pizza", 35.50, Category.SPECIALTY_PIZZA, 'Regular', "https://images.unsplash.com/photo-1593560708920-63984dc01ae4?auto=format&fit=crop&q=80&w=800", "Spicy chicken, bleu cheese.", [{label: "Slice", price: 6.00}, {label: "Pie", price: 35.50}], {spicy: true}),
  createItem('sp3', "Chicken Bacon Ranch", 35.50, Category.SPECIALTY_PIZZA, 'Regular', "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=800", "Chicken, bacon, ranch drizzle.", [{label: "Slice", price: 6.00}, {label: "Pie", price: 35.50}]),
  createItem('sp4', "Margherita Pizza", 29.00, Category.SPECIALTY_PIZZA, 'Regular', "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&q=80&w=800", "Fresh mozzarella, basil, marinara.", [{label: "Slice", price: 5.00}, {label: "Pie", price: 29.00}]),
  createItem('sp5', "Chicken Parm Pizza", 24.30, Category.SPECIALTY_PIZZA, 'Regular', "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=800", "Breaded chicken, marinara.", [{label: "Slice", price: 3.90}, {label: "Pie", price: 24.30}]),
  createItem('sp6', "MVP Pizza", 29.25, Category.SPECIALTY_PIZZA, 'Regular', "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=800", "Marinara, Vodka, Pesto sauce.", [{label: "Slice", price: 5.25}, {label: "Pie", price: 29.25}]),

  // --- CALZONES & ROLLS ---
  createItem('cal1', "Cheese Calzone", 8.80, Category.CALZONES, 'Regular', "https://images.unsplash.com/photo-1533777419517-3e6fdb10dd3b?auto=format&fit=crop&q=80&w=800", "Ricotta and mozzarella."),
  createItem('cal2', "Chicken Roll", 8.80, Category.CALZONES, 'Regular', "https://images.unsplash.com/photo-1506084868230-bb9d95c24759?auto=format&fit=crop&q=80&w=800", "Chicken parm roll."),
  createItem('cal3', "Sausage & Pepper Roll", 8.80, Category.CALZONES, 'Regular', "https://images.unsplash.com/photo-1506084868230-bb9d95c24759?auto=format&fit=crop&q=80&w=800", "Sausage, peppers, cheese."),
  createItem('cal4', "Pinwheels", 5.15, Category.CALZONES, 'Regular', "https://images.unsplash.com/photo-1576458088443-04a19bb13da6?auto=format&fit=crop&q=80&w=800", "Buffalo Chicken or Spinach/Broccoli."),
  createItem('cal5', "Garlic Knots (6)", 3.60, Category.CALZONES, 'Regular', "https://images.unsplash.com/photo-1573140247632-f84660f67627?auto=format&fit=crop&q=80&w=800", "With fresh garlic and oil."),

  // =========================
  // CATERING MENU
  // =========================
  createItem('cat_app1', "Baked Clams", 73.00, Category.APPETIZERS, 'Catering', "https://images.unsplash.com/photo-1615887023516-9b663b679d9e?auto=format&fit=crop&q=80&w=800", "Catering Tray.", [{label: "Half Tray", price: 73.00}, {label: "Full Tray", price: 125.00}]),
  createItem('cat_app2', "Mozzarella Sticks", 57.00, Category.APPETIZERS, 'Catering', "https://images.unsplash.com/photo-1531749668029-2db88e4276c7?auto=format&fit=crop&q=80&w=800", "Catering Tray.", [{label: "Half Tray", price: 57.00}, {label: "Full Tray", price: 88.00}]),
  createItem('cat_app3', "Fried Calamari", 73.00, Category.APPETIZERS, 'Catering', "https://images.unsplash.com/photo-1626804475297-411dbe63c4fa?auto=format&fit=crop&q=80&w=800", "Catering Tray.", [{label: "Half Tray", price: 73.00}, {label: "Full Tray", price: 130.00}]),
  createItem('cat_app4', "Stuffed Mushrooms", 68.00, Category.APPETIZERS, 'Catering', "https://images.unsplash.com/photo-1623961990059-28356e22bc8e?auto=format&fit=crop&q=80&w=800", "Catering Tray.", [{label: "Half Tray", price: 68.00}, {label: "Full Tray", price: 119.00}]),
  createItem('cat_app5', "Buffalo Wings", 68.00, Category.APPETIZERS, 'Catering', "https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&q=80&w=800", "Catering Tray.", [{label: "Half Tray", price: 68.00}, {label: "Full Tray", price: 114.00}]),

  createItem('cat_sal1', "Garden Salad", 42.00, Category.SALADS, 'Catering', "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800", "Catering Tray.", [{label: "Half Tray", price: 42.00}, {label: "Full Tray", price: 78.00}]),
  createItem('cat_sal2', "Caesar Salad", 52.00, Category.SALADS, 'Catering', "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&q=80&w=800", "Catering Tray.", [{label: "Half Tray", price: 52.00}, {label: "Full Tray", price: 88.00}]),

  createItem('cat_pas1', "Penne Alla Vodka", 78.00, Category.PASTA, 'Catering', "https://images.unsplash.com/photo-1626844131082-256783844137?auto=format&fit=crop&q=80&w=800", "Catering Tray.", [{label: "Half Tray", price: 78.00}, {label: "Full Tray", price: 130.00}]),
  createItem('cat_pas2', "Baked Ziti", 73.00, Category.BAKED_PASTA, 'Catering', "https://images.unsplash.com/photo-1595295333158-4742f28fbd85?auto=format&fit=crop&q=80&w=800", "Catering Tray.", [{label: "Half Tray", price: 73.00}, {label: "Full Tray", price: 119.00}]),
  createItem('cat_pas3', "Baked Meat Lasagna", 78.00, Category.BAKED_PASTA, 'Catering', "https://images.unsplash.com/photo-1574868235945-060fadb398ea?auto=format&fit=crop&q=80&w=800", "Catering Tray.", [{label: "Half Tray", price: 78.00}, {label: "Full Tray", price: 125.00}]),
  createItem('cat_pas4', "Rigatoni Bolognese", 73.00, Category.PASTA, 'Catering', "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?auto=format&fit=crop&q=80&w=800", "Catering Tray.", [{label: "Half Tray", price: 73.00}, {label: "Full Tray", price: 125.00}]),

  createItem('cat_ent1', "Chicken Parmigiana", 78.00, Category.PARMIGIANA, 'Catering', "https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?auto=format&fit=crop&q=80&w=800", "Catering Tray.", [{label: "Half Tray", price: 78.00}, {label: "Full Tray", price: 140.00}]),
  createItem('cat_ent2', "Chicken Marsala", 88.00, Category.ENTREES, 'Catering', "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=800", "Catering Tray.", [{label: "Half Tray", price: 88.00}, {label: "Full Tray", price: 150.00}]),
  createItem('cat_ent3', "Chicken Francese", 88.00, Category.ENTREES, 'Catering', "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=800", "Catering Tray.", [{label: "Half Tray", price: 88.00}, {label: "Full Tray", price: 150.00}]),
  createItem('cat_ent4', "Sausage & Peppers", 73.00, Category.PARMIGIANA, 'Catering', "https://images.unsplash.com/photo-1637332212957-897db6743956?auto=format&fit=crop&q=80&w=800", "Catering Tray.", [{label: "Half Tray", price: 73.00}, {label: "Full Tray", price: 130.00}]),
  createItem('cat_ent5', "Eggplant Parmigiana", 73.00, Category.PARMIGIANA, 'Catering', "https://images.unsplash.com/photo-1590124694936-a3da1d374241?auto=format&fit=crop&q=80&w=800", "Catering Tray.", [{label: "Half Tray", price: 73.00}, {label: "Full Tray", price: 125.00}]),
  createItem('cat_ent6', "Meatball Parmigiana", 73.00, Category.PARMIGIANA, 'Catering', "https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&q=80&w=800", "Catering Tray.", [{label: "Half Tray", price: 73.00}, {label: "Full Tray", price: 130.00}]),
];

export const MOCK_EMPLOYEES: Employee[] = [
  {
    id: 'e1',
    name: 'Tony LaRosa',
    role: 'Manager',
    pin: '1985',
    isClockedIn: true,
    lastClockIn: new Date(),
    schedule: [
      { id: 'sh1', day: 'Monday', start: '10:00 AM', end: '8:00 PM' },
      { id: 'sh2', day: 'Tuesday', start: '10:00 AM', end: '8:00 PM' },
      { id: 'sh3', day: 'Friday', start: '12:00 PM', end: '11:00 PM' },
    ]
  },
  {
    id: 'e2',
    name: 'Maria Rossi',
    role: 'Server',
    pin: '1234',
    isClockedIn: false,
    schedule: [
      { id: 'sh4', day: 'Wednesday', start: '4:00 PM', end: '10:00 PM' },
      { id: 'sh5', day: 'Saturday', start: '4:00 PM', end: '11:00 PM' },
    ]
  },
  {
    id: 'e3',
    name: 'Giuseppe "Joe" Pizza',
    role: 'Chef',
    pin: '0000',
    isClockedIn: true,
    lastClockIn: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
    schedule: [
      { id: 'sh6', day: 'Thursday', start: '3:00 PM', end: '10:00 PM' },
      { id: 'sh7', day: 'Friday', start: '3:00 PM', end: '11:00 PM' },
      { id: 'sh8', day: 'Saturday', start: '3:00 PM', end: '11:00 PM' },
    ]
  }
];