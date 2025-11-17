export default function HomePage() {
  return (
    <div className="min-h-screen bg-emerald-100 flex flex-col items-center py-12 px-6">
      <div className="max-w-3xl bg-white shadow-xl rounded-2xl p-10 w-full text-center">

        {/* TÍTULO */}
        <h1 className="text-4xl font-bold text-teal-700 mb-4">
          Bienvenido a la Pokedex de Kanto
        </h1>

        {/* DESCRIPCIÓN */}
        <p className="text-gray-700 mb-8">
          Explora los primeros 151 pokemon de la primera generacion, consulta su
          informacion detallada y disfruta de una interfaz diseñada con Next.js
          y Tailwind CSS.
          <br />
          <span className="font-semibold text-teal-600">
            ¿Que deseas hacer?
          </span>
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center mt-6">

          <a
            href="/pokemones"
            className="inline-block bg-teal-500 hover:bg-teal-400 text-white font-semibold py-3 px-8 rounded-full transition duration-200 shadow-md"
          >
            Ir a la pokedex
          </a>

          <a
            href="/pokemones/documentation"
            className="inline-block bg-white border-2 border-teal-500 hover:bg-teal-50 text-teal-600 font-semibold py-3 px-8 rounded-full transition duration-200 shadow-md"
          >
            Contactame
          </a>

        </div>

      </div>
    </div>
  );
}
