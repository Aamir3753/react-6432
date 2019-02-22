import { gameOvered, increaseScore } from './GameOvered';
export function Enemy(ctx, enemy, canvasHeight, canvasWidth,enemyInterval) {
    this.enemyPosX = 0;
    this.enemyPosY = 0;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.enemyDestroyed = false;
    this.ctx = ctx;
    this.enemySpeed = 10;
    this.enemyHeight = this.enemyWidth = 40;
    this.enemy = enemy;
    this.enemyInterval = enemyInterval
    this.isGameOvered = false;
    this.genAndMove = function () {
        this.enemyPosX = Math.ceil(Math.random() * Math.floor(this.canvasWidth / 40)) * 40;
        this.ctx.drawImage(this.enemy, this.enemyPosX, this.enemyPosY, this.enemyWidth, this.enemyHeight);
        let intKey = setInterval(() => {
            if (this.enemyPosY > this.canvasHeight) {
                clearInterval(intKey);
                window.dispatchEvent(gameOvered);
                return
            }
            if (this.enemyDestroyed) {
                clearInterval(intKey);
                window.dispatchEvent(increaseScore);
                return
            }
            this.ctx.clearRect(this.enemyPosX, this.enemyPosY, this.enemyWidth, this.enemyHeight);
            this.enemyPosY += this.enemySpeed;
            this.ctx.drawImage(this.enemy, this.enemyPosX, this.enemyPosY, this.enemyWidth, this.enemyHeight);
        },this.enemyInterval);
        this.intKey = intKey;
    }
    this.destroyEnemy = function () {
        this.ctx.clearRect(this.enemyPosX, this.enemyPosY, this.enemyWidth, this.enemyHeight);
    }
    this.detectCollision = function (bullet) {
        let killed = () => {
            let shipLeft = this.enemyPosX;
            let shipRight = shipLeft + this.enemyWidth;
            let shipTop = this.enemyPosY;
            let shipBottom = shipTop + this.enemyHeight;

            let bullet1Left = bullet.bulletPosX1
            let bullet1Right = bullet1Left + bullet.bulletWidth;
            let bullet1Top = bullet.bulletPosY1;

            let bullet2Left = bullet.bulletPosX2
            let bullet2Right = bullet2Left + bullet.bulletWidth;
            let bullet2Top = bullet.bulletPosY2;

            if (bullet1Left > shipLeft && bullet1Right < shipRight && bullet1Top < shipBottom && bullet1Top > shipTop) {
                bullet.destroyBullet1();
                this.enemyDestroyed = true;
                this.destroyEnemy()
            }
            if (bullet2Left > shipLeft && bullet2Right < shipRight && bullet2Top < shipBottom && bullet2Top > shipTop) {
                bullet.destroyBullet2();
                this.enemyDestroyed = true;
                this.destroyEnemy()
            }
        }
        let intKey = setInterval(() => {
            killed();
            if (bullet.bulletPosY1 <= 0 || bullet.bulletPosY2 <= 0) {
                clearInterval(intKey);
            }
        }, 0);
    }
    this.stopEnemy = function () {
        clearInterval(this.intKey);
    }
}