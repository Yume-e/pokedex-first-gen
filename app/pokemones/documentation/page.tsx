import { FaGithub } from "react-icons/fa";
import Image from "next/image";

export default function Documentation() {
  return (

    <div className="min-h-screen bg-emerald-100 flex flex-col items-center py-12 px-6">
      <div className="max-w-3xl bg-white shadow-xl rounded-2xl p-8 w-full">
        <h1 className="text-4xl font-bold text-teal-700 mb-4 text-center">
          Documentacion del Proyecto
        </h1>

        <p className="text-gray-700 mb-8">
          Este proyecto fue desarrollado con <b>Next.js</b> y con <b>Tailwind CSS</b> como parte de una prueba 
          tecnica de programación, dicha prueba esta enfocada en el consumo de una API.
        </p>

        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-teal-600 mb-2">
							Descripción 
						</h2>

            <p className="text-gray-600">
              La Pokedex de Kanto muestra los primeros 151 pokemon de la primera generacion, con el numero
							de pokedex, altura, peso, y tipo, todo esto obtenido desde la
              <a 
                href="https://pokeapi.co" 
                target="_blank"
                className="text-teal-500 hover:text-teal-600 font-semibold ml-1"
              >
                PokeAPI&nbsp;
              </a>
              Permite explorar cada Pokémon con su información detallada, incluyendo altura, peso y tipo.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-teal-600 mb-2"> 
							Tecnologias usadas en este proyecto 
						</h2>

            <ul className="list-disc list-inside text-gray-600">
              <li>Next.js</li>
              <li>React</li>
              <li>Taildwind CSS</li>
              <li>APokéAPI (API)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-teal-600 mb-2"> 
							Funciones de la app 
						</h2>

            <ul className="list-disc list-inside text-gray-600">
              <li>Busqueda de pokemon</li>
              <li>Paginación para explorar toda la primera generacion</li>
              <li>Interfaz minimalista</li>
            </ul>
          </section>
        </div>

        <div className="mt-10 text-center">
          <a
            href="/pokemones"
            className="inline-block bg-teal-500 hover:bg-teal-400 text-white font-semibold py-3 px-8 rounded-full transition duration-200 shadow-md"
          >
            Volver a la Pokedex
          </a>
        </div>
      </div>

			<footer className="mt-12 bg-white shadow-xl rounded-2xl p-8 w-full max-w-3xl mx-auto text-teal-700 text-sm">
				<div className="flex flex-col md:flex-row items-center justify-between gap-6">
					
					<div className="text-left space-y-2">
						<p>
							Desarrollado por <b> Yubini Emanuel Pérez Oajaca </b> · 12/11/2025
						</p>

						<p>
							Correo electrónico <b> yperez-2025@kinal.edu.gt </b>
						</p>

						<p className="flex items-center">
							Mi repositorio en GitHub&nbsp;
							<b>
								<a 
									href="https://github.com/Yume-e/pokedex-first-gen.git"
									target="_blank"
									className="text-teal-700 flex items-center gap-2 hover:underline"
								>
									pokedex-first-gen
									<FaGithub className="text-lg" />
								</a>
							</b>
						</p>
					</div>

					<div className="flex justify-center md:justify-end">
						<Image
							src="/images/Yume-e.jpg"
							alt="Foto de Yubini Pérez"
							width={150}
							height={150}
							className="rounded-2xl"
						/>
					</div>
				</div>
			</footer>

    </div>
  );
}
