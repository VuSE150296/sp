import React from "react";
// import { Container, Card, Button } from 'react-materialize'
// import '../css/ModalCase.css'

export function ModalCase({ setIsOpen, film}){
    return (
        <div className="modal-show" onClick={() => { setIsOpen(false)}}>
            <div id='modal' className="modal" style={{display: 'block', top: '10%'}}>
            <div className="modal-content">
            <h1> Trailer for {film.title}
            </h1>
            <p><iframe width="100%" height="80%" src={film.clip} title={film.tile} frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </p>
            </div>
                <span className="modal-close">&#10006;</span>           
            </div>
        </div>
    )
}