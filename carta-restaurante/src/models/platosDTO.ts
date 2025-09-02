import { z } from "zod";

// Subesquema para la categoría
const CategoriaSchema = z.object({
  nombre: z.string(),
  id: z.number(),
});

const AlergenosSchema = z.object({
  nombre: z.string(),
  id: z.number(),
});

// Esquema principal para el plato
export const PlatoSchema = z.object({
  nombre: z.string(),
  precio: z.string(),  // lo recibes como string "22.00"
  descripcion: z.string(),
  categoria_id: z.number(),
  id: z.number(),
  categoria: CategoriaSchema,
  alergenos: z.array(AlergenosSchema)
});

// Tipo de TypeScript inferido automáticamente
export type Plato = z.infer<typeof PlatoSchema>;
export const Platos = z.array(PlatoSchema);

export async function fetchPlatos(): Promise<Plato[]> {
  const response = await fetch("http://127.0.0.1:8000/api/v1/public/platos");
  const data = await response.json();
  console.log("Fetched platos:", data); 
  const platosArray = Array.isArray(data) ? data : data.platos || data.data;
  const parsed = Platos.safeParse(platosArray);
  if (!parsed.success) {
    throw new Error("Error al obtener los Platos: " + parsed.error);
  }
  return parsed.data;
}
