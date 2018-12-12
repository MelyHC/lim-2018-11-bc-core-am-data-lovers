import React, { Fragment } from 'react';
// import { Link } from 'react-router-dom';
import CardPokemon from '../component/CardPokemon';

const Home = ({ pokemons }) => {
  if (pokemons.length) {
    return (
      <Fragment>
        <header className="bg-danger text-white">
          <h1 className="mb-2 mb-md-3 pl-2">Pokedex</h1>
        </header>
        <div className="row m-0 bg-light">
          {
            pokemons.map(({ id, name, img, num }) =>
              <CardPokemon key={id} name={name} img={img} num={num} />
            )}
        </div>
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