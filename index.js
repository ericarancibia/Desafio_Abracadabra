// Modulos CommonJS
import express from "express";
import path from "path";

const app = express();
const port = 3000;

// Archivos Estáticos
const __dirname = path.resolve();
app.use('/public/assets',
  express.static(path.join(__dirname,
    'public/assets')));
const usuarios = {
  usuarios: ["Juan", "Jocelyn", "Astrid", "Maria", "Ignacia", "Javier", "Brian"],
};

// Middleware
app.use("/abracadabra/juego/:usuario", (req, res, next) => {
  const user = req.params.usuario.toLowerCase();
  const authorized = usuarios.usuarios.find(
    (usr) => user === usr.toLowerCase()
  );
  if (authorized) {
    next();
  } else {
    res.sendFile(`${__dirname}/public/assets/img/who.jpeg`);
  }
});

//Routes
app.get("/abracadabra/usuarios", (req, res) => {
  res.json({
    usuarios,
  });
});

app.get("/abracadabra/juego/:usuario", (req, res) => {
  res.sendFile(__dirname + "/public/assets/index.html");
});

app.get("/abracadabra/conejo/:n", (req, res) => {
  const azar = Math.floor(Math.random() * 4 + 1);
  if (req.params.n == azar) {
    res.sendFile(__dirname + "/public/assets/img/conejito.jpg");
  } else {
    res.sendFile(`${__dirname}/public/assets/img/voldemort.jpg`);
  }
});

//Server
app.listen(port, () =>
  console.log(`Server is running on http://localhost:${port}`)
);

app.get("*", (req, res) => {
  res.send("<center><h1>🌵PÁGINA NO ENCONTRADA O NO EXISTE🦖</h1></center>");
});
