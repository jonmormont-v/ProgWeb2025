import { FPS, TAMX, SPEED_INCREASE_INTERVAL, SPEED_MULTIPLIER_INCREMENT } from "./config.js"
import { space } from "./space.js"
import { ship } from "./ship.js"
import { spawnEnemy, moveEnemies, enemies, increaseSpeedMultiplier } from "./enemyShip.js"
import { fireBullet, moveBullets } from "./bullet.js"

let score = 0
let lives = 3
let gameStarted = false
let gamePaused = false
let elapsedTime = 0

const scoreElement = document.getElementById("score")
const livesElement = document.getElementById("lives")
const timerElement = document.getElementById("timer")
const gameOverScreen = document.getElementById("gameOverScreen")
const restartButton = document.getElementById("restartButton")

export function updateScore(points) {
  score += points
  scoreElement.textContent = score.toString().padStart(6, '0')
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
  // Zerar variáveis
  score = 0
  scoreElement.textContent = "000000"

  lives = 3
  updateLivesDisplay()

  elapsedTime = 0
  timerElement.textContent = "Tempo: 00:00"

  // Resetar nave
  ship.direction = 1
  ship.element.src = ship.getCurrentSprite()
  ship.element.style.left = `${TAMX / 2 - ship.element.offsetWidth / 2}px`
  ship.element.style.top = "800px"

  // Remover TODOS os elementos dinâmicos do DOM
  const spaceEl = document.getElementById("space")

  document.querySelectorAll(".enemy, .bullet").forEach(el => el.remove())
  enemies.length = 0



  // Esvaziar array de inimigos
  enemies.length = 0

  // Resetar estados do jogo
  gameStarted = false
  gamePaused = false

  // Mostrar instrução inicial
  const startMessage = document.getElementById("startMessage")
  if (startMessage) startMessage.style.display = "block"
}

function gameOver() {
  gameStarted = false
  gamePaused = true
  gameOverScreen.style.display = "block"
}

function handleShipHit(enemy) {
  enemy.element.remove()
  enemies.splice(enemies.indexOf(enemy), 1)

  ship.element.src = "assets/png/playerDamaged.png"
  clearTimeout(ship.damageTimeout)
  ship.damageTimeout = setTimeout(() => {
    ship.element.src = ship.getCurrentSprite()
  }, 5000)

  if (lives > 0) {
    lives--
    updateLivesDisplay()
  } else {
    gameOver()
  }
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

function updateTimer() {
  if (!gameStarted || gamePaused) return

  elapsedTime++
  const minutes = Math.floor(elapsedTime / 60)
  const seconds = elapsedTime % 60
  timerElement.textContent = `Tempo: ${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
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

function init() {
  setInterval(run, 1000 / FPS)
}

window.addEventListener("keydown", (e) => {
  if (e.key === " ") {
    if (!gameStarted) {
      gameStarted = true
      gamePaused = false
      const startMessage = document.getElementById("startMessage")
      if (startMessage) startMessage.style.display = "none"
    } else {
      const x = ship.element.offsetLeft + ship.element.offsetWidth / 2 - 5
      const y = ship.element.offsetTop
      fireBullet(x, y)
    }
  }

  if (e.key === "p" || e.key === "P") {
    if (gameStarted) gamePaused = !gamePaused
  }

  if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") ship.changeDirection(-1)
  if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") ship.changeDirection(1)
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

restartButton.addEventListener("click", () => {
  location.reload()
})


init()
setInterval(updateTimer, 1000)

setInterval(() => {
  if (gameStarted && !gamePaused) {
    increaseSpeedMultiplier()
  }
}, SPEED_INCREASE_INTERVAL)
