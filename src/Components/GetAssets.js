export const getAssets = () => {
    const ship = new Image();
    ship.src = "./imgs/ship.png";
    const bullet = new Image();
    bullet.src = "./imgs/bullet.png";
    const enemy = new Image();
    enemy.src = "./imgs/enemy.png";
    const bg = new Image();
    bg.src = "./imgs/bg.png"
    return {
        ship,
        bullet,
        enemy,
        bg,
    }
}