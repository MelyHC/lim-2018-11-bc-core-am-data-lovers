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
    option: {
      order: 'ASC',
      kind: [],
      orderBy: 'num'
    }
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

  filterOption = (e) => {
    const { pokemons, option: { order, kind, orderBy } } = this.state;
    e.preventDefault();

    const sortPokemon = pokemons.sort((a, b) =>
      e.target.name === 'name' ? a.name.localeCompare(b.name)
        : e.target.name === 'num' ? parseFloat(a.num) - parseFloat(b.num)
          : null
    );

    if (e.target.name === 'type') {

      if (kind.find(typePoke => typePoke === e.target.value))
        kind.map((typePoke, i) => typePoke === e.target.value ?
          kind.splice(i, 1) : null);
      else kind.push(e.target.value);

      console.log(kind, e.target.value, sortPokemon)

      if (kind.length !== 0) {
        sortPokemon.filter(objPoke => {
          const countFilterPoke = [];

          objPoke.type.forEach(typePoke =>
            kind.forEach(kindPoke => typePoke === kindPoke ?
              countFilterPoke.push(objPoke) : null
            )
          )
          console.log(countFilterPoke)
          return countFilterPoke.length !== 0 ? countFilterPoke : objPoke;
        })
      }
    }

    if (e.target.name === 'order' || order === 'DESC') sortPokemon.reverse();

    this.setState({
      pokemons,
      option: {
        orderBy: e.target.name === 'name' || e.target.name === 'num' ? e.target.name : orderBy,
        order: e.target.name === 'order' ? e.target.value === 'DESC' ? 'ASC' : 'DESC' : order,
        kind
      }
    })
    // const filterPokemon = sortPokemon.filter
    console.log(e.target.name)
    console.log(sortPokemon)
  }

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

      evolutions.push(dataPoke);
      evolutions.sort((a, b) => parseFloat(a.num) - parseFloat(b.num))

      if (poke.hasOwnProperty('candy_count')) dataPoke.candyCount = poke['candy_count'];
      return dataPoke;
    })

    this.setState({ pokemons: dataPokemon })
  }

  render() {
    const { pokemons, currentPokemon, option: { order } } = this.state;

    return (
      <Router>
        <Switch>
          <Route
            path='/lim-2018-11-bc-core-am-data-lovers'
            exact
            render={() => <Home pokemons={pokemons} updatePokemon={this.updateCurrentPokemon} filterOption={this.filterOption} order={order} />}
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
