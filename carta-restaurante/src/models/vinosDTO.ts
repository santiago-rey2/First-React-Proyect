import { z } from "zod";


const VinoSchema = z.object({
  id: z.number(),
  nombre: z.string(),
  precio: z.number(),
  precio_unidad: z.string().nullable(),
  bodega: z.string().nullable(),
  uvas: z.array(z.string()).nullable(),
  enologo: z.string().nullable() 
});

export type Vino = z.infer<typeof VinoSchema>;
export const Vinos = z.array(VinoSchema);

// Denominaciones dinámicas
const DenominacionesSchema = z.record(z.string(),z.array(VinoSchema));
export type Denominaciones = z.infer<typeof DenominacionesSchema>;

// Categorías dinámicas
export const VinosAnidadosSchema = z.object({
  vinos: z.record(z.string(),DenominacionesSchema),
});

export type VinosPorCategoria = z.infer<typeof VinosAnidadosSchema>;


export async function fetchVinos(): Promise< VinosPorCategoria > {

    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    const response = await fetch(`${baseUrl}/public/vinos`);
    const data = await response.json();

    const parsed = VinosAnidadosSchema.safeParse(data);
    if (!parsed.success) {
      console.error("❌ Error de validación:", parsed.error);
      throw new Error("Error al validar los datos de los vinos");
    }
    console.log("✅ Vinos validados:", parsed.data);
    return parsed.data; // Devuelve la misma estructura que el backend
    
}
