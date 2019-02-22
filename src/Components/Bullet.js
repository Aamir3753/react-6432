import { Ship } from './Ship';
export function Bullet(ctx, bullet) {
    this.bulletVy = 20;
    this.bullet = bullet;
    this.bulletPosX1 = Ship.posX + 5;
    this.bulletPosY1 = Ship.posY
    this.bulletPosX2 = Ship.posX + 32;
    this.bulletPosY2 = Ship.posY;
    this.bulletHeight = 10;
    this.bulletWidth = 3;
    this.bullet = bullet;
    this.shipX = Ship.posX;
    this.shipY = Ship.posY;
    this.bullet1Destroyed = false;
    this.bullet2Destroyed = false;
    this.ctx = ctx;
    this.intKey = 0;
    this.bulletPosY1 = this.bulletPosY2 = Ship.posY;
    this.fireBullet = function () {
        this.ctx.drawImage(this.bullet, this.bulletPosX1, this.bulletPosY1);
        this.ctx.drawImage(this.bullet, this.bulletPosX2, this.bulletPosY2);
    }
    this.genBulletAndMove = function () {
        this.fireBullet();
        this.intKey = setInterval(() => {
            if (this.bulletPosY1 === 0) {
                clearInterval(this.intKey);
                this.ctx.clearRect(this.bulletPosX1, this.bulletPosY1, this.bulletWidth, this.bulletHeight);
                this.ctx.clearRect(this.bulletPosX2, this.bulletPosY2, this.bulletWidth, this.bulletHeight);
                return
            }
            this.ctx.clearRect(this.bulletPosX1, this.bulletPosY1, this.bulletWidth, this.bulletHeight);
            this.ctx.clearRect(this.bulletPosX2, this.bulletPosY2, this.bulletWidth, this.bulletHeight);

            this.bulletPosY1 -= this.bulletVy
            this.bulletPosY2 -= this.bulletVy

            if (!this.bullet1Destroyed)
                this.ctx.drawImage(this.bullet, this.bulletPosX1, this.bulletPosY1, this.bulletWidth, this.bulletHeight);
            if (!this.bullet2Destroyed)
                this.ctx.drawImage(this.bullet, this.bulletPosX2, this.bulletPosY2, this.bulletWidth, this.bulletHeight);
        }, 100);
    }
    this.destroyBullet1 = function () {
        this.bullet1Destroyed = true;
        this.ctx.clearRect(this.bulletPosX1, this.bulletPosY1, this.bulletWidth, this.bulletHeight);
    }
    this.destroyBullet2 = function () {
        this.bullet2Destroyed = true;
        this.ctx.clearRect(this.bulletPosX2, this.bulletPosY2, this.bulletWidth, this.bulletHeight);
    }
}