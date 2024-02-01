import React, { useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { BrowserRouter as Router, Switch, Route, useLocation } from 'react-router-dom';

import Game from './components/Game.js';
import Intro from './components/Intro.js';
import SelectGame from './components/SelectGame.js';
import SelectTime from './components/SelectTime.js';
import Reflection from './components/Reflection.js';

const App = () => {
  const [currentPage, setCurrentPage] = useState('intro');
  const [totalTime, setTotalTime] = useState(0); //milliseconds

  const completedGame = (time) => {
    setTotalTime(totalTime + time);
    setCurrentPage('reflection');
  };

  const location = useLocation();

  return (
    <Router>
      <div className="app">
        <TransitionGroup>
          <CSSTransition
            key={location.key}
            classNames="fade"
            timeout={{ enter: 800, exit: 400 }}
          >
            <Switch location={location}>
              <Route
                exact
                path="/"
                render={() =>
                  currentPage === 'intro' ? <Intro /> : <Reflection totalTime={totalTime} />
                }
              />
              <Route exact path="/games" component={SelectGame} />
              <Route
                exact
                path="/:game"
                render={({ match }) =>
                  ['swirl', 'break', 'switch'].includes(match.params.game) ? (
                    <SelectTime game={match.params.game} />
                  ) : (
                    <Intro />
                  )
                }
              />
              <Route
                exact
                path="/:game/:time"
                render={({ match }) =>
                  ['swirl', 'break', 'switch'].includes(match.params.game) &&
                  typeof Number(match.params.time) === 'number' &&
                  Number(match.params.time) > 0 ? (
                    <Game
                      name={match.params.game}
                      time={match.params.time}
                      completedGame={completedGame}
                    />
                  ) : (
                    <SelectTime game={match.params.game} />
                  )
                }
              />
              <Route path="*" component={Intro} />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      </div>
    </Router>
  );
};

export default App;
