window.onload = () => {
  setPeces();
  resetScrollX = () => {
    window.scrollTo(
      0,
      window.pageYOffset || document.documentElement.scrollTop
    );
  };

  clickCheckbox = (sw = true) => {
    document.getElementById("checkbox").checked =
      !document.getElementById("checkbox").checked && sw;
  };

  const mote = dataJson.datosPersonales.mote;
  document.querySelectorAll(".nombre").forEach((elemento) => {
    elemento.textContent = mote;
  });
  document.title = mote;

  document.querySelectorAll(".profesion").forEach((elemento) => {
    elemento.textContent = dataJson["datosPersonales"]["puesto"];
  });

  descripcionPortafolio.innerHTML = "";
  for (let mensaje of dataJson.descripcionPortafolio) {
    descripcionPortafolio.innerHTML += `<p>${mensaje}</p>`;
  }

  estudios.innerHTML = "";
  for (let estudio of dataJson.formacion) {
    estudios.innerHTML += `
  <div class="estudio">
    <h5 class="mb-0">${estudio.nombre}</h5>
    <ul>
      <li class="mb-1">${estudio.instituto}</li>
      <li class="mb-1">${estudio.fecha}</li>
    </ul>
  </div>
  `;
  }

  tecnologias.innerHTML = "";
  for (let t of dataJson.tecnologias) {
    const tec = getTecnologia(t);
    tecnologias.innerHTML += `
  <a target="_blank" href="${tec.url}" class="text-center">
    <div class="d-flex flex-column align-items-center justify-content-center gap-1 h-100">
      <img src="${tec.imagen}" alt="${t}" title="${t}" class="img-fluid" style="max-height: 50px;"  width="40" height="40">
      <div>${t}</div>
    </div>
  </a>
  `;
  }

  tecnologias2.innerHTML = "";
  for (let t of dataJson.tecnologiasAdicionales) {
    const tec = getTecnologia(t);
    tecnologias2.innerHTML += `
  <a target="_blank" href="${tec.url}" class="text-center">
    <div class="d-flex flex-column align-items-center justify-content-center gap-1 h-100">
      <img src="${tec.imagen}" alt="${t}" title="${t}" class="img-fluid" style="max-height: 50px;"  width="40" height="40">
      <div>${t}</div>
    </div>
  </a>
  `;
  }

  proyectos.innerHTML = "";
  let i = 1;
  for (let pr of dataJson.misProyectos) {
    if (!pr.mostrar) continue;
    let tecnologiasHtml = "";
    for (let t of pr.tecnologias) {
      const tec = getTecnologia(t);
      tecnologiasHtml += `
    <a target="_blank" href="${tec.url}" class="text-center">
      <div class="d-flex flex-column align-items-center justify-content-center gap-1 h-100">
        <img src="${tec.imagen}" title="${t}" alt="${t}" class="img-fluid" style="max-height: 50px;"  width="40" height="40">
        
      </div>
    </a>
    `;
    }

    proyectos.innerHTML += `
  <!-- Proyecto ${i} -->
          <div class="col-md-4">
            <div class="card mb-4">
              <div class="card-div-img">
                <img src="imagenes/proyectos/${pr.imagen}" class="card-img-top" alt="${pr.nombre}">
              </div>
              <div class="card-body">
                <h4 class="card-title">${pr.nombre}</h4>
                <p class="card-text small">${pr.descripcion}</p>
                <div class="tecnologias d-flex flex-wrap gap-7 mt-3">
                  ${tecnologiasHtml}
                </div>
                <a href="${dataJson.redesSociales.gitHub}${pr.gitHub}" target="_blank" class="mt-3 btn btn-primary">
                    <div class="d-flex align-items-center">
                      <svg fill="#ffffff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" class="w-5 fill-primary">
                      <path class="pathGithub"></path>
                    </svg>
                    <span class="ms-2">GitHub</span>
                  </div>
                </a>
                
              </div>
              
            </div>
          </div>
  <!-- Fin proyecto -->
  `;
    i++;
  }

  imgCertificados.innerHTML = "";
  let last_dot_clicked = null;
  let last_a = null;
  let suma_ancho = 0;
  for (let cert of dataJson.certificados) {
    const a = document.createElement("a");
    if (suma_ancho) {
      a.classList.add("oculto");
    }

    a.href = `certificados/${cert.pdf}`;
    a.target = "_blank";
    a.innerHTML = `<img src="certificados/${cert.imagen}" class="img-fluid" alt="${cert.nombre}" title="${cert.nombre}">`;
    imgCertificados.appendChild(a);
    const dot = document.createElement("div");
    dot.classList.add("dot");
    const s = suma_ancho;
    if (suma_ancho) {
      a.classList.add("oculto");
    } else {
      dot.classList.add("active");
      last_a = a;
      last_dot_clicked = dot;
    }
    dot.onclick = function () {
      last_a.classList.add("oculto");
      last_dot_clicked.classList.remove("active");
      a.classList.remove("oculto");
      dot.classList.add("active");
      last_a = a;
      last_dot_clicked = dot;
    };
    suma_ancho = 1;
    const div_dots = document.getElementById("div-dots");
    div_dots.appendChild(dot);
  }

  correo.textContent = dataJson.datosPersonales.correo;

  ubicacion.textContent = dataJson.datosPersonales.ubicacion;

  enlaceGithub.href = dataJson.redesSociales.gitHub;

  if (dataJson.redesSociales.infoJobs) {
    enlaceInfoJobs.href = dataJson.redesSociales.infoJobs;
  } else {
    enlaceInfoJobs.remove();
  }

  enlaceLinkedIn.href = dataJson.redesSociales.linkedIn;

  dataJson = null;

  document.querySelectorAll(".pathGithub").forEach((elemento) => {
    elemento.setAttribute(
      "d",
      "M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
    );
  });
};
