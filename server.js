
const { app: server } = require('./app');

const PORT = process.env.PORT || 5000 ;

server.listen(PORT, (err) => {
  if (err) {
    throw err;
  }
  console.log(`El servidor está activo en el puerto ${PORT}`);
});

