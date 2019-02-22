import { Bullet } from './Bullet';
import { getAssets } from './GetAssets';
import { Enemy } from './Enemy';
const assets = getAssets();
export const Ship = {
    posX: 0,
    posY: 0,
    ship: null,
    shipHeight: 40,
    shipWidth: 40,
    shipVx: 15,
    shipVy: 15,
    touchV: 5,
    ctx: null,
    totalHeight: 0,
    totalWidth: 0,
    intKey: 0,
    defficulty: 2000,
    score: 0,
    updateScore: null,
    isGameOvered: false,
    gameOver: null,
    drawInCenter: function (ctx, totalHeight, totalWidth, ship, updateScore, gameOver) {
        this.ctx = ctx;
        this.updateScore = updateScore;
        this.gameOver = gameOver;
        this.totalHeight = totalHeight;
        this.totalWidth = totalWidth;
        this.ship = ship
        this.posX = totalWidth / 2;
        this.posY = totalHeight - this.shipHeight;
        this.ctx.drawImage(this.ship, this.posX, this.posY, this.shipWidth, this.shipHeight);
    },
    moveShip: function () {
        // make array of enemies
        let initialX = 0;
        let initialY = 0;
        let enemies = []
        let enemySpeed = 100;
        let levelCounter = 0;
        let enemyKey = setInterval(() => {
            levelCounter++
            if (levelCounter % 5 === 0) enemySpeed -= 5;
            let enemy = new Enemy(this.ctx, assets.enemy, this.totalHeight, this.totalWidth, enemySpeed);
            enemy.genAndMove();
            enemies.push(enemy);
        }, this.defficulty)
        window.addEventListener("touchstart", (e) => {
            initialX = e.changedTouches[0].clientX;
            initialY = e.changedTouches[0].clientY;
        })
        window.addEventListener("touchmove", (e) => {
            if (!this.isGameOvered) {
                if (e.changedTouches[0].clientX < initialX && this.posX > 0) {
                    this.ctx.clearRect(this.posX, this.posY, this.shipWidth, this.shipHeight);
                    this.posX -= this.touchV;
                    this.ctx.drawImage(this.ship, this.posX, this.posY, this.shipWidth, this.shipHeight);
                    return;
                }
                if (e.changedTouches[0].clientX > initialX && this.posX < this.totalWidth - this.shipWidth) {
                    this.ctx.clearRect(this.posX, this.posY, this.shipWidth, this.shipHeight);
                    this.posX += this.touchV;
                    this.ctx.drawImage(this.ship, this.posX, this.posY, this.shipWidth, this.shipHeight);
                    return;
                }
                if (e.changedTouches[0].clientY < initialY && this.posY > this.totalHeight - this.totalHeight / 4) {
                    this.ctx.clearRect(this.posX, this.posY, this.shipWidth, this.shipHeight);
                    this.posY -= this.touchV;
                    this.ctx.drawImage(this.ship, this.posX, this.posY, this.shipWidth, this.shipHeight);
                }
                if (e.changedTouches[0].clientY > initialY && this.posY < this.totalHeight - this.shipHeight) {
                    this.ctx.clearRect(this.posX, this.posY, this.shipWidth, this.shipHeight);
                    this.posY += this.touchV;
                    this.ctx.drawImage(this.ship, this.posX, this.posY, this.shipWidth, this.shipHeight);
                }
            }
        })

        window.addEventListener("touchend", (e) => {
            if (e.changedTouches[0].clientX === initialX && e.changedTouches[0].clientY === initialY && !this.isGameOvered) {
                const bullet = new Bullet(this.ctx, assets.bullet);
                bullet.genBulletAndMove();
                // clean array of redundant enemies
                enemies = enemies.filter(enemy => !enemy.enemyDestroyed);
                enemies.map(enemy => {
                    enemy.detectCollision(bullet);
                    console.log(enemy.enemyDestroyed);
                    return 0;
                })
            }
        })

        window.addEventListener("keydown", (e) => {
            if (!this.isGameOvered) {
                if (e.code === "ArrowLeft" && this.posX > 0) {
                    this.ctx.clearRect(this.posX, this.posY, this.shipWidth, this.shipHeight);
                    this.posX -= this.shipVx;
                    this.ctx.drawImage(this.ship, this.posX, this.posY, this.shipWidth, this.shipHeight);
                }
                if (e.code === "ArrowRight" && this.posX < this.totalWidth - this.shipWidth) {
                    this.ctx.clearRect(this.posX, this.posY, this.shipWidth, this.shipHeight);
                    this.posX += this.shipVx;
                    this.ctx.drawImage(this.ship, this.posX, this.posY, this.shipWidth, this.shipHeight);
                }
                if (e.code === "ArrowUp" && this.posY > this.totalHeight - this.totalHeight / 4) {
                    this.ctx.clearRect(this.posX, this.posY, this.shipWidth, this.shipHeight);
                    this.posY -= this.shipVy;
                    this.ctx.drawImage(this.ship, this.posX, this.posY, this.shipWidth, this.shipHeight);
                }
                if (e.code === "ArrowDown" && this.posY < this.totalHeight - this.shipHeight) {
                    this.ctx.clearRect(this.posX, this.posY, this.shipWidth, this.shipHeight);
                    this.posY += this.shipVy;
                    this.ctx.drawImage(this.ship, this.posX, this.posY, this.shipWidth, this.shipHeight);
                }
                if (e.code === "Space") {
                    const bullet = new Bullet(this.ctx, assets.bullet);
                    bullet.genBulletAndMove();
                    // clean array of redundant enemies
                    enemies = enemies.filter(enemy => !enemy.enemyDestroyed);
                    enemies.map(enemy => {
                        enemy.detectCollision(bullet);
                        return 0;
                    })
                }
            }
        });
        window.addEventListener("gameOvered", () => {
            enemies.map(enemy => {
                enemy.stopEnemy()
                return 0;
            })
            clearInterval(enemyKey);
            this.gameOver();
            this.isGameOvered = true;
        })
        window.addEventListener("increaseScore", () => {
            this.updateScore();
        })
    }
}