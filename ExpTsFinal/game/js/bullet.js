import { space } from "./space.js"
import { enemies } from "./enemyShip.js"
import { updateScore } from "./game.js"

const bullets = []

export class Bullet {
  constructor(x, y) {
    this.element = document.createElement("img")
    this.element.src = "assets/png/laserRed.png"
    this.element.className = "bullet"
    this.element.style.position = "absolute"
    this.element.style.left = `${x}px`
    this.element.style.top = `${y}px`
    space.element.appendChild(this.element)
  }

  move() {
    const y = parseInt(this.element.style.top)
    if (y < -20) {
      this.destroy()
      return
    }

    this.element.style.top = `${y - 10}px`
    this.checkCollision()
  }

  checkCollision() {
    enemies.forEach((enemy, index) => {
      const eRect = enemy.element.getBoundingClientRect()
      const bRect = this.element.getBoundingClientRect()

      const intersect = !(
        bRect.top > eRect.bottom ||
        bRect.bottom < eRect.top ||
        bRect.right < eRect.left ||
        bRect.left > eRect.right
      )

      if (intersect) {
        this.destroy()
        enemy.element.remove()
        enemies.splice(index, 1)
        addPoints(enemy.type)
      }
    })
  }

  destroy() {
    this.element.remove()
    bullets.splice(bullets.indexOf(this), 1)
  }
}

export function fireBullet(x, y) {
  bullets.push(new Bullet(x, y))
}

export function moveBullets() {
  bullets.forEach(bullet => bullet.move())
}

function addPoints(type) {
  const points = {
    nave: 50,
    disco: 20,
    asteroideGrande: 10,
    asteroidePequeno: 100
  }[type] || 0

  updateScore(points)
}
