import React, { Fragment } from 'react';
import CardPokemon from '../component/CardPokemon';

const Home = ({ pokemons, updatePokemon, filterOption, order, topPage }) => {
  const arrTypes = ['Grass', 'Poison', 'Fire', 'Normal', 'Water', 'Ghost', 'Ground', 'Bug', 'Electric', 'Steel', 'Fighting', 'Ice', 'Psychic', 'Rock', 'Flying', 'Fairy', 'Dragon']

  return (
    <Fragment>
      <header className="bg-primary text-white d-flex justify-content-between align-items-center fixed-top">
        <h1 className="pl-2">Pokedex</h1>
        <div className="dropdown">
          <button className="btn btn-primary mr-2 p-2 text-right rounded-circle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i className="fas fa-filter icon" />
          </button>
          <div className="dropdown-menu dropdown-menu-right border-dark p-0" onClick={filterOption}>
            <button className="dropdown-item" type="button" name="name" arial-label="Ordenar por nombre">Nombre</button>
            <button className="dropdown-item" type="button" name="num" arial-label="Ordenar por número en la pokedex">N° en la pokedex</button>
            <button className="dropdown-item" type="button" name="order" value={order} arial-label="Orden"><i className="fas fa-exchange-alt arrow-orientation"></i> {order}</button>
            <hr className="dropdown-divider border-dark" />
            <span className="dropdown-item py-0">Tipo:</span>
            <div className="px-3 pb-2">
              {arrTypes.map(type => <button className={`btn badge badge-pill badge-${type} badge-size text-white mx-1 mb-1`} value={`${type}`} name="type" key={type}>{type}</button>)}
            </div>
          </div>
        </div>
      </header>
      <div className="row m-0 pt-5 mt-3 mt-md-4">
        {
          pokemons.length ?
            pokemons.map(({ id, name, img, num }) =>
              <CardPokemon key={id} name={name} img={img} updatePokemon={updatePokemon} num={num} topPage={topPage} />
            )
            : <div className="text-md">
              <span className="mr-2">Cargando pokemons</span><i className="fas fa-spinner fa-pulse"></i>
            </div>
        }
      </div>
    </Fragment>
  )

}

export default Home;