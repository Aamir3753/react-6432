import React, { Component } from 'react';
import { Ship } from './Ship';
import { getAssets } from './GetAssets';
class Main extends Component {
    componentDidMount() {
        const assets = getAssets();
        const ctx = this.refs.gameArea.getContext("2d");
        window.addEventListener("load", () => {
            Ship.drawInCenter(ctx, window.innerHeight,window.innerWidth, assets.ship, this.props.updateScore, this.props.gameOver, this.isGameOvered, this.props.score);
            Ship.moveShip();
        })
    }
    render() {
        return (
            <canvas ref="gameArea" width={window.innerWidth} height={window.innerHeight} style={{ position: "absolute",zIndex:"2" }}></canvas>
        )
    }
}
export default Main;