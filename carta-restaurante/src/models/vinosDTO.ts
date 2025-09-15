import { z } from "zod";

const CategoriaSchema = z.object({
  id: z.number(),
  nombre: z.string(),
});

const BodegaSchema = z.object({
  id: z.number(),
  nombre: z.string(),
});

const DenominacionOrigenSchema = z.object({
  id: z.number(),
  nombre: z.string(),
});

const EnologoSchema = z.object({
  id: z.number(),
  nombre: z.string(),
});

const UvaSchema = z.object({
  id: z.number(),
  nombre: z.string(),
});

const VinoSchema = z.object({
  id: z.number(),
  nombre: z.string(),
  precio: z.string(), // O z.number() si lo conviertes en backend
  categoria_id: z.number(),
  bodega_id: z.number(),
  denominacion_origen_id: z.number(),
  enologo_id: z.number().nullable(), // puede ser null
  categoria: CategoriaSchema,
  bodega: BodegaSchema,
  denominacion_origen: DenominacionOrigenSchema,
  enologo: EnologoSchema.nullable(), // puede ser null
  uvas: z.array(UvaSchema),
});

export type Vino = z.infer<typeof VinoSchema>;
export const Vinos = z.array(VinoSchema);

export async function fetchVinos(): Promise< Vino[] > {

    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    const response = await fetch(`${baseUrl}/public/vinos`);
    const data = await response.json();
    console.log("Fetched Vinos:",data);
    const vinosArray = Array.isArray(data) ? data : data.vinos || data.data;
    const parsed = Vinos.safeParse(vinosArray);
    if(!parsed.success){
        throw new Error("Error al obtener los Vinos : " + parsed.error);
    }
    return parsed.data;
}
