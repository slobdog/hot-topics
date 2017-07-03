import React, { Component } from 'react';

import ScoreboardTable from './scoreboard-table.component';
import NewRound from './new-round.component';
import Round from './round.component';
import WinnerTeam from './winner-team.component';

class Scoreboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentView: 'scoreboard',
      scoreboard: this.scoreboardInit(props.teams, props.rounds),
      totalTeamScore: this.totalScoreInit(props.teams),
      currentTeam: 1,
      currentRound: 1,
      winnerTeam: null
    };
    this.roundFinish = this.roundFinish.bind(this);
  };
  scoreboardInit(teams, rounds) {
    let scoreboard = [];
    for (let i = 0; i < rounds; i++) {
      scoreboard[i] = [];
      for (let j = 0; j < teams; j++) {
        scoreboard[i][j] = 0;
      }
    }
    return scoreboard;
  };
  totalScoreInit(teams) {
    let totalScore = [];
    for (let i = 0; i < teams; i++) {
      totalScore[i] = 0;
    }
    return totalScore;
  }
  roundFinish(score) {
    let nextTeam, nextRound, currentView;
    this.updateScore(score);
    if (this.state.currentTeam < this.props.teams) {
      nextTeam = this.state.currentTeam + 1;
      this.setState({currentTeam: nextTeam})
      currentView = 'scoreboard';
    } else if (this.state.currentRound < this.props.rounds) {
      nextRound = this.state.currentRound + 1;
      this.setState({
        currentTeam: 1,
        currentRound: nextRound
      })
      currentView = 'scoreboard';
    } else if (this.state.currentTeam === this.props.teams && this.state.currentRound === this.props.rounds) {
      this.setState({
        winnerTeam: this.selectWinnerTeam(this.state.totalTeamScore)
      })
      currentView = 'winners';
    }
    this.setCurrentView(currentView);
  };
  goToWinnersPage() {
    this.setState({
      winnerTeam: this.selectWinnerTeam(this.state.totalTeamScore)
    })
    this.setCurrentView('winners');
  }
  selectWinnerTeam(totalTeamScore) {
    let winnerScore = Math.max.apply(null, totalTeamScore);
    let winnerTeam = totalTeamScore.indexOf(winnerScore) + 1;
    return {
      team: winnerTeam,
      score: winnerScore
    };
  }
  updateScore(score) {
    let scoreboard = this.state.scoreboard;
    scoreboard[this.state.currentRound - 1][this.state.currentTeam - 1] = score;
    this.setState({
      scoreboard: scoreboard
    })
    this.countTotalTeamResultScore();
  };
  countTotalTeamResultScore() {
    let scoreboard = this.state.scoreboard;
    let totalScore = (r, a) => r.map((b, i) => a[i] + b);
    this.setState({
      totalTeamScore: scoreboard.reduce(totalScore)
    });
  };
  setCurrentView(option) {
    this.setState({currentView: option})
  };
  render() {
    let currentView = '';
    switch (this.state.currentView) {
      case 'scoreboard':
        currentView = <ScoreboardTable
          backToHomeScreen={this.props.backToHomeScreen}
          startNewRound={() => {this.setCurrentView('new-round')}}
          scoreboard={this.state.scoreboard}
          totalTeamScore={this.state.totalTeamScore} />
        break;
      case 'new-round':
        currentView = <NewRound
          backToScoreboard={() => {this.setCurrentView('scoreboard')}}
          startRound={() => {this.setCurrentView('round')}}
          onGameEnd={() => {this.goToWinnersPage()}}
          currentTeam={this.state.currentTeam}
          currentRound={this.state.currentRound} />
        break;
      case 'round':
        currentView = <Round
          duration={this.props.duration}
          currentTeam={this.state.currentTeam}
          onRoundReset={this.roundReset}
          onRoundFinish={this.roundFinish} />
        break;
      case 'winners':
        currentView = <WinnerTeam
          winnerTeam={this.state.winnerTeam}
          quitGame={this.props.backToHomeScreen}
          newGame={this.props.backToHomeScreen} />
    }
    return(
      <div>
        { currentView }
      </div>
    );
  }
}

export default Scoreboard;
