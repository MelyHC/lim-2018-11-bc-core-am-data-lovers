import React, { Component, Fragment } from 'react';
import './App.css';
import Pokemon from './data/pokemon/pokemon.json';
import CardPokemon from './component/CardPokemon'

class App extends Component {
  state = {
    pokemons: [],
    currentPokemon: 0
  }

  render() {
    const { pokemons, currentPokemon } = this.state;
    return (
      <Fragment>
        {pokemons.lenght ?
          <CardPokemon />
          : <i className="fas fa-spinner"></i>}
      </Fragment>
    );
  }
}

export default App;
