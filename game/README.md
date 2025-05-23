# 🚀 Space Shooter - Trabalho Prático PW 2025.1

Este é um jogo estilo Space Shooter desenvolvido como primeiro trabalho prático da disciplina **Programação para Web (PW)** na **UFAM**, semestre 2025.1.

O jogador controla uma nave que deve defender o espaço contra obstáculos e inimigos variados.

---

## 🎮 Como jogar

- Pressione **Barra de Espaço** para iniciar o jogo.
- Use **Setas (←/→)** ou **Teclas A/D** para mover a nave.
- Pressione **Espaço** para atirar.
- Pressione **P** para pausar ou retomar o jogo.

---

## 📌 Regras Implementadas

- ✅ HUD com 3 vidas (`life.png`) e pontuação `000000`
- ✅ Início com barra de espaço, pausa com `P`
- ✅ Limites de movimento horizontal da nave
- ✅ Inimigos: nave alienígena, disco voador, asteroide grande e pequeno
- ✅ Velocidades aleatórias
- ✅ Aumento de dificuldade progressiva a cada minuto
- ✅ Sistema de tiro, pontuação por tipo de inimigo
- ✅ Nave danificada após colisão com tempo acumulado
- ✅ Game Over após 4ª colisão, com botão de reinício
- ✅ Remoção automática de inimigos e tiros da DOM

## ⚠️ Importante para Testar o Jogo

Este jogo utiliza módulos JavaScript (`type="module"`), portanto não funciona se aberto diretamente com duplo clique.

### Para testar corretamente:

✅ **Use o Live Server no VS Code**  
OU  
✅ Rode um servidor local com Python:

```bash
python -m http.server 8000


## 👨‍💻 Autor

**Jonathas Monteiro**  
Aluno da UFAM - Instituto de Computação  
Disciplina: Programação para Web – 2025.1

