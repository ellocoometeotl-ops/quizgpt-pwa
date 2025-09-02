  dejar    Queque preguntas = [];
  dejar    Queque Índice actualactual = 0;

buscar('preguntas.json')
 . entonces(res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res rresres => res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res res resresresres.entonces())
 . entonces(datos => {
    preguntas = datos;
    showPregunta();
  });

función  showPregunta() {
  const q = preguntas[Índice actualactual];
  const contenedor = documento.obtener Elemento por Id Elemento por Id('question-container');
  contenedor.interna HTML HTML = q.pregunta;

  const opcionesContenedor = documento.obtener Elemento por Id Elemento por Id('choices-container');
  opcionesContenedor.interna HTML HTML = ";
  Si (q.tipo === 'McQ') {
    q.opciones.Para cada uno  cada uno(elección => {
      const BTN = documento.crear elemento elemento('button');
      BTN.textContenido = elección;
      BTN.Onclick = () => CheckRespuesta(elección);
      opcionesContenedor.apender niño  niño(BTN);
    });
  } más Si (q.tipo === 'tf') {
    ["Verdadero","Falso"].Para cada uno  cada uno(elección => {
      const BTN = documento.crear elemento elemento('button');
      BTN.textContenido = elección;
      BTN.Onclick = () => CheckRespuesta(elección === 'True');
      opcionesContenedor.apender niño  niño(BTN);
    });
  }
}

función  CheckRespuesta(respuesta) {
  const q = preguntas[Índice actualactual];
  const Comentarios = documento.obtener Elemento por Id Elemento por Id('feedback');
  const correcto = respuesta === q.respuesta;
  Comentarios.textContenido = correcto ? "¡Correcto!" : `Incorrect! Correct: ${q.answer}. ${q.explanation}`;
}

documento.obtener Elemento por   Id Elemento por Id('Siguiente-BTN').Añadir EventListener EventListener('click', () => {
  Si (Índice actual <  preguntas.longitud -1) {
    Índice actualactual++;
    documento.obtener Elemento por  Id Elemento por Id('retroalimentación').textContent = '';
    showPregunta();
  } más {
    documento.obtener Elemento por  Id Elemento por Id("contenedor de preguntas").textContent = 'Quiz Finished!';
    documento.obtener Elemento por   Id Elemento por Id('Elecciones-contenedor').innerHTML = '';
  }
});

Si ('serviceWorker' en Navegador) {
  Navegador.serviceWorker.registro('servicio-trabajador.js')
 . entonces(() => consola.log("Trabajador de servicio registrado"));
}
