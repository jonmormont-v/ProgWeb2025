import { TAMX } from "./config.js"
import { space } from "./space.js"

const directions = [
  "assets/png/playerLeft.png",
  "assets/png/player.png",
  "assets/png/playerRight.png",
]

class Ship {
  constructor() {
    this.element = document.createElement("img")
    this.element.id = "ship"
    this.direction = 1
    this.element.src = directions[this.direction]
    this.element.style.bottom = "20px"
    this.element.style.left = `${TAMX / 2 - 50}px`
    space.element.appendChild(this.element)
    this.dx = 0
    this.damageTimeout = null
    this.element.id = "ship"
  }
  changeDirection(dx) {
    this.dx = dx
  }

  move() {
    const left = parseInt(this.element.style.left)
    const shipWidth = this.element.width || 80

    let newLeft = left + this.dx * 5

    // Impede ultrapassar bordas
    if (newLeft < 0) newLeft = 0
    if (newLeft + shipWidth > TAMX) newLeft = TAMX - shipWidth

    this.element.style.left = `${newLeft}px`
  }
  getCurrentSprite() {
    return ["assets/png/playerLeft.png", "assets/png/player.png", "assets/png/playerRight.png"][this.direction]
  }
}


export const ship = new Ship()