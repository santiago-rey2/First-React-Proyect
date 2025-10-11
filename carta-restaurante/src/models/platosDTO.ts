import { z } from "zod";

// Esquema base de cada plato
export const PlatoSchema = z.object({
  id: z.number(),
  nombre: z.string(),
  descripcion: z.string(),
  precio: z.number(),
  precio_unidad: z.string().nullable(),
  alergenos: z.array(z.string()),
});

export type Plato = z.infer<typeof PlatoSchema>;

// Esquema principal que valida el objeto tal cual llega del API
export const MenuSchema = z.object({
  platos: z.record(z.string(), z.array(PlatoSchema)),
});

export type Menu = z.infer<typeof MenuSchema>;

// Función helper para validar si el menú está vacío
const isMenuEmpty = (menu: Menu): boolean => {
  if (!menu.platos) {
    return true;
  }

  const categories = Object.keys(menu.platos);
  if (categories.length === 0) {
    return true;
  }

  // Verificar si todas las categorías están vacías
  const totalPlatos = Object.entries(menu.platos).reduce((acc, [platos]) => {
    return acc + platos.length;
  }, 0);

  if (totalPlatos === 0) {
    return true;
  }

  return false;
};

// Función de fetch con validación completa
export async function fetchPlatos(idioma: string): Promise<Menu> {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  
  // Simula un retraso de 1 segundo
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Validar idioma
  if (!idioma) {
    throw new Error("Idioma no proporcionado");
  }
  
  if (idioma !== "es" && idioma !== "en" && idioma !== "pt") {
    throw new Error(`Idioma '${idioma}' no soportado. Use: es, en o pt`);
  }

  try {
    const url = `${baseUrl}/public/platos?idioma=${idioma}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();

    // Validar estructura con Zod
    const parsed = MenuSchema.safeParse(data);
    
    if (!parsed.success) {
      throw new Error("Error al validar los datos del menú: estructura inválida");
    }

    // Validar si el menú está vacío
    if (isMenuEmpty(parsed.data)) {
      throw new Error("El menú no contiene platos disponibles");
    }

    return parsed.data;

  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Error desconocido al cargar el menú");
  }
}
