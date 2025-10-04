import { z } from "zod";

// Esquema base de cada plato
export const PlatoSchema = z.object({
  id: z.number(),
  nombre: z.string(),
  descripcion: z.string(),
  precio: z.number(),
  alergenos: z.array(z.string()),
});

export type Plato = z.infer<typeof PlatoSchema>;

// Esquema principal que valida el objeto tal cual llega del API
export const MenuSchema = z.object({
  platos: z.record(z.string(), z.array(PlatoSchema)),
});

export type Menu = z.infer<typeof MenuSchema>;

// Función de fetch con parseo pero SIN cambiar la estructura
export async function fetchPlatos(): Promise<Menu> {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const response = await fetch(`${baseUrl}/public/platos`);
  const data = await response.json();

  const parsed = MenuSchema.safeParse(data);
  if (!parsed.success) {
    console.error("❌ Error de validación:", parsed.error);
    throw new Error("Error al validar los datos del menú");
  }

  console.log("✅ Menú validado:", parsed.data);
  return parsed.data; // Devuelve la misma estructura que el backend
}
