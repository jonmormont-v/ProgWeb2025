const scoreElement = document.getElementById("score")
const livesElement = document.getElementById("lives")
const gameOverScreen = document.getElementById("gameOverScreen")
const restartButton = document.getElementById("restartButton")

import { FPS } from "./config.js"
import { space } from "./space.js"
import { ship } from "./ship.js"
import { spawnEnemy, moveEnemies } from "./enemyShip.js"
import { SPEED_INCREASE_INTERVAL, SPEED_MULTIPLIER_INCREMENT } from "./config.js"
import { increaseSpeedMultiplier } from "./enemyShip.js"
import { fireBullet, moveBullets } from "./bullet.js"
import { enemies } from "./enemyShip.js"



let score = 0
let lives = 3
let invulnerable = false
let gameStarted = false
let gamePaused = false


export function updateScore(points) {
  score += points
  scoreElement.textContent = score.toString().padStart(6, '0')
}


function loseLife() {
  lives--
  livesElement.removeChild(livesElement.lastElementChild)
}

function gameOver() {
  gamePaused = true
  gameOverScreen.style.display = "block"
}


function init() {
  setInterval(run, 1000 / FPS)
}

window.addEventListener("keydown", (e) => {
  if (e.key === " ") {
    if (!gameStarted) {
      gameStarted = true
      gamePaused = false
      if (startMessage) startMessage.style.display = "none"
    } else {
      const x = ship.element.offsetLeft + ship.element.offsetWidth / 2 - 5
      const y = ship.element.offsetTop
      fireBullet(x, y)
    }
  }

  if (e.key === "p" || e.key === "P") {
    if (gameStarted) {
      gamePaused = !gamePaused
    }
  }

  if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A")
  ship.changeDirection(-1)

  if (e.key === "ArrowRight" || e.key === "d" || e.key === "D")
    ship.changeDirection(1)

})

window.addEventListener("keyup", (e) => {
  if (
    e.key === "ArrowLeft" || e.key === "ArrowRight" ||
    e.key === "a" || e.key === "A" ||
    e.key === "d" || e.key === "D"
  ) {
    ship.changeDirection(0)
  }

})

let elapsedTime = 0
const timerElement = document.getElementById("timer")
function updateTimer() {
  if (!gameStarted || gamePaused) return

  elapsedTime++
  const minutes = Math.floor(elapsedTime / 60)
  const seconds = elapsedTime % 60

  timerElement.textContent = `Tempo: ${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
}

function checkShipCollision() {
  const shipRect = ship.element.getBoundingClientRect()

  for (let i = 0; i < enemies.length; i++) {
    const enemyRect = enemies[i].element.getBoundingClientRect()

    const intersect = !(
      shipRect.top > enemyRect.bottom ||
      shipRect.bottom < enemyRect.top ||
      shipRect.right < enemyRect.left ||
      shipRect.left > enemyRect.right
    )

    if (intersect) {
      handleShipHit(enemies[i])
      break
    }
  }
}

function handleShipHit(enemy) {

  console.log("COLIDIU!")

  enemy.element.remove()
  enemies.splice(enemies.indexOf(enemy), 1)

  ship.element.src = "assets/png/playerDamaged.png"

  // Cancela qualquer "cura" programada
  clearTimeout(ship.damageTimeout)

  // Marca novo tempo de restauração
  ship.damageTimeout = setTimeout(() => {
    ship.element.src = ship.getCurrentSprite()
  }, 5000)

  if (lives > 0) {
    lives--
    updateLivesDisplay()
  } else {
    gameOver()
    return
  }
}


function updateLivesDisplay() {
  livesElement.innerHTML = ""
  for (let i = 0; i < lives; i++) {
    const img = document.createElement("img")
    img.src = "assets/png/life.png"
    livesElement.appendChild(img)
  }
}

function resetGame() {
  score = 0
  updateScore(0)

  lives = 3
  updateLivesDisplay()

  elapsedTime = 0
  timerElement.textContent = "Tempo: 00:00"

  gamePaused = false
  gameStarted = true

  ship.element.src = ship.getCurrentSprite()

  // Remover todos os inimigos
  enemies.forEach(e => e.element.remove())
  enemies.length = 0
}



function run() {
  if (!gameStarted || gamePaused) return

  space.move()
  ship.move()
  spawnEnemy()
  moveEnemies()
  moveBullets()
  checkShipCollision()
}

init()
setInterval(updateTimer, 1000)

setInterval(() => {
  if (gameStarted && !gamePaused) {
    increaseSpeedMultiplier()
  }
}, SPEED_INCREASE_INTERVAL)

restartButton.addEventListener("click", () => {
  gameOverScreen.style.display = "none"
  resetGame()
})
