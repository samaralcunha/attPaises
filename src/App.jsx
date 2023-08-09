import { useState, useEffect } from 'react'

export default function App() {
  const [paises, setPaises] = useState([]);
  const [favoritos, setFavoritos] = useState([]);
  const [filtro, setFiltro] = useState('todos');
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    fetch('https://restcountries.com/v2/all')
      .then((res) => res.json())
      .then((dados) => {
        setPaises(dados.sort(Comparar));
      });
  }, []);

  function Comparar(a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  }

  function Filtrar(pais) {
    if (filtro === 'todos') {
      return pais;
    } else if (filtro === pais.region) {
      return pais;
    }
  }

  function Favoritar(i) {
    const PaisSelecionado = paises[i];
    setFavoritos([...favoritos, PaisSelecionado]);
    setPaises(paises.filter((_, index) => index !== i));
  }

  function Desfavoritar(i) {
    const PaisNselecionado = favoritos[i];
    setPaises([...paises, PaisNselecionado]);
    setFavoritos(favoritos.filter((_, index) => index !== i));
  }

  function GeraTabela(items, populacaoTotal, total, isFavorites) {
    return (
      <>
        <h1 className="text-2xl text-center m-4">
          Total de países: <span>{total}</span>
        </h1>
        <h1 className="text-2xl text-center m-4">
          População Total: <span>{populacaoTotal}</span>
        </h1>
        <table className="w-full">
          <tbody>
            {items
              .filter(Filtrar)
              .filter((pais) =>
                pais.name.toUpperCase().includes(inputValue.toUpperCase())
              )
              .map((pais, i) => (
                <tr key={i}>
                  <td>
                    <img
                      className="aspect-video h-20"
                      src={pais.flags.svg}
                      alt={`Flag of ${pais.name}`}
                    />
                  </td>
                  <td>{pais.alpha2Code}</td>
                  <td>{pais.name}</td>
                  <td>{pais.capital}</td>
                  <td>{pais.population}</td>
                  <td>
                    <button
                      className="rounded p-2 bg-[#0a9396]"
                      onClick={() => (isFavorites ? Desfavoritar(i) : Favoritar(i))}
                    >
                      {isFavorites ? 'Desfavoritar' : 'Favoritar'}
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </>
    );
  }

  const populacaoTotal = paises.reduce((a, b) => a + b.population, 0);
  const totalPaises = paises.length;
  const populacaoFavoritos = favoritos.reduce((a, b) => a + b.population, 0);
  const totalFavoritos = favoritos.length;

  return (
    <div className="grid grid-cols-2 grid-rows-[auto_auto_1fr] gap-4 p-4 bg-[#005f73]">
      <fieldset
        id="fieldset"
        className="w-full p-2 flex justify-between row-start-1 row-end-2 col-start-1 col-end-3"
      >
        {/* Radio buttons for filtering */}
      </fieldset>
      <div className="w-full row-start-2 row-end-3 col-start-1 col-end-3">
        <input
          className="w-full p-2 rounded bg-[#90e0ef]"
          type="text"
          id="input"
          placeholder="Digite um país"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>
      <div className="w-full row-start-3 row-end-4 col-start-1 col-end-2">
        {GeraTabela(paises, populacaoTotal, totalPaises, false)}
      </div>
      <div className="w-full row-start-3 row-end-4 col-start-2 col-end-3">
        {GeraTabela(favoritos, populacaoFavoritos, totalFavoritos, true)}
      </div>
    </div>
  );
}
