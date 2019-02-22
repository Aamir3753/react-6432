import React from 'react';
import Main from './Components/MainComponent'
import { getAssets } from './Components/GetAssets';
class App extends React.Component {
  state = {
    score: 0,
    isGameOvered: false
  }
  updateScore = () => {
    this.setState(prevState => ({
      score: prevState.score + 5
    }))
  }
  restartGame = () => {
    this.setState({ score: 0 });
    window.location.reload()
  }
  gameOver = () => {
    let heighScore = JSON.parse(localStorage.getItem("heighScore"));
    if (heighScore) {
      if (heighScore < this.state.score) {
        localStorage.setItem("heighScore", JSON.stringify(this.state.score));
      }
    } else {
      localStorage.setItem("heighScore", JSON.stringify(this.state.score));
    }
    this.setState({ isGameOvered: true });
  }
  componentDidMount() {
    const assets = getAssets();
    const canvas = this.refs.background;
    const ctx = canvas.getContext("2d");
    window.addEventListener("load", () => {
      ctx.drawImage(assets.bg, 0, 0, window.innerWidth, window.innerHeight);
    })
  }
  render() {
    return (
      <div>
        <canvas height={window.innerHeight} width={window.innerWidth} ref="background" style={{ zIndex: "1", position: "absolute" }} />
        <Main updateScore={this.updateScore} gameOver={this.gameOver} score={this.state.score} />
        <div style={{ position: "absolute", zIndex: "3", display: "flex", justifyContent: "space-around", color: "white", width: "100%" }}>
          <h3 style={{ color: "white" }}>Score:{this.state.score}</h3>
          <h3>
            {JSON.parse(localStorage.getItem("heighScore")) ? "Heigh Score:" + JSON.parse(localStorage.getItem("heighScore")) : null}
          </h3>
        </div>
        <div style={{ position: "absolute", left: "45%", top: "45%", zIndex: "3", color: "white" }}>
          {this.state.isGameOvered ? (
            <div>
              <h4 style={{margin:0,textAlign:"center"}}>Game Over</h4>
              <button type="button" onClick={this.restartGame}>Restart Game</button>
            </div>
          ) : null}
        </div>
      </div >

    )
  }
}
export default App;