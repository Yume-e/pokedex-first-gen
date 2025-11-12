import { notFound } from "next/navigation";

export default async function Page(
  props: { params: Promise<{ slug: string }> }
) {
  const { slug } = await props.params;

  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${slug}`);

  if (!res.ok) notFound();

  const pokemon = await res.json();

  return (
    <div className="min-h-screen bg-emerald-100 py-10 px-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-teal-700 mb-6 uppercase">{pokemon.name}</h1>

      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        className="w-40 h-40 mb-4"
      />

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
