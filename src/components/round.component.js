import React, { Component } from 'react';

import Timer from './timer.component';

class Round extends Component {
  constructor(props) {
    super(props)
    this.state = {
      score: 0,
      paused: true,
      started: false,
      finished: false
    };
    this.onRoundReset = this.onRoundReset.bind(this);
    this.onRoundStart = this.onRoundStart.bind(this);
    this.onRoundPause = this.onRoundPause.bind(this);
    this.onComplete = this.onComplete.bind(this);
  }
  changeScore(delta) {
    let changedScore = this.state.score + delta;
    if (changedScore >= 0
        && changedScore <= 99
        && this.state.started
        && !this.state.paused
        && !this.state.finished
    ) {
      this.setState({
        score: changedScore
      });
    }
  }
  onRoundReset() {
    this.setState({score: 0})
    this.resetTimer.resetAll()
  }
  onRoundStart() {
    this.setState({
      started: true,
      paused: false
    })
  }
  onRoundPause(status) {
    this.setState({
      paused: status
    })
  }
  onComplete() {
    this.setState({
      finished: true
    })
  }
  render() {
    let teamIndex = this.props.currentTeam - 1;
    let gameControls;
    let gamePaused;
    if (this.state.paused) {
      gamePaused = <div>
        <a className="content__button content__button--green score__button score__button--reset" onClick={() => {this.onRoundPause(false)}}>RESUME</a>
        <a className="content__button content__button--red score__button score__button--reset" onClick={this.onRoundReset}>RESET</a>
      </div>
    } else {
      gamePaused = <a className="content__button content__button--blue score__button score__button--reset" onClick={() => {this.onRoundPause(true)}}>PAUSE</a>
    }
    if (this.state.started) {
      gameControls = <div>
        { gamePaused }
      </div>;
    } else {
      gameControls = <a className="content__button content__button--green score__button score__button--reset" onClick={this.onRoundStart}>START</a>;
    }
    if (this.state.finished) {
      gameControls = <a className="content__button content__button--black score__button" onClick={() => {this.props.onRoundFinish(this.state.score)}}>FINISH</a>
    }
    return(
      <div className="wrapper">
        <header className="header header--team">
          <h1 className={"header__title team--" + teamIndex}>TEAM<span className={"header__title--number team-" + teamIndex}>{this.props.currentTeam}</span></h1>
        </header>
        <div className="content container">
          <div className="row">
            <div className="col-md-4 team-wrapper">
              <Timer
                seconds={this.props.duration}
                paused={this.state.paused}
                ref={(timer) => {this.resetTimer = timer;}}
                onComplete={this.onComplete} />
            </div>
            <div className="col-md-4 team-wrapper">
              <h1 className="category-title">Hot topics</h1>
              { gameControls }
            </div>
            <div className="col-md-4 team-wrapper">
              <div className="score"><span className="score__title">SCORE</span>
                <ul className="score-list">
                  <li className="score-list__item">
                    <span className="score-list__number score-list__number--first">0</span>
                  </li>
                  <li className="score-list__item">
                    <span className="score-list__number">{this.state.score}</span>
                  </li>
                </ul>
                <span className="score-plus" onClick={() => {this.changeScore(1)}}></span>
                <span className="score-minus" onClick={() => {this.changeScore(-1)}}></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Round;
