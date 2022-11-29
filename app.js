import express from 'express';
import session from 'express-session';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();

//para poder utilizar __dirname
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//inicializa express
const app = express();

//inicializo MongoAtlas
import MongoStore from 'connect-mongo';
const advanceOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

//inicializo conexion a la base de datos para las sessiones
app.use(cookieParser());
let mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/test';

//middleware para las sesiones
app.use(
  session({
    store: new MongoStore({ 
      mongoUrl: mongoUrl,
      mongoOptions: advanceOptions   
    }),
    secret: "coderhouse",
    resave: true,
    saveUninitialized: true,
    rolling: true,
    cookie: { maxAge: 60000000 },
	})
);


//middleware para passport
app.use(passport.initialize());
app.use(passport.session());

//importo router
import { router } from './src/rutas/index.js';

//seteo de plantilla
app.set('views', './views');
app.set('view engine', 'ejs');

//middlewares
app.use(express.static(__dirname + "/public"));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use("/", router);

//socket.io 
import http from 'http';
import { Server } from 'socket.io';
const io = new Server(http);

//conexion a socket.io
const httpServer = http.createServer(app);
io.attach(httpServer);

//funciones del chat
import { getChat, sendMessage } from './src/controllers/chat.js';

io.on('connection', async function(socket) {
  console.log('Un cliente se ha conectado'); 
  //primera conexion del usuario recibe los mensajes
  const messages = await getChat();  
  socket.emit('messages', messages);
  io.sockets.emit('productos');

  //escucho el los mensajes del cliente, lo agrego a la db y le paso a Todos (io.sockets.emit) los clientes los mensajes
  socket.on ('new-message', async function (data){
    sendMessage(data)
    .then(async (newMessage) => {             
      const messages = await getChat();  
      io.sockets.emit('messages', messages);
    })
  });
});

//levanto el servidor
const port = process.env.PORT || 8080;

httpServer.listen(port, () => {
  console.log(`Servidor http escuchando en el puerto ${port}`);
});

export default app;