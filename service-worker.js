const Cache_name = 'QuizGPT-Cache-V1';
const URLsToCache = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './preguntas.json'
];

auto.Añadir oyente  de oyente  de Eventos oyente  de eventosde eventos('instalar', evento => {
  evento.Espera hasta  hasta(
    cachés.abierto(Cache_name).entonces(caché => cache.addAll(urlsToCache))
  );
});

auto.Añadir oyente  de oyente  de Eventos oyente   de eventosde  eventos('fetch', evento => {
  evento.Responder Con Con(
    cachés.partido(evento.solicitud)
 . entonces(respuesta => respuesta || buscar(event.request))
  );
});
