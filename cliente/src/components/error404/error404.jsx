import React from 'react'
import errorImg from '../../assets/error404.png'
import './error404.css'
import { useNavigate } from 'react-router-dom';

const Error404 = () => {
  const navigate = useNavigate();
    return (
      <div className='container'>
          <img id='err404' src={errorImg} alt='error404'/>
          <p className='parrafo'>!Lo sentimos, la página que buscas no fue encontrada.¡</p>
          <button onClick={() => navigate(-1)} >REGRESAR</button>
      </div>
    )
}

export default Error404
