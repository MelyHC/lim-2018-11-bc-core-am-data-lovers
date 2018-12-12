import React, { Fragment } from 'react';
import CardPokemon from '../component/CardPokemon';

const Home = ({ pokemons, updatePokemon }) => {
  if (pokemons.length) {
    return (
      <Fragment>
        <header className="bg-danger text-white">
          <h1 className="mb-2 mb-md-3 pl-2">Pokedex</h1>
        </header>
        <div className="row m-0 pt-6">
          {
            pokemons.map(({ id, name, img }) =>
              <CardPokemon key={id} name={name} img={img} updatePokemon={updatePokemon} />
            )}
        </div>
        <i className="fas fa-filter fixed-bottom fixed-end m-2 m-md-3 p-3 icon bg-primary w-auto text-white text-right rounded-circle"></i>
      </Fragment>
    )
  } else {
    return (
      <div className="bg-danger view-all d-flex justify-content-center align-items-center text-white">
        <span className="mr-2">Cargando pokemons</span><i className="fas fa-spinner loading"></i>
      </div>
    )
  }
}

export default Home;