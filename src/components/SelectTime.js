import React from 'react';
import { Link } from 'react-router-dom';

const SelectTime = (props) => {
  return (
    <section className="center vertical">
      <h1 className="section-select">Select your Time (minutes)</h1>
      <div className="section-options">
        <Link to={`/${props.game}/1`}><button>1</button></Link>
        <Link to={`/${props.game}/3`}><button>3</button></Link>
        <Link to={`/${props.game}/5`}><button>5</button></Link>
      </div>
    </section>
  );
};

export default SelectTime;
