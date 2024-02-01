import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Intro.css';

const Intro = () => {
  return (
    <header className="center intro-component">
      <div className="zen-zone-intro">
        <h1>Welcome to The Fun Zone.</h1>
        <p>A minimalistic meditation area designed to calm you down via the power of small, captivating, mildly amusing and oddly satisfying activities. Feel the Funn!</p>
        <Link to="/games">
          <button>Let's get started</button>
        </Link>
      </div>
    </header>
  );
}

export default Intro
