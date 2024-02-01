import React, { useState, useEffect, useRef } from 'react';
import { withRouter } from 'react-router';
import BackButton from './BackButton.js'
import '../styles/GameSwirl.css';
import '../styles/Carousel.css';
import swirlSets from '../data/SwirlSets.js';

const GameSwirl = (props) => {
  const [currentSet, setCurrentSet] = useState(0);
  const [animationFrame, setAnimationFrame] = useState(true);
  const [baseWidth] = useState(1000);
  const [totalSets] = useState(props.time);
  const [sets] = useState([]);
  const [mousePosition, setMousePosition] = useState({x: 0, y: 0});
  const startTime = useRef(new Date());

  useEffect(() => {
    setupSets(totalSets);
    drawInitialSets();
    drawLoop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setupSets = (setCount) => {
    for (let i = 0; i < setCount; i++) {
      const set = {
        canvas: sets[i],
        context: sets[i].getContext('2d'),
        points: []
      };

      set.canvas.width = baseWidth;
      set.canvas.height = baseWidth;

      for (let j = 0; j < 550; j++) {
        const point = swirlSets[i].system(j, set.canvas.width, set.canvas.height);
        point.active = true;
        point.life = 1;

        set.points.push(point);
      }

      sets.push(set);
    }
  };

  const drawInitialSets = () => {
    for (let i = 0; i < totalSets - 1; i++) {
      setCurrentSet(i);
      draw();
    }
  };

  const drawLoop = () => {
    update();
    if (animationFrame) {
      draw();
      setAnimationFrame(requestAnimationFrame(drawLoop));
    }
  };

  const draw = () => {
    sets[currentSet].canvas.width = sets[currentSet].canvas.width;
    const context = sets[currentSet].context;
    const points = sets[currentSet].points;

    context.lineCap = "round";
    context.moveTo(points[0].x, points[0].y);
    
    for (let i = 1; i < points.length - 1; i++) {
      context.strokeStyle = `rgba(0, 0, 0, ${0.1 + points[i].life})`;
      context.lineWidth = `${8 * points[i].life + 2}`;

      context.beginPath();
      context.moveTo(points[i - 1].x, points[i - 1].y);
      context.lineTo(points[i].x, points[i].y);
      context.stroke();
    }
  };

  const update = () => {
    let foundActive = false;
    const points = sets[currentSet].points;

    points.forEach((dot) => {
      const a = mousePosition.x - dot.x;
      const b = mousePosition.y - dot.y;
      const distance = Math.sqrt(a * a + b * b);

      if (dot.active === true) {
        foundActive = true;
      }

      if (distance < 50 && dot.active === true) {
        dot.life -= 0.04;
        if (dot.life <= 0) {
          dot.active = false;
        }
      } else if (dot.active === true && dot.life < 1) {
        dot.life += 0.05;
      }
    });

    if (foundActive === false) {
      setCurrentSet((prevSet) => {
        const nextSet = prevSet + 1;
        if (nextSet === totalSets - 1) {
          cancelAnimationFrame(animationFrame);
          setAnimationFrame(null);
          endGame();
        }
        return nextSet;
      });
    }
  };

  const endGame = () => {
    const totalTime = new Date().valueOf() - startTime.current.valueOf();
    props.completedGame(totalTime);
    props.history.push('/');
  };

  const onInputMove = (event) => {
    const rect = sets[currentSet].canvas.getBoundingClientRect();
    let x, y = 0;
    if (event.nativeEvent.changedTouches) {
      x = event.nativeEvent.changedTouches[0].clientX - rect.left;
      y = event.nativeEvent.changedTouches[0].clientY - rect.top;
    } else {
      x = event.nativeEvent.clientX - rect.left;
      y = event.nativeEvent.clientY - rect.top;
    }
    const multiplier = baseWidth / sets[currentSet].canvas.clientWidth;
    setMousePosition({ x: x * multiplier, y: y * multiplier });
  };

  const renderSets = () => {
    const setsElements = [];
    for (let i = 0; i < totalSets; i++) {
      const active = currentSet === i;
      const id = `set-${i}`;
      const canvasRef = `canvas-${i}`;
      let className = "item";
      if (active) {
        className += " active";
      }
      setsElements.push(
        <div key={id} id={id} className={className}>
          <div className="center">
            <div className="item-contents">
              <canvas
                ref={(canvas) => sets[i] = canvas}
                width="1000"
                height="1000"
                onMouseMove={onInputMove}
                onTouchMove={onInputMove}
              ></canvas>
            </div>
          </div>
        </div>
      );
    }
    return setsElements;
  };

  let moveUnit = 60;
  if (window.innerWidth < 700) {
    moveUnit = 85;
  }

  const carouselStyles = {
    width: `${totalSets * 100}vw`,
    transform: `translateX(-${currentSet * moveUnit}vw)`
  };

  const setsElements = renderSets();

  return (
    <div>
      <BackButton endGame={endGame} />
      <section className="carousel-container">
        <section className="carousel" style={carouselStyles}>
          {setsElements}
        </section>
      </section>
    </div>
  );
};

export default withRouter(GameSwirl);
