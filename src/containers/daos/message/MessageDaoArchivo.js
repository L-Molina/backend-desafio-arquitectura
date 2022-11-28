import ContenedorArchivo from "../../contenedores/ContenedorArchivo.js";
const url = './src/persistencia/db/messages.json'

class MessageDaoArchivo extends ContenedorArchivo {
  constructor () {
    super(url) 
  }
}

export  {MessageDaoArchivo};  