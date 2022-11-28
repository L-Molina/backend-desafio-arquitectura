import {getUser} from '../negocio/usuarios.js';

//import logger
import { infoLog } from '../logs/logger.js';

const getLogout = async (req, res) => {

  const datosUsuario = await getUser(req.user._id); 
  const user = datosUsuario.username;

  infoLog(req);

  req.session.destroy((err) => { 
    if (!err) { 
    res.render('logout', {user}); 
    }    
    else res.send("Error");
  });
  
}

export { getLogout };