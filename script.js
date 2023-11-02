// <html lang="pt-br" data-contexto="foco">
const html = document.querySelector("html");
const focoBt = document.querySelector(".app__card-button--foco");
const curtoBt = document.querySelector(".app__card-button--curto");
const longoBt = document.querySelector(".app__card-button--longo");
const banner = document.querySelector(".app__image");
const titulo = document.querySelector(".app__title");
const botoes = document.querySelectorAll(".app__card-button");
const musicaFocoInput = document.querySelector("#alternar-musica");
const startPauseBt = document.querySelector("#start-pause");
const iniciarOuPausarBt = document.querySelector("#start-pause span");
const iniciarOuPausarBtIcone = document.querySelector(".app__card-primary-butto-icon");
const tempoNaTela = document.querySelector("#timer");

const musica = new Audio("sons/luna-rise-part-one.mp3"); // arquivo de musica
const audioPlay = new Audio("sons/play.wav"); // arquivo de som do start
const audioPausa = new Audio("sons/pause.mp3"); // arquivo de som do start
const audioTempoFinalizado = new Audio("sons/beep.mp3"); // arquivo de som do start

let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;

musica.loop = true; // musica se repete o tempo inteiro

// "change" => evento do checkbox
musicaFocoInput.addEventListener("change", () => {
  // paused => verifica se a musica esta parada
  if (musica.paused) {
    musica.play(); // Inicia a musica
  } else {
    musica.pause(); // Para a musica
  }
});

// coloca uma acao de click no botao
focoBt.addEventListener("click", () => {
  tempoDecorridoEmSegundos = 1500;

  alterarContexto("foco");

  // adiciona a classe "active" no botao
  focoBt.classList.add("active");
});

// coloca uma acao de click no botao
curtoBt.addEventListener("click", () => {
  tempoDecorridoEmSegundos = 300;

  alterarContexto("descanso-curto");

  // adiciona a classe "active" no botao
  curtoBt.classList.add("active");
});

// coloca uma acao de click no botao
longoBt.addEventListener("click", () => {
  tempoDecorridoEmSegundos = 900;

  alterarContexto("descanso-longo");

  // adiciona a classe "active" no botao
  longoBt.classList.add("active");
});

function alterarContexto(contexto) {
  mostrarTempo();

  // remove a classe "active" no botao
  botoes.forEach(function(contexto) {
    contexto.classList.remove("active");
  });

  // muda a cor de acordo com o dado no atributo "data-contexto" que foi colocado na tag html
  html.setAttribute("data-contexto", contexto);

  // muda a imagem
  banner.setAttribute("src", `imagens/${contexto}.png`);

  // muda o titulo
  switch (contexto) {
    // innerHTML => adiciona tags com texto ou somente texto dentro de uma tag
    case "foco":
      titulo.innerHTML = `
        Otimize sua produtividade,<br>
        <strong class="app__title-strong">mergulhe no que importa.</strong>
      `;
      break;
    case "descanso-curto":
      titulo.innerHTML = `
          Que tal dar uma respirada?<br>
          <strong class="app__title-strong">Faça uma pausa curta!</strong>
        `;
      break;
    case "descanso-longo":
      titulo.innerHTML = `
          Hora de voltar à superfície.<br>
          <strong class="app__title-strong">Faça uma pausa longa.</strong>
        `;
      break;

    default:
      break;
  }
}

const contagemRegressiva = () => {
  if (tempoDecorridoEmSegundos <= 0) {
    audioTempoFinalizado.play();
    alert("Tempo finalizado!");
    zerar();
    return;
  }
  tempoDecorridoEmSegundos -= 1;
  // console.log("Temporizador: " + tempoDecorridoEmSegundos);
  // console.log('Id: ' + intervaloId);
  mostrarTempo();
};

startPauseBt.addEventListener("click", iniciarOuPausar);

function iniciarOuPausar() {
  // se o temporizador estiver ja estiver iniciado
  if (intervaloId) {
    audioPausa.play();
    zerar();
    return;
  }
  // setInterval => funcao que faz algo em uma determinada quantidade de tempo
  audioPlay.play();
  intervaloId = setInterval(contagemRegressiva, 1000); // 1000 => 1 segundo
  // textContent => adiciona somente texto dentro de uma tag
  iniciarOuPausarBt.textContent = "Pausar";
  iniciarOuPausarBtIcone.setAttribute("src", "imagens/pause.png");
}

function zerar() {
  clearInterval(intervaloId); // para o setInterval
  // textContent => adiciona somente texto dentro de uma tag
  iniciarOuPausarBt.textContent = "Começar";
  iniciarOuPausarBtIcone.setAttribute("src", "imagens/play_arrow.png");
  intervaloId = null;
}

function mostrarTempo() {
  const tempo = new Date(tempoDecorridoEmSegundos * 1000);
  const tempoFormatado = tempo.toLocaleTimeString("pt-Br", {
    minute: "2-digit", second: "2-digit"
  });
  // const tempo = tempoDecorridoEmSegundos;
  tempoNaTela.innerHTML = `${tempoFormatado}`;
}

mostrarTempo();