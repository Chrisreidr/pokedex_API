document.querySelector('.btn').addEventListener('click', getPokemon)

function getPokemon() {
    const img = document.querySelector('img');
    const h3 = document.querySelector('h3');
    const rightScreen = document.querySelector('.rightScreenMain');
    const leftScreen = document.querySelector('.mainScreen');
    const choice = document.querySelector('input').value.toLowerCase();
    console.log(choice);

    fetch(`https://pokeapi.co/api/v2/pokemon/${choice}`)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        img.src = data.sprites.front_default;
        h3.innerHTML = `Name: ${data.name}<br><br>Type: ${data.types.map(x => x.type.name)}<br><br>Abilities: ${data.abilities.map((x) => x.ability.name)}<br><br>Stats: ${data.stats.map(x => x.stat.name + ':' + x.base_stat) + ' '}`;
        rightScreen.style.background = "rgb(157,157,157)";
        leftScreen.style.background = "rgb(0,219,255)"
    })
    .catch(err => {
        console.log(`Error:${err}`);
    })
}