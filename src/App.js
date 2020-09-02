import React, { Component } from 'react';
import './App.css';
import pokemon from './data/pokemon/pokemon.json';
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom';
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
    },
    allPokemons: []
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

  viewTopPage = () => window.scroll(0, 0);

  filterOption = (e) => {
    const { pokemons, option: { order, kind, orderBy }, allPokemons } = this.state;
    e.preventDefault();

    let sortedPokemon = pokemons.sort((a, b) =>
      e.target.name === 'name' ? a.name.localeCompare(b.name)
        : e.target.name === 'num' ? parseFloat(a.num) - parseFloat(b.num)
          : null
    );

    if (e.target.name === 'type') {

      if (kind.find(typePoke => typePoke === e.target.value))
        kind.map((typePoke, i) => typePoke === e.target.value ?
          kind.splice(i, 1) : null);
      else kind.splice(0, 1, e.target.value);

      let countFilterPoke = [];

      if (kind.length !== 0) {
        countFilterPoke = allPokemons.filter(({ type }) => type.toString().includes(kind.toString()))
      }
      sortedPokemon = countFilterPoke.length !== 0 ? countFilterPoke : allPokemons;
    }

    if (e.target.name === 'order' || order === 'DESC') sortedPokemon.reverse();

    this.setState({
      pokemons: sortedPokemon,
      option: {
        orderBy: e.target.name === 'name' || e.target.name === 'num' ? e.target.name : orderBy,
        order: e.target.name === 'order' ? e.target.value === 'DESC' ? 'ASC' : 'DESC' : order,
        kind
      }
    })
  }

  componentDidMount() {

    const pathName = this.props.location.pathname;
    const numPokemon = pathName.split('/')[2];
    if (numPokemon) this.updateCurrentPokemon(numPokemon);

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

    this.setState({
      pokemons: dataPokemon,
      allPokemons: dataPokemon
    })
  }

  render() {
    const { pokemons, currentPokemon, option: { order }, allPokemons } = this.state;

    return (
      <Router basename='lim-2018-11-bc-core-am-data-lovers'>
        <Switch>
          <Route
            path='/'
            exact
            render={() => <Home pokemons={pokemons} updatePokemon={this.updateCurrentPokemon} filterOption={this.filterOption} order={order} topPage={this.viewTopPage} />}
          />
          <Route
            path={`/${currentPokemon}`}
            exact
            render={() => <Pokemon pokemons={allPokemons} pokeActual={currentPokemon} updatePokemon={this.updateCurrentPokemon} topPage={this.viewTopPage} />}
          />
        </Switch>
      </Router>
    );
  }
}

export default withRouter(App);
