import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const Pokemon = ({ pokemons, pokeActual }) => {
  const pokemon = pokemons.filter(objPoke => objPoke.name === pokeActual)[0];

  return (
    <Fragment>
      <Link to="/lim-2018-11-bc-core-am-data-lovers" className="fas fa-angle-left arrow position-fixed text-primary m-2 ml-md-4 px-2 py-1"></Link>
      <h2 className="text-center">{pokemon.name}</h2>
      <section className="row m-0">
        <figure className="col-md-6 d-flex justify-content-center align-items-center">
          <img src={pokemon.img} alt={pokemon.name} className="img-fluid img-poke" />
        </figure>
        <div className="col-md-6 text-center text-md-left">
          <article className="mb-2">
            <h5>Número en la pokedex:</h5>
            <span className="text-size"> # {pokemon.num}</span>
          </article>
          <article className="mb-2">
            <h5>Tipo:</h5>
            {pokemon.type.map(strType => <span className={`badge badge-pill badge-${strType} text-white text-size mx-1`} key={strType}>{strType}</span>)}
          </article>
          <article className="mb-2">
            <h5>Nombre de caramelos:</h5>
            <span className="text-size">{pokemon.candy}</span>
          </article>
          {
            pokemon.hasOwnProperty('candyCount') ?
              <article className="mb-2">
                <h5>Caramelos para evolucionar:</h5>
                <span className="text-size">{pokemon.candyCount}</span>
              </article>
              : null
          }
          <article className="mb-1">
            <h5>Debilidades:</h5>
            {pokemon.weaknesses.map(strWeakness => <span className={`badge badge-pill badge-${strWeakness} text-white text-size mx-1`} key={strWeakness}>{strWeakness} </span>)}
          </article>
        </div>
      </section>
      <hr className="w-75 bg-primary" />
      <section className="text-center">
        <h6>Evoluciones</h6>
        <div className="row m-0">
          {
            pokemon.evolutions.map(({ img, name, num }) =>
              <div className="col" key={name}>
                <img src={img} alt={name} />
                <h6>{name}</h6>
                <span># {num}</span>
              </div>
            )
          }
        </div>
      </section>
    </Fragment>
  )
}

export default Pokemon;