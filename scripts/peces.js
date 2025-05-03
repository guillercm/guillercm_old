// Obtén una referencia al pez
const setPeces = () => {
  const peces = [1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5];

  let clientX = null,
    clientY = null;

  let anchura = null;
  const getAltura = () => {
    const anchoPantalla = window.innerWidth;
    anchura = anchoPantalla - (anchoPantalla < 800 ? 120 : 50);
    return anchoPantalla < 800 ? 210 : 560;
  };
  let altura = getAltura();
  window.onresize = function (event) {
    anchura = window.innerWidth;
    altura = getAltura();
    resetScrollX();
  };
  let last_event = null;
  document.addEventListener("mousemove", (event) => {
    clientX = event.clientX;
    clientY = event.clientY + window.scrollY;
  });
  document.addEventListener("touchstart", (event) => {
    const touch = event.touches[0];
    clientX = touch.clientX;
    clientY = touch.clientY + window.scrollY;
    last_event = "touchstart";
  });
  document.addEventListener("touchmove", (event) => {
    const touch = event.touches[0];
    clientX = touch.clientX;
    clientY = touch.clientY + window.scrollY;
    last_event = "touchmove";
  });
  document.addEventListener("touchend", (event) => {
    clientX = null;
    clientY = null;
    last_event = "touchend";
  });

  function numeroAleatorio(minimo, maximo) {
    return Math.floor(Math.random() * (maximo - minimo + 1)) + minimo;
  }

  for (let i = 0; i < peces.length; i++) {
    const pez = document.createElement("div");
    pez.classList.add("pez");
    pez.style.backgroundImage = `url('imagenes/peces/pez${peces[i]}.png')`;
    divPeces.appendChild(pez);
    let ultimoScaleX = 1;
    let velocidad = 3;
    let xPez = pez.offsetLeft;
    let yPez = pez.offsetTop;
    const distanciaHuida = 120;
    const aumentoScaleX = 0.1;
    let targetX, targetY;
    let updateTargets = () => {
      targetX = numeroAleatorio(0, anchura);
      targetY = numeroAleatorio(0, altura);
    };
    updateTargets();
    // pez.style.left = `${window.innerWidth / 2 - pez.offsetWidth / 2}px`;
    // pez.style.top = `${window.innerHeight / 2 - pez.offsetHeight / 2}px`;

    // Agrega un evento para rastrear el movimiento del ratón
    function animar() {
      // Calcula la posición del ratón en relación con el centro del pez

      velocidad = 1.5;
      let xRelativo1 = pez.offsetLeft + pez.offsetWidth / 2;
      let yRelativo1 = pez.offsetTop + pez.offsetHeight / 2;
      const xRelativo = targetX - xRelativo1;
      const yRelativo = targetY - yRelativo1;

      const distanciaAlObjetivo = Math.sqrt(
        xRelativo * xRelativo + yRelativo * yRelativo
      );

      if (clientX !== null && clientY !== null && last_event !== "touchend") {
        const xRelativoRaton = clientX - xRelativo1;
        const yRelativoRaton = clientY - yRelativo1;
        const distanciaAlRaton = Math.sqrt(
          xRelativoRaton * xRelativoRaton + yRelativoRaton * yRelativoRaton
        );
        velocidad = distanciaAlRaton < distanciaHuida ? 4 : 1.5;
      }
      if (distanciaAlObjetivo < 10) {
        // Puedes ajustar este valor
        let distanciaPared = 20;
        let height = altura - 20;
        let width = anchura - 15;
        if (targetX < distanciaPared) {
          targetX = numeroAleatorio(
            width - distanciaPared * 2,
            width - distanciaPared
          );
        } else {
          targetX = numeroAleatorio(0, distanciaPared);
        }
        let minTargetY = targetY - 100;
        let maxTargetY = targetY + 100;
        if (minTargetY < distanciaPared) {
          minTargetY = distanciaPared;
        }
        targetY = numeroAleatorio(
          minTargetY < 0 ? 0 : minTargetY,
          maxTargetY > height ? height : maxTargetY
        );
      }

      //const huirRaton = distanciaAlRaton < distanciaHuida;
      // Calcula la rotación necesaria para que la cola del pez apunte hacia el ratón
      let rotacion = (Math.atan2(yRelativo, xRelativo) * 180) / Math.PI + 180;

      let scaleX = rotacion < 260 && rotacion > 90;
      if (xRelativo < 0) {
        rotacion = 180 + rotacion;
      } else {
        rotacion = -rotacion;
      }
      rotacion -= 180;

      const targetScaleX = scaleX ? -1 : 1;
      ultimoScaleX = Math.round(ultimoScaleX * 100) / 100;
      if (ultimoScaleX < targetScaleX) {
        ultimoScaleX += aumentoScaleX;
      } else if (ultimoScaleX > targetScaleX) {
        ultimoScaleX -= aumentoScaleX;
      }
      const radianes = (rotacion * Math.PI) / 180;
      const x = Math.cos(radianes) * velocidad;
      const y = Math.sin(radianes) * velocidad;
      let scaleXAux = ultimoScaleX;

      if (xRelativo < 0) {
        xPez -= x;
      } else {
        xPez += x;
      }
      yPez -= y;
      pez.style.transform = `scaleX(${scaleXAux}) rotate(${rotacion}deg)`;
      pez.style.left = `${xPez}px`;
      pez.style.top = `${yPez}px`;
      requestAnimationFrame(animar);
    }
    requestAnimationFrame(animar);
  }

  window.scrollTo(0, 0);
};
