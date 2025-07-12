import { Enemy } from "./enemies.js"
import { SPEED_MULTIPLIER_INCREMENT } from "./config.js"

let speedMultiplier = 1

export const enemies = []

export function spawnEnemy() {
  const rand = Math.random()

  // Frequências definidas por faixa cumulativa (de 0 a 1)
  if (rand < 0.003) {
    enemies.push(new Enemy("nave", "assets/png/enemyShip.png", randomSpeed(1, 3)))
  } else if (rand < 0.006) {
    enemies.push(new Enemy("disco", "assets/png/enemyUFO.png", randomSpeed(2, 4)))
  } else if (rand < 0.008) {
    enemies.push(new Enemy("asteroideGrande", "assets/png/meteorBig.png", randomSpeed(1, 2))) // MENOS FREQUENTE
  } else if (rand < 0.012) {
    enemies.push(new Enemy("asteroidePequeno", "assets/png/meteorSmall.png", randomSpeed(2, 5)))
  }
}

export function moveEnemies() {
  for (let i = enemies.length - 1; i >= 0; i--) {
    const enemy = enemies[i]
    enemy.move()

    const y = parseInt(enemy.element.style.top)
    if (!isNaN(y) && y > 900) {
      enemy.element.remove()
      enemies.splice(i, 1)
    }
  }
}

export function increaseSpeedMultiplier() {
  speedMultiplier += SPEED_MULTIPLIER_INCREMENT
  console.log(`Velocidade aumentada: x${speedMultiplier.toFixed(2)}`)
}


function randomSpeed(min, max) {
  let speed
  do {
    speed = Math.random() * (max - min) + min
  } while (speed < 0.5)
  return speed * speedMultiplier
}


