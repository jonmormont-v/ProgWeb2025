import { TAMX } from "./config.js"
import { space } from "./space.js"

export class Enemy {
  constructor(type, imagePath, speed) {
    this.type = type
    this.speed = speed

    this.element = document.createElement("img")
    this.element.classList.add("enemy", "enemy-ship")
    this.element.src = imagePath

    this.element.style.top = "0px"

    const enemyWidth = 80
    let attempts = 0
    let x

    do {
      x = Math.floor(Math.random() * (TAMX - enemyWidth))
      attempts++
    } while (
      space.element.querySelectorAll(".enemy-ship").length > 0 &&
      Array.from(space.element.querySelectorAll(".enemy-ship")).some(other => {
        const otherX = parseInt(other.style.left)
        return Math.abs(otherX - x) < enemyWidth
      }) &&
      attempts < 10
    )

    this.element.style.left = `${x}px`
    space.element.appendChild(this.element)
  }

  move() {
    let top = parseInt(this.element.style.top)
    if (isNaN(top)) top = 0
    this.element.style.top = `${top + this.speed}px`
  }

  remove() {
    this.element.remove()
  }
}
