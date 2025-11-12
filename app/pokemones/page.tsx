"use client";

import { useState, useEffect } from "react";
import { BsSearch } from "react-icons/bs";

export default function Home() {

  //aqui defino los tipos de datos de un poke
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

  const [pokemonData, setPokemonData] = useState<any[]>([]) //lista de pokemon
  const BASE_URL = 'https://pokeapi.co/api/v2/pokemon?limit=151'//Se define la URL base
  const [filtred, setFiltred] = useState(false);//busqueda de pokemon
  
  //paginacion de la pagina
  const [page, setPage] = useState(0);
  const pokesPerPage = 21; //21 pokemones por cada pagina

  const [currentPokemon, setCurrentPokemon] = useState<PokemonData>({
    //current: actual pokemon
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
   * funcion para obtener los datos de la API 
   * y pokemones
   */
  async function getPokes() {
    const response = await fetch(`${BASE_URL}`)//llama a la API
    const data = await response.json()

    let list: any[] = [];
    if (Array.isArray(data.results)) {

      data.results.forEach((e: any) => {
        list.push({
          name: e.name,
          url: e.url
        })
      })

    }
    setPokemonData(list);//lo guarda en el metodo "setPokemonData"
  }

  /**
   * el useEffect se ejecutara al inicio de la app
   */
  useEffect(() => {
    getPokes().then((e) => {//lllama a getPoks para traer a los pokemon
    })
  }, [])

  /**
   * zzzzz
   */
  const [query, setQuery] = useState("");
  //query: consulta
  useEffect(() => {
    if (query !== "") {//si la consulta es diferente devuelve true
      setFiltred(true);
    } else {
      setFiltred(false);//si la consulta no es diferente devuelve false
    }
  }, [query])

  return (
    <div className='bg-emerald-100 shadow-xl py-4 mb-8'>


        <h1 className='text-teal-600 text-3xl font-bold text-center'>
          Pokedex de Kanto
        </h1>


      <div className='m-8 flex flex-col max-w-lg mx-auto'>
        <form className='relative w-full flex items-center bg-white rounded-full shadow-md border border-gray-200 focus-within:ring-2 focus-within:ring-emerald-400 transition duration-200'
          onSubmit={(e) => e.preventDefault()} 
        >
          <BsSearch className='text-gray-500 text-lg absolute left-4' />
          <input
            type="text"
            className='w-full pl-10 pr-4 py-3 text-gray-700 rounded-full focus:outline-none'
            onChange={(e) => setQuery(e.currentTarget.value)}
            placeholder='Buscar pokemon...'
          />
        </form>
      </div>

      <div className='px-4'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {pokemonData
            .slice(page * pokesPerPage, (page + 1) * pokesPerPage)
            .map((pokemon) => {

              if (!filtred) {
                return (
                  <button 
                    className="border p-4 rounded-2xl bg-white text-gray-900 shadow-md hover:shadow-lg hover:bg-emerald-50 transition duration-200 ease-in-out"
                    key={pokemon.name}
                    onClick={() => console.log(pokemon.name)}
                  >
                    <label>{pokemon.name}</label>
                  </button>
                )
              } else {
                if (String(pokemon.name).includes(query)) {
                  return (
                    <button 
                      className="border p-4 rounded-2xl bg-white text-gray-900 shadow-md hover:shadow-lg hover:bg-emerald-50 transition duration-200 ease-in-out"
                      key={pokemon.name}
                      onClick={() => console.log(pokemon.name)}
                    >
                      <label>{pokemon.name}</label>
                    </button>
                  )
                }
              }
            })
          }
        </div>

        <div className="flex justify-center gap-4 my-8">
          <button 
            className='bg-teal-600 text-white font-semibold py-2 px-4 rounded-lg'
            onClick={() => setPage(page > 0 ? page - 1 : 0)}
          >
            Anterior   
          </button>

          <span className="text-black"> Página ({page + 1}) de 8</span>

          <button 
            className='bg-teal-600 text-white font-semibold py-2 px-4 rounded-lg'
            onClick={() => setPage(page + 1)}
          > 
            Siguiente 
          </button>
        </div>

      </div>
    </div>
  );
}
