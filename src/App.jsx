import { useState, useEffect } from 'react'

export default function App() {
  const [paises, setPaises] = useState([]);
  const [favoritos, setFavoritos] = useState([]);
  const [filtro, setFiltro] = useState('todos');
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    fetch('datahttps://restcountries.com/v2/all.json')
      .then((res) => res.json())
      .then((dados) => {
        setPaises(dados.sort(comparar));
      });
  }, []);

  function comparar(a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  }

  function filtrarPais(pais) {
    if (filtro === 'todos') {
      return pais;
    } else if (filtro === pais.region) {
      return pais;
    }
  }

  function favoritarPais(i) {
    const paisFavoritado = paises[i];
    setFavoritos([...favoritos, paisFavoritado]);
    setPaises(paises.filter((_, index) => index !== i));
  }

  function desfavoritarPais(i) {
    const paisDesfavoritado = favoritos[i];
    setPaises([...paises, paisDesfavoritado]);
    setFavoritos(favoritos.filter((_, index) => index !== i));
  }

  function handleFiltroChange(regiao) {
    setFiltro(regiao);
  }

  function handleInputValueChange(event) {
    setInputValue(event.target.value);
  }

  function renderizarTabelaPaises() {
    return (
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Bandeira</th>
            <th className="border p-2">Código</th>
            <th className="border p-2">Nome</th>
            <th className="border p-2">Capital</th>
            <th className="border p-2">População</th>
            <th className="border p-2">Ação</th>
          </tr>
        </thead>
        <tbody>
          {paises.filter(filtrarPais).map((pais, i) => (
            <tr key={i} className="bg-white">
              <td className="border p-2">
                <img
                  className="w-10 h-6 object-contain"
                  src={pais.flags.svg}
                  alt={`${pais.name} Flag`}
                />
              </td>
              <td className="border p-2">{pais.alpha2Code}</td>
              <td className="border p-2">{pais.name}</td>
              <td className="border p-2">{pais.capital}</td>
              <td className="border p-2">{pais.population}</td>
              <td className="border p-2">
                <button
                  className="border rounded p-1 bg-blue-500 text-white"
                  onClick={() => favoritarPais(i)}
                >
                  Favoritar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  function renderizarTabelaFavoritos() {
    return (
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Bandeira</th>
            <th className="border p-2">Código</th>
            <th className="border p-2">Nome</th>
            <th className="border p-2">Capital</th>
            <th className="border p-2">População</th>
            <th className="border p-2">Ação</th>
          </tr>
        </thead>
        <tbody>
          {favoritos.filter(filtrarPais).map((pais, i) => (
            <tr key={i} className="bg-white">
              <td className="border p-2">
                <img
                  className="w-10 h-6 object-contain"
                  src={pais.flags.svg}
                  alt={`${pais.name} Flag`}
                />
              </td>
              <td className="border p-2">{pais.alpha2Code}</td>
              <td className="border p-2">{pais.name}</td>
              <td className="border p-2">{pais.capital}</td>
              <td className="border p-2">{pais.population}</td>
              <td className="border p-2">
                <button
                  className="border rounded p-1 bg-red-500 text-white"
                  onClick={() => desfavoritarPais(i)}
                >
                  Desfavoritar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-4">
          <button
            onClick={() => handleFiltroChange('todos')}
            className={`border rounded p-2 ${
              filtro === 'todos' ? 'bg-blue-500 text-white' : ''
            }`}
          >
            Todos
          </button>
          {/* Botões de filtro adicionais */}
        </div>
        <input
          type="text"
          placeholder="Pesquisar país..."
          className="border p-2 w-full mb-4"
          value={inputValue}
          onChange={handleInputValueChange}
        />
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h2 className="text-lg font-semibold mb-2">Países</h2>
            {renderizarTabelaPaises()}
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2">Favoritos</h2>
            {renderizarTabelaFavoritos()}
          </div>
        </div>
      </div>
    </div>
  );
}
