/**
 *  Divyanshu Maurya
 *  github: @divyanshu1610
 */

const PokemonAPI = (function pokemonHandler() {
  let timeout = null;
  async function fetchDetails(val) {
    clearTimeout(timeout);
//     timeout && console.log(`Timeout Cleared: ${timeout}`);
    timeout = setTimeout(async () => {
      timeout = null;
//       console.log(`ID: ${val} Fetching started`);
      reset();
      if (val === 0 || val > 1118) return;
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${val}`);
      if (res.status === 404) return clearTimeout(this.timeout);
      const { name, id } = await res.json();
      const imgEle = document.getElementById('pokemonImage');
      const nameEle = document.getElementById('pokemonName');

      imgEle.src = `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/other/official-artwork/${id}.png?raw=true`;
      nameEle.innerText = name;
      document.getElementById('placeholder').classList.remove('placeholder');
    }, 800);
//     console.log(`Timeout Created: ${timeout}`);
  }
  return { fetchDetails };
})();

function reset() {
  document.getElementById('placeholder').classList.add('placeholder');
  document.getElementById('pokemonImage').src = '';
  document.getElementById('pokemonName').innerText = '';
}

function handleInput(e) {
  const val = +e.target.value;
  PokemonAPI.fetchDetails(val);
}

window.addEventListener('load', () => {
  const inp = document.getElementById('inputPokemonId');
  inp.oninput = handleInput;
});
