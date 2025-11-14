"use client";

// Importación de hooks y utilidades necesarias
import { useState, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import Link from "next/link";

export default function Home() {

  // Definición del tipo de datos para un Pokémon
  type PokemonData = {
    name: string;
    id: number;
    height: number;
    weight: number;
    base_experience: number;
    sprites: {
      front_default: string;
      front_shiny: string;
    };
    types: string[];
  }

  // Estado que almacena la lista completa de pokémon
  const [pokemonData, setPokemonData] = useState<any[]>([])

  // URL base para obtener los primeros 151 pokémon
  const BASE_URL = 'https://pokeapi.co/api/v2/pokemon?limit=151'

  // Estado que indica si se está filtrando por búsqueda
  const [filtred, setFiltred] = useState(false);
  
  // Manejo de paginación
  const [page, setPage] = useState(0);
  const pokesPerPage = 21; // Cantidad de pokémon por página

  // Estado que almacenará el Pokémon actualmente seleccionado
  const [currentPokemon, setCurrentPokemon] = useState<PokemonData>({
    name: "",
    base_experience: 0,
    height: 0,
    id: 0,
    sprites: {
      front_default: "string",
      front_shiny: "",
    },
    weight: 10,
    types: []
  });

  /**
   * Función para obtener la lista de pokémon desde la API
   */
  async function getPokes() {
    const response = await fetch(`${BASE_URL}`) // Llamada a la API
    const data = await response.json()

    let list: any[] = [];

    // Verifica que "results" sea un arreglo antes de procesarlo
    if (Array.isArray(data.results)) {

      // Recorre los resultados y guarda nombre y URL
      data.results.forEach((e: any) => {
        list.push({
          name: e.name,
          url: e.url
        })
      })

    }

    // Se almacena la lista en el estado principal
  setPokemonData(list);
  }

  /**
   * useEffect que se ejecuta solo una vez al cargar la app
   * Llama a getPokes para traer la lista inicial
   */
  useEffect(() => {
    getPokes().then(() => {})
  }, [])

  /**
   * Estado para controlar la barra de búsqueda
   */
  const [query, setQuery] = useState("");

  // Detecta cuando "query" cambia y activa o desactiva el filtro
  useEffect(() => {
    if (query !== "") {
      setFiltred(true);
    } else {
      setFiltred(false);
    }
  }, [query])

  return (
    <div className='bg-emerald-100 shadow-xl py-4 mb-8 '>

      {/* Título principal de la Pokedex */}
      <h1 className='text-teal-600 text-3xl font-bold text-center'>
        Pokedex de Kanto
      </h1>

      {/* Barra de búsqueda */}
      <div className='m-8 flex flex-col max-w-3xl mx-auto'>
        <form 
          className='relative w-full flex items-center border-gray-200 bg-white rounded-full 
          shadow-md border focus-within:ring-2 focus-within:ring-emerald-400 transition duration-200'
          onSubmit={(e) => e.preventDefault()}
        >
          <BsSearch className='text-gray-500 text-lg absolute left-3' />

          <input
            type="text"
            className='w-full pl-10 pr-4 py-3 text-gray-700 rounded-full focus:outline-none'
            onChange={(e) => setQuery(e.currentTarget.value)}
            placeholder='Buscar pokemon...'
          />
        </form>
      </div>

      {/* Contenedor de tarjetas de Pokémon */}
      <div className='px-4'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10'>

          {pokemonData
            // División de la data según la página actual
            .slice(page * pokesPerPage, (page + 1) * pokesPerPage)
            .map((pokemon) => {

              // Si NO se está filtrando, muestra todos los Pokémon de la página
              if (!filtred) {
                return (
                  <Link 
                    href={`/pokemones/${pokemon.name}`}
                    className="p-4 py-6 rounded-2xl bg-white text-black shadow-md 
                    hover:shadow-lg transition duration-200 hover:scale-104 active:scale-110"
                    key={pokemon.name}
                  >
                    <label>{pokemon.name}</label>
                  </Link>
                )
              } else {

                // Si se está filtrando, compara el nombre con lo buscado
                if (String(pokemon.name).includes(query)) {
                  return (
                    <Link 
                      href={`/pokemon/${pokemon.name}`}
                      className="p-4 py-6 rounded-2xl bg-white text-black shadow-md
                      hover:shadow-lg transition duration-200 hover:scale-104 active:scale-110"
                      key={pokemon.name}
                    >
                      <label>{pokemon.name}</label>
                    </Link>
                  )
                }
              }

            })
          }

        </div>

        {/* Controles de paginación */}
        <div className="flex justify-center gap-4 my-8">

          {/* Botón atrás */}
          <button 
            className='bg-teal-400 text-white font-semibold py-2 px-4 rounded-lg hover:shadow-lg transition duration-200 hover:scale-104 active:scale-110'
            onClick={() => setPage(page > 0 ? page - 1 : 0)}
          >
            Anterior   
          </button>

          {/* Número de página actual */}
          <span className="text-black"> Página ({page + 1}) de 8</span>

          {/* Botón siguiente */}
          <button 
            className='bg-teal-400 text-white font-semibold py-2 px-4 rounded-lg hover:shadow-lg transition duration-200 hover:scale-104 active:scale-110'
            onClick={() => setPage(page + 1)}
          > 
            Siguiente 
          </button>

        </div>

      </div>

      {/* Footer de la página */}
      <footer className="bg-teal-700 text-white mt-12 pt-6 pb-24 ">
        <div className="max-w-4xl mx-auto text-center px-4">

          {/* Nombre del desarrollador */}
          <h2 className="text-xl font-semibold mb-2">
            Desarrollado por Yubini Emanuel Pérez Oajaca
          </h2>

          <p className="text-sm text-teal-100 mb-4">
            Proyecto creado con Next.js + Tailwind CSS · Pokedex de Kanto
          </p>

          {/* Botón para ir a la documentación */}
          <Link href="/pokemones/documentation"
            className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-400 text-white font-semibold py-2 px-6 rounded-full transition duration-200 shadow-md"
          >
            Contactame
            <FaArrowUpRightFromSquare className="text-white text-lg " />
          </Link>
        </div>
      </footer>

    </div>
  );
}
