import { notFound } from "next/navigation";

// Exporta el componente de página como default (Next.js lo reconoce como una ruta)
export default async function Page(
  // Recibe props con parámetros dinámicos desde la URL (ejemplo: /pokemon/pikachu)
  props: { params: Promise<{ slug: string }> }
) {
  // Extrae el valor de "slug" que representa el nombre o ID del Pokémon
  const { slug } = await props.params;

  // Llama a la API de Pokémon usando el slug para obtener información del Pokémon
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${slug}`);

  // Si la API responde con un error, muestra una página 404 de Next.js
  if (!res.ok) notFound();

  // Convierte la respuesta en formato JSON
  const pokemon = await res.json();

  // Retorna el JSX que renderiza la información del Pokémon
  return (
    // Contenedor principal con estilos de TailwindCSS
    <div className="min-h-screen bg-emerald-100 py-10 px-6 flex flex-col items-center">

      {/* Título que muestra el nombre del Pokémon en mayúsculas */}
      <h1 className="text-4xl font-bold text-teal-700 mb-6 uppercase">
        {pokemon.name}
      </h1>

      {/* Imagen frontal del Pokémon obtenida desde la API */}
      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        className="w-40 h-40 mb-4"
      />

      {/* Tarjeta con sus datos básicos */}
      <div className="bg-white rounded-2xl shadow-md p-6 w-full max-w-md text-gray-800">

        <p>
          <b>ID:</b> {pokemon.id}
        </p>

        <p>
          <b>Altura:</b> {pokemon.height}
        </p>

        <p>
          <b>Peso:</b> {pokemon.weight}
        </p>

        <p>
          <b>Tipos:</b> {pokemon.types.map((t: any) => t.type.name).join(", ")}
        </p>
        
      </div>
    </div>
  );
}
