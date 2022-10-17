document.querySelector('.btn').addEventListener('click', getPokemon)

function getPokemon() {
    const img = document.querySelector('img');
    const pokeID = document.querySelector('.pokeID');
    const h3 = document.querySelector('h3');
    const rightScreen = document.querySelector('.rightScreenMain');
    const leftScreen = document.querySelector('.mainScreen');
    const choice = document.querySelector('input').value.toLowerCase();
    console.log(choice);
    const enterName = document.querySelector('.enterName')
    const msg = new SpeechSynthesisUtterance();
    const voices = window.speechSynthesis.getVoices();
    msg.voice = voices[5];
    msg.volume = 1; // From 0 to 1
    msg.rate = 0.5; // From 0.1 to 10
    msg.lang = 'en'
    msg.pitch = 0; // From 0 to 2

    fetch(`https://pokeapi.co/api/v2/pokemon/${choice}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            console.log(data.id);
            console.log(img);
            img.src = data.sprites.front_default;
            h3.innerHTML = `Name: ${data.name}<br><br>Type: ${data.types.map(x => x.type.name)}<br><br>Abilities: ${data.abilities.map((x) => x.ability.name)}<br><br>Stats: ${data.stats.map(x => x.stat.name + ':' + x.base_stat) + ' '}`;
            rightScreen.style.background = "rgb(157,157,157)";
            leftScreen.style.background = "rgb(0,219,255)";
            pokeID.innerHTML = `#${data.id}`;
            enterName.innerHTML = "Enter another Pokemon name! Less go.";
            img.style.height = '240px';
            img.style.width = 'auto';
            img.style.marginTop = "0";
            msg.text = `${data.name}... a ${data.types.map(x => x.type.name)} type Pokemon. ID number ${data.id}. Abilities include ${data.abilities.map((x) => x.ability.name)}`;
            speechSynthesis.speak(msg);
        })
        .catch(err => {
            console.log(`Error:${err}`);
            enterName.innerHTML = "That's not a pokemon name! Try again.";
            img.src = 'images/ghastly.png';
            img.style.height = 'auto';
            img.style.width = '390px';
            img.style.marginTop = "15px";
            pokeID.innerHTML = 'BOOOO'

        })
}