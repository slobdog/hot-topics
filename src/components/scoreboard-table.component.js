import React from 'react';

let ScoreboardTable = (props) => {
  return(
    <div className="wrapper">
      <div className="content container container--total">
        <table className="main-table">
          <thead className="main-table__head">
            <tr>
              <th className="main-table__head-text"></th>
              {
                props.scoreboard[0].map((teamScore, teamIndex) => {
                  return (
                    <th className="main-table__head-text" key={teamIndex}>
                      <span className={"main-table__head-text-word main-table__head-text-word--" + teamIndex}>{teamIndex + 1}</span>
                    </th>
                  );
                })
              }
            </tr>
          </thead>
          <tbody className="main-table__body">
            { props.scoreboard.map((round, roundIndex) => {
              return (
                <tr className="main-table__row" key={roundIndex}>
                  <td className="main-table__item">
                    <span className="main-table__text">ROUND {roundIndex + 1}</span>
                  </td>
                  {
                    round.map((score, scoreIndex) => {
                      return (
                        <td className="main-table__item" key={`${roundIndex}_${scoreIndex}`}> <span className="main-table__text--number">{score}</span></td>
                      )})
                  }
                </tr>
              );
            }) }
            <tr className="main-table__row">
              <td className="main-table__item main-table__item--total"><span className="main-table__text">TOTAL</span><span className="main-table__text--category">ROUNDS NOW</span></td>
              {
                props.totalTeamScore.map((score, index) => {
                  return (
                    <td className="main-table__item" key={index}><span className="main-table__text--number main-table__text--number-single">{score}</span></td>
                  );
                })
              }
            </tr>
          </tbody>
        </table>
        <div className="content__buttons">
          {/*<a className="content__button content__button--options" onClick={props.backToHomeScreen}>BACK</a>*/}
          <a className="content__button content__button--options" onClick={props.startNewRound}>CONTINUE</a>
        </div>
      </div>
    </div>
  );
}

export default ScoreboardTable;
