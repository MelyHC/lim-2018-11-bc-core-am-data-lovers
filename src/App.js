import React, { Component } from 'react';
import './App.css';
import pokemon from './data/pokemon/pokemon.json';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './view/Home';
import Pokemon from './view/Pokemon';

class App extends Component {
  state = {
    pokemons: [],
    currentPokemon: '',
  }

  evolutionsPokemon = (evolution, arrActual, arrEvolution) =>
    evolution.map(obj => {
      arrActual.forEach(objPoke => {
        if (obj.num === objPoke.num) {
          obj.img = objPoke.img
        }
      });
      return arrEvolution.push(obj);
    });

  updateCurrentPokemon = (name) => this.setState({ currentPokemon: name });

  componentWillMount() {
    const arrPokemons = Object.values(pokemon.pokemon);
    const dataPokemon = arrPokemons.map(poke => {
      const evolutions = [];

      if (poke.hasOwnProperty('prev_evolution')) {
        const prevEvo = poke['prev_evolution'];
        this.evolutionsPokemon(prevEvo, arrPokemons, evolutions);
      };

      if (poke.hasOwnProperty('next_evolution')) {
        const nextEvo = poke['next_evolution'];
        this.evolutionsPokemon(nextEvo, arrPokemons, evolutions);
      };

      const dataActual = {
        name: poke.name,
        num: poke.num,
        img: poke.img
      };

      evolutions.push(dataActual);
      evolutions.sort((a, b) => parseFloat(a.num) - parseFloat(b.num))

      const dataPoke = {
        name: poke.name,
        num: poke.num,
        img: poke.img,
        id: poke.id,
        candy: poke.candy,
        type: poke.type,
        weaknesses: poke.weaknesses,
        evolutions
      };

      if (poke.hasOwnProperty('candy_count')) dataPoke.candyCount = poke['candy_count'];
      return dataPoke;
    })

    this.setState({ pokemons: dataPokemon })
    // console.log(dataPokemon)
  }

  render() {
    const { pokemons, currentPokemon } = this.state;
    
    return (
      <Router>
        <Switch>
          <Route
            path='/lim-2018-11-bc-core-am-data-lovers'
            exact
            render={() => <Home pokemons={pokemons} updatePokemon={this.updateCurrentPokemon} />}
          />
          <Route
            path={`/${currentPokemon}`}
            exact
            render={() => <Pokemon pokemons={pokemons} pokeActual={currentPokemon} />}
          />
        </Switch>
      </Router>
    );
  }
}

export default App;
