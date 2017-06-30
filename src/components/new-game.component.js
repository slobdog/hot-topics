import React from 'react';

let NewGame = (props) => {
  return (
    <div className="wrapper">
      <header className="header header--game-options">
        <h1 className="header__title">SET GAME OPTIONS</h1>
      </header>
      <div className="content--options container content">
        <ul className="options">
          <li className="option__item option__item--number clearfix">
            <span className="option__title">Number of teams</span>
            <div className="option__wrap">
              <span className="option__dicrement" onClick={() => {props.onTeamsChange(-1)}}>-</span>
              <input type="text" value={props.teams} className="option__input" />
              <span className="option__increment" onClick={() => {props.onTeamsChange(1)}}>+</span>
            </div>
          </li>
          <li className="option__item option__item--round clearfix">
            <span className="option__title">Round duration<br />
              <span className="option__title--subtitle">(seconds)</span>
            </span>
            <div className="option__wrap">
              <span className="option__dicrement" onClick={() => {props.onDurationChange(-10)}}>-</span>
              <input type="text" value={props.duration} className="option__input" />
              <span className="option__increment" onClick={() => {props.onDurationChange(10)}}>+</span>
            </div>
          </li>
        </ul>
        <div className="content__buttons">
          <a className="content__button content__button--green" onClick={props.startGame}>NEXT</a>
          <a className="content__button content__button--options" onClick={props.backToHomeScreen}>BACK</a>
        </div>
      </div>
    </div>
  );
};

export default NewGame;
