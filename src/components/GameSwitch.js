import React, { useState } from 'react';
import { withRouter } from 'react-router';
import BackButton from './BackButton.js';
import '../styles/GameSwitch.css';
import '../styles/Carousel.css';
import switchSets from '../data/SwitchSets.js';

const GameSwitch = (props) => {
  const [currentSet, setCurrentSet] = useState(0);
  const [currentSetOnSwitches, setCurrentSetOnSwitches] = useState(0);
  const startTime = new Date();
  const totalSets = props.time;

  const endGame = () => {
    const totalTime = new Date().valueOf() - startTime.valueOf();
    props.completedGame(totalTime);
    props.history.push('/');
  };

  const onCheckboxChange = (event) => {
    if (event.target.checked) {
      setCurrentSetOnSwitches((prevCount) => prevCount + 1);
    } else {
      setCurrentSetOnSwitches((prevCount) => prevCount - 1);
    }

    if (currentSetOnSwitches + 1 === switchSets[currentSet].switchCount) {
      if (currentSet === totalSets - 1) {
        endGame();
      }
      setCurrentSet((prevSet) => prevSet + 1);
      setCurrentSetOnSwitches(0);
    }
  };

  const renderSwitches = (set, amount) => {
    const switches = [];
    for (let i = 0; i < amount; i++) {
      const id = `switch-${set}-${i}`;
      switches.push(
        <div className="switch" key={id}>
          <input id={id} className="input" type="checkbox" onChange={onCheckboxChange} />
          <label htmlFor={id} className="slider"></label>
        </div>
      );
    }
    return switches;
  };

  const renderSets = () => {
    const sets = [];
    for (let i = 0; i < totalSets; i++) {
      const active = currentSet === i;
      const switches = renderSwitches(i, switchSets[i].switchCount);
      const id = `set-${i}`;
      let className = "item";
      if (active) {
        className += " active";
      }
      sets.push(
        <div key={id} id={id} className={className}>
          <div className="center">
            <div className="item-contents switch-box">
              {switches}
            </div>
          </div>
        </div>
      );
    }
    return sets;
  };

  const sets = renderSets();
  let moveUnit = 60;
  if (window.innerWidth < 700) {
    moveUnit = 85;
  }
  const carouselStyles = {
    width: `${totalSets * 100}vw`,
    transform: `translateX(-${currentSet * moveUnit}vw)`
  };

  return (
    <div>
      <BackButton endGame={endGame} />
      <section className="carousel-container">
        <div className="carousel" style={carouselStyles}>
          {sets}
        </div>
      </section>
    </div>
  );
};

export default withRouter(GameSwitch);
