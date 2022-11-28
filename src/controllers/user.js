import {getUser} from '../negocio/usuarios.js';

//import logger
import { infoLog } from '../logs/logger.js';

const getUsuario = async (req, res) => {
  infoLog(req);
  const userData = await getUser(req.user._id); 
  res.render('user', {userData});  
}

export { getUsuario };