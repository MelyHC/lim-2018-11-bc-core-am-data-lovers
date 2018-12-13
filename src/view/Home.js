import React, { Fragment } from 'react';
import CardPokemon from '../component/CardPokemon';

const Home = ({ pokemons, updatePokemon, filterOption, order }) => {
  const arrTypes = ['Grass', 'Poison', 'Fire', 'Flying', 'Water', 'Bug', 'Normal', 'Electric', 'Ground', 'Fighting', 'Psychic', 'Rock', 'Ice', 'Ghost', 'Dragon']

  if (pokemons.length) {
    return (
      <Fragment>
        <header className="bg-primary text-white">
          <h1 className="mb-2 mb-md-3 pl-2">Pokedex</h1>
        </header>
        <div className="row m-0 pt-6">
          {
            pokemons.map(({ id, name, img }) =>
              <CardPokemon key={id} name={name} img={img} updatePokemon={updatePokemon} />
            )}
        </div>
        <div className="btn-group dropup">
          <button className="fas fa-filter fixed-bottom m-2 m-md-3 p-3 icon bg-primary text-white text-right rounded-circle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
          <form className="dropdown-menu" onClick={filterOption}>
            <button className="dropdown-item" type="button" name="name" arial-label="Ordenar por nombre">Nombre</button>
            <button className="dropdown-item" type="button" name="num" arial-label="Ordenar por número en la pokedex">N° en la pokedex</button>
            <button className="dropdown-item" type="button" name="order" value={order} arial-label="Orden"><i className="fas fa-exchange-alt arrow-orientation"></i> {order}</button>
            <hr className="dropdown-divider" />
            <span className="dropdown-item">Tipo:</span>
            <div className="px-3 py-1">
              {arrTypes.map(type => <button className={`btn badge badge-pill badge-${type} badge-size text-white mx-1`} value={`${type}`} name="type" key={type}>{type}</button>)}
            </div>
          </form>
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