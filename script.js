const app = document.getElementById("app");

let treinos = {};
let telaAtual = 'home';

function renderHome() {
  telaAtual = 'home';
  app.innerHTML = `
    <h1>Strap</h1>
    <button onclick="startTreinoLivre()">Treino Livre</button>
    <button onclick="renderMontarTreino()">Montar Treino</button>
  `;
}

function renderVoltar() {
  return `<button onclick="renderHome()">← Voltar</button><br><br>`;
}

function startTreinoLivre() {
  telaAtual = 'livre';
  app.innerHTML = `
    ${renderVoltar()}
    <h2>Treino Livre</h2>
    <form onsubmit="salvarTreinoLivre(event)">
      <label>Exercício: <input id="exercicio" required /></label><br>
      <label>Kg: <input id="kg" type="number" required /></label><br>
      <label>Repetições: <input id="reps" type="number" required /></label><br>
      <label>Séries: <input id="series" type="number" required /></label><br>
      <label>Descanso (s): <input id="descanso" type="number" required /></label><br>
      <button type="submit">Salvar Série</button>
    </form>
    <div id="seriesList"></div>
  `;
}

function salvarTreinoLivre(event) {
  event.preventDefault();
  const exercicio = document.getElementById("exercicio").value;
  const kg = document.getElementById("kg").value;
  const reps = document.getElementById("reps").value;
  const series = document.getElementById("series").value;
  const descanso = document.getElementById("descanso").value;

  const treino = {
    exercicio,
    kg,
    reps,
    series,
    descanso,
  };

  const list = document.getElementById("seriesList");
  list.innerHTML += `
    <div style="margin-top:10px; padding:8px; border:1px solid #ccc;">
      <strong>${exercicio}</strong> — ${kg}kg × ${reps} rep × ${series} séries
      <br>Descanso: ${descanso}s
      <button onclick="iniciarDescanso(${descanso})">Iniciar Descanso</button>
    </div>
  `;
}

function iniciarDescanso(segundos) {
  let div = document.createElement("div");
  let tempoRestante = segundos;
  div.textContent = `Descanso: ${tempoRestante}s`;
  app.appendChild(div);

  const interval = setInterval(() => {
    tempoRestante--;
    div.textContent = `Descanso: ${tempoRestante}s`;
    if (tempoRestante <= 0) {
      clearInterval(interval);
      div.textContent = "Descanso finalizado!";
    }
  }, 1000);
}

function renderMontarTreino() {
  telaAtual = 'montar';
  app.innerHTML = `
    ${renderVoltar()}
    <h2>Montar Treino</h2>
    <p>Em breve: aqui você montará treinos e salvará por dia da semana.</p>
  `;
}

// Inicialização
renderHome();
