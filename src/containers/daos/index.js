//minimist
import minimist from 'minimist';

let productosDao;
let carritosDao;
let usersDao;
let messagesDao;

const PERS = process.env.PERS || "mongodb";

import dotenv from 'dotenv';
dotenv.config();

switch (PERS) {
  case 'json':
		const ProductosDaoArchivo = await (async () => {let {ProductosDaoArchivo} = await import('./productos/ProductosDaoArchivo.js'); return ProductosDaoArchivo})();
		const MessageDaoArchivo = await (async () => {let {MessageDaoArchivo} = await import('./message/MessageDaoArchivo.js'); return MessageDaoArchivo})();
    const CarritosDaoArchivo = await (async () => {let {CarritosDaoArchivo} = await import('./carritos/CarritosDaoArchivo.js'); return CarritosDaoArchivo})();
		productosDao = new ProductosDaoArchivo();
    messagesDao = new MessageDaoArchivo();
		carritosDao = new CarritosDaoArchivo();
		break; 
  case 'mongodb':
    const ProductosDaoMongoDb = await (async () => {let {ProductosDaoMongoDb} = await import('./productos/ProductosDaoMongoDb.js'); return ProductosDaoMongoDb})();     
    const CarritosDaoMongoDb = await (async () => {let {CarritosDaoMongoDb} = await import('./carritos/CarritosDaoMongoDb.js'); return CarritosDaoMongoDb})();    
    const MessageDaoMongoDb = await (async () => {let {MessageDaoMongoDb} = await import('./message/MessageDaoMongoDb.js'); return MessageDaoMongoDb})();    
    const UserDaoMongoDb = await (async () => {let {UserDaoMongoDb} = await import('./usuarios/UsuariosDaoMongoDb.js'); return UserDaoMongoDb})();
    productosDao = new ProductosDaoMongoDb();
    carritosDao = new CarritosDaoMongoDb();
    messagesDao = new MessageDaoMongoDb();
    usersDao = new UserDaoMongoDb();
    break;
  case 'memoria':
    const ProductosDaoMemoria = await (async () => {let {ProductosDaoMemoria} = await import('./productos/ProductosDaoMemoria.js'); return ProductosDaoMemoria})();
    const MessageDaoMemoria = await (async () => {let {MessageDaoMemoria} = await import('./message/MessageDaoMemoria.js'); return MessageDaoMemoria})();
    const CarritosDaoMemoria = await (async () => {let {CarritosDaoMemoria} = await import('./carritos/CarritosDaoMemoria.js'); return CarritosDaoMemoria})();
    productosDao = new ProductosDaoMemoria();
    messagesDao = new MessageDaoMemoria();
    carritosDao = new CarritosDaoMemoria();
    break;
	default:
    productosDao = new ProductosDaoArchivo();
    messagesDao = new MessageDaoArchivo();
    carritosDao = new CarritosDaoArchivo();
    break;
}

export { usersDao, productosDao, carritosDao, messagesDao };