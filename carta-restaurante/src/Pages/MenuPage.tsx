import { AllergenGuide, Footer, Header, MenuSection, ScrollToTop } from "../components";

// Datos del menú
const menuData = {
  sugerencias: [
    {
      category: "ENTRANTES",
      items: [
        {
          name: "Brioche de Carrillera",
          price: "14,00 €",
          allergens: ["gluten", "sulfites", "egg"],
        },
      ],
    },
    {
      category: "PLATOS PRINCIPALES",
      items: [
        { name: "Chuletón de Minhota", price: "69,00 €/Kg", allergens: [] },
        {
          name: "Chuletón de Old Special Beef",
          price: "85,00 €/Kg",
          allergens: [],
        },
      ],
    },
    {
      category: "POSTRES",
      items: [
        {
          name: "Tarta Cremosa de Nocilla",
          price: "7,00 €",
          allergens: ["nuts", "milk", "soy", "gluten"],
        },
        {
          name: "Mouse de Limón",
          price: "6,50 €",
          allergens: ["milk", "gluten"],
        },
      ],
    },
  ],
  entrantes: [
    {
      name: "Chipirones a la plancha",
      price: "10,50 €",
      allergens: ["shellfish"],
    },
    {
      name: "Chipirones encebollados",
      price: "10,80 €",
      allergens: ["shellfish", "sulfites"],
    },
    { name: "Pulpo A Feira", price: "18,00 €", allergens: ["shellfish"] },
    { name: "Pulpo a la Brasa", price: "18,80 €", allergens: ["shellfish"] },
    {
      name: "Pimiento de Padrón (en temporada)",
      price: "5,50 €",
      allergens: [],
    },
    {
      name: "Empanada",
      price: "6,00 €",
      description: "Atún / Bacalao / Carne",
      allergens: ["gluten", "fish", "egg", "sulfites"],
    },
    {
      name: "Empanada",
      price: "9,80 €",
      description: "Zamburiñas / Xoubas",
      allergens: [
        "gluten",
        "soy",
        "celery",
        "shellfish",
        "mustard",
        "milk",
        "sesame",
      ],
    },
    {
      name: "Tabla Mixta A Ferreira",
      price: "18,00 €",
      allergens: ["milk", "nuts", "egg"],
    },
    {
      name: "Cecina de Origen con Queso Trufado",
      price: "18,00 €",
      allergens: ["milk"],
    },
    {
      name: "Croquetas de Carne",
      price: "7,50 €",
      description: "12 Unidades",
      allergens: ["gluten", "milk", "egg"],
    },
    {
      name: "Croquetas de Marisco o Choco",
      price: "8,50 €",
      description: "12 Unidades",
      allergens: ["gluten", "milk", "egg", "crustaceans", "fish", "shellfish"],
    },
    {
      name: "Croquetas Variadas",
      price: "14,00 €",
      description: "6 Cr. Carne / 6 Cr. Choco / 6 Cr. Marisco",
      allergens: ["gluten", "milk", "egg", "crustaceans", "fish", "shellfish"],
    },
    {
      name: "Pan Bao de Cerdo o Marisco con Queso",
      price: "7,20 €",
      description: "2 Unidades",
      allergens: ["gluten", "milk", "egg", "crustaceans", "fish", "shellfish"],
    },
    {
      name: "Pan Bao Negro de Calamar",
      price: "8,50 €",
      description: "2 Unidades",
      allergens: [
        "gluten",
        "milk",
        "egg",
        "crustaceans",
        "fish",
        "shellfish",
        "nuts",
        "celery",
        "mustard",
        "sesame",
      ],
    },
  ],
  ensaladas: [
    {
      name: "Ensalada Grande",
      price: "6,50 €",
      description: "Tomate / Lechuga / Cebolla",
      allergens: [],
    },
    {
      name: "Ensalada Pequeña",
      price: "5,50 €",
      description: "Tomate / Lechuga / Cebolla",
      allergens: [],
    },
    {
      name: "Ensalada Mixta Grande",
      price: "9,00 €",
      description:
        "Tomate / Lechuga / Cebolla / Espárragos / Remolacha / Zanahoria / Huevo / Atún",
      allergens: ["egg", "fish"],
    },
    {
      name: "Ensalada Mixta Pequeña",
      price: "7,00 €",
      description:
        "Tomate / Lechuga / Cebolla / Espárragos / Remolacha / Zanahoria / Huevo / Atún",
      allergens: ["egg", "fish"],
    },
    {
      name: "Ensalada A Ferreira",
      price: "8,50 €",
      description:
        "Variado ensalada / Nuez / Soja / Naranja / Langostino / Tomate Cherry",
      allergens: ["nuts", "soy", "crustaceans"],
    },
    {
      name: "Ensalada templada de Vieira y Langostino",
      price: "10,00 €",
      description:
        "Variado ensalada / Vieira / Langostino / Salsa De miel y Vinagre",
      allergens: ["gluten", "nuts", "shellfish", "crustaceans"],
    },
    {
      name: "Ensalada de tomate y queso burrata",
      price: "9,30 €",
      description: "Tomate / Anchoa / Queso de Burrata / Albahaca / Pistacho",
      allergens: ["nuts", "milk", "fish"],
    },
    {
      name: "Ensalada de Tomate Confitado y Burrata Ahumada",
      price: "10,00 €",
      allergens: ["nuts", "milk"],
    },
  ],
  mariscos: [
    {
      name: "Gamba Roja a la Plancha",
      price: "16,00 €",
      allergens: ["crustaceans"],
    },
    {
      name: "Langostinos a la plancha",
      price: "12,00 €",
      allergens: ["crustaceans"],
    },
    {
      name: "Zamburiñas a la plancha",
      price: "15,00 €",
      allergens: ["shellfish"],
    },
    {
      name: "Almejas a la Marinera",
      price: "S/Mercado",
      allergens: ["gluten", "shellfish"],
    },
    {
      name: "Langostinos Crujientes",
      price: "12,00 €",
      allergens: ["gluten", "crustaceans"],
    },
    {
      name: "Vieiras del Mar a la Tierra",
      price: "14,00 €",
      description: "Vieira / Pure de Patata / Cebolla Caramelizada / Jamón",
      allergens: ["milk", "shellfish"],
    },
  ],
  carnes: [
    { name: "Churrasco de Cerdo", price: "12,00 €", allergens: ["sulfites"] },
    { name: "Churrasco de Ternera", price: "12,80 €", allergens: [] },
    { name: "Pincho Moruno", price: "4,50 €", allergens: ["sulfites"] },
    {
      name: "Parrillada de Carne (2 Personas)",
      price: "32,00 €",
      description:
        "Churrasco Cerdo / Churrasco Ternera / Pincho Moruno / Criollo",
      allergens: ["sulfites"],
    },
    { name: "Secreto Ibérico", price: "16,00 €", allergens: [] },
    { name: "Pollo Picantón", price: "8,00 €", allergens: ["sulfites"] },
    {
      name: "Parrillada A Ferreira ( 4 Personas )",
      price: "53,00 €",
      description:
        "Churrasco de Cerdo / Churrasco de Ternera / Criollo / Chorizo / Secreto / Pincho Moruno / Pollo Picantón",
      allergens: ["sulfites"],
    },
    { name: "Criollo", price: "3,00 €", allergens: [] },
    { name: "Chorizo", price: "3,00 €", allergens: [] },
    {
      name: "Costilla de Cerdo a baja Temperatura BBQ",
      price: "19,00 €",
      allergens: [],
    },
    { name: "Chuletillas de Cordero", price: "13,00 €", allergens: [] },
    { name: "Cordero Estofado", price: "12,00 €", allergens: ["sulfites"] },
    { name: "Croca de Ternera", price: "15,00 €", allergens: [] },
    { name: "Chuleta de Ternera", price: "26,00€/Kg", allergens: [] },
    { name: "Entrecot de Ternera", price: "37,00€/Kg", allergens: [] },
    { name: "Chuletón de Ternera", price: "26,00€/Kg", allergens: [] },
    { name: "Solomillo de Vaca Gallega", price: "24,00€", allergens: [] },
    {
      name: "Chuletón de Vaca Gallega",
      price: "54,00€/Kg",
      description: "Maduración de 60 días",
      allergens: [],
    },
    { name: "Churrasco de Angus", price: "17,40 €", allergens: [] },
    { name: "Presa de Angus", price: "17,00 €", allergens: [] },
    { name: "Entrecot de Angus", price: "25,00 €", allergens: [] },
    { name: "Chuletón de Angus", price: "51,00€/Kg", allergens: [] },
    { name: "Chuletón de Simmental", price: "69,00€/Kg", allergens: [] },
    {
      name: "Chuletón de Buey",
      price: "110,00€/Kg",
      description: "Maduración de 180 días",
      allergens: [],
    },
    {
      name: "Entrecot de Wagyu",
      price: "105,00 €",
      description: "Pieza de 300gr",
      allergens: [],
    },
    { name: "Chuletón de Vacuno Mayor", price: "39,00€/Kg", allergens: [] },
    { name: "T-Bone", price: "50,00€/Kg", allergens: [] },
    { name: "Tomahawk", price: "54,00€/Kg", allergens: [] },
    { name: "Ribeye", price: "28,00€", allergens: [] },
  ],
  pescados: [
    { name: "Bacalao a la plancha", price: "17,50 €", allergens: ["fish"] },
    { name: "Bacalao a la gallega", price: "17,50 €", allergens: ["fish"] },
    {
      name: "Brocheta de Rape con Langostino",
      price: "18,50 €",
      allergens: ["fish", "crustaceans"],
    },
    {
      name: "Lenguado",
      price: "S/Mercado",
      description: "Pescado salvaje",
      allergens: ["fish"],
    },
    {
      name: "Lubina",
      price: "S/Mercado",
      description: "Pescado salvaje",
      allergens: ["fish"],
    },
    {
      name: "Coruxo",
      price: "S/Mercado",
      description: "Pescado salvaje",
      allergens: ["fish"],
    },
    { name: "Pescados del día", price: "S/Mercado", allergens: ["fish"] },
  ],
  arroces: [
    {
      name: "Arroz a Banda",
      price: "40,00 €",
      description: "(2 Personas) Calamar / Rape / Gamba",
      allergens: ["shellfish", "crustaceans", "fish"],
    },
    {
      name: "Arroz con Bogavante",
      price: "S/Mercado",
      description: "(2 Personas)",
      allergens: ["shellfish", "crustaceans", "fish"],
    },
    {
      name: "Arroz de Vieiras y Pulpo",
      price: "42,00 €",
      description: "(2 Personas)",
      allergens: ["shellfish", "crustaceans", "fish"],
    },
    {
      name: "Arroz de Choco en su Tinta",
      price: "42,00 €",
      description: "(2 Personas)",
      allergens: ["shellfish", "crustaceans", "fish"],
    },
    {
      name: "Arroz de Carabinero",
      price: "48,00 €",
      description: "(2 Personas)",
      allergens: ["shellfish", "crustaceans", "fish"],
    },
  ],
  postres: [
    {
      name: "Tiramisú",
      price: "6,00 €",
      allergens: ["gluten", "nuts", "milk", "soy", "egg"],
    },
    { name: "Flan", price: "5,00 €", allergens: ["milk", "egg"] },
    { name: "Flan de queso", price: "5,50 €", allergens: ["milk", "egg"] },
    {
      name: "Tarta de la Abuela",
      price: "6,00 €",
      allergens: ["gluten", "nuts", "milk", "soy"],
    },
    {
      name: "Tarta de Tres Chocolates",
      price: "6,00 €",
      allergens: ["gluten", "nuts", "milk", "soy"],
    },
    {
      name: "Tarta de Queso Cremosa y Helado",
      price: "7,00 €",
      allergens: ["gluten", "nuts", "milk", "soy"],
    },
    { name: "Arroz con leche", price: "5,50 €", allergens: ["milk"] },
    {
      name: "Bannoffee",
      price: "6,00 €",
      allergens: ["gluten", "milk", "nuts"],
    },
    {
      name: "Tarta de piña fría",
      price: "6,00 €",
      allergens: ["gluten", "milk"],
    },
    {
      name: "Tarta de Queso Fría",
      price: "6,00 €",
      allergens: ["gluten", "nuts", "milk", "soy"],
    },
    {
      name: "Tarta de Queso con Membrillo",
      price: "6,00 €",
      allergens: ["gluten", "nuts", "milk", "soy"],
    },
    {
      name: "Tarta de Queso A Ferreira",
      price: "7,00 €",
      description: "Tarta de Queso al Horno sobre Brownie",
      allergens: ["gluten", "nuts", "milk", "soy", "egg"],
    },
  ],
};

const MenuPage = () => {
  return (
    <div>
        <section className="hero-section">
            <Header />
            <div className="menu-intro">
                <h1>NUESTROS PLATOS</h1>
            </div>
        </section>
        <main className="main-content">
            <MenuSection
            title="Sugerencias Del Día"
            items={menuData.sugerencias}
            isSpecial={true}
            />
            <MenuSection
            title="Entrantes"
            items={menuData.entrantes}
            dividerImage="https://asador-a-ferreira.es/wp-content/uploads/2025/02/about-hero.webp"
            />
            <MenuSection
            title="Ensaladas"
            items={menuData.ensaladas}
            dividerImage="https://asador-a-ferreira.es/wp-content/uploads/2025/02/about-hero.webp"
            />
            <MenuSection
            title="Mariscos"
            items={menuData.mariscos}
            dividerImage="https://asador-a-ferreira.es/wp-content/uploads/2025/02/about-hero.webp"
            />
            <MenuSection
            title="CARNES"
            items={menuData.carnes}
            dividerImage="https://asador-a-ferreira.es/wp-content/uploads/2025/02/about-hero.webp"
            />
            <MenuSection
            title="PESCADOS"
            items={menuData.pescados}
            note="Todos los pescados pueden ser elaborados al horno"
            dividerImage="https://asador-a-ferreira.es/wp-content/uploads/2025/02/about-hero.webp"
            />
            <MenuSection
            title="ARROCES"
            items={menuData.arroces}
            dividerImage="https://asador-a-ferreira.es/wp-content/uploads/2025/02/about-hero.webp"
            />
            <MenuSection
            title="Postres Caseros"
            items={menuData.postres}
            dividerImage="https://asador-a-ferreira.es/wp-content/uploads/2025/02/about-hero.webp"
            />

            <AllergenGuide />
        </main>
        <Footer />
        <ScrollToTop />
    </div>
    
  );
};

export default MenuPage;
