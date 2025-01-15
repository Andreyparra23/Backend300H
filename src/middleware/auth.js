// 1. IMPORTAR dependencias y módulos
import { decode } from 'jsonwebtoken';
import { verifyToken } from '../lib/jwt.js';

// 2. Crearnos el MIDDLEWARE que nos permita usar la función para verificar token
//       2.1 Verificar que exista un token
//       2.2 Verificar que el token sea permitido
//       2.3 Validar el rol -> verificar permisos 

function auth(requiredRole) {
    return async (request, response, next) => {

        // VERIFICACIÓN 1: Existencia del token -------------------------
        // Acá estamos accediendo al token generado en caso de que haya
        let token = request.headers['authorization'];
        console.log('Token obtenido de la cabecera ' + token);

        if(!token){
            return response.status(401).json({
                mensaje: 'No se encontró token, permiso denegado'
            });
        }

        // VERIFICACIÓN 2: Que el token sea permitido
       // Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MmFkNzUxOGViZmUwMmRjNTY3MWIwZSIsIm5hbWUiOiJwZXBpdG8gcMOpcmV6IiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNzMxNDU0NjEyLCJleHAiOjE3MzE0NTgyMTJ9.V6T1Z5OHMWCzNoZgaCAsRmw8KNA968K6hSARp5Msj5c
        // Vamos a quitar el bearer para poder verificar bien el token
        token = token.split(' ')[1];
        console.log('token después de separarlo del Bearer' + token);

        // Menejo de errores

        try {
            const decoded = await verifyToken(token);
            console.log('token decodificado ' , decoded);

            // VALIDACIÓN 3: Verificar rol ->la lógica la ponen ustedes
            // SI se requiere que se administrador -> requiredRole === 'admin'
            // PERO el usuario NO ES administrador 
            // MENSAJE DE QUE NO TIENE PERMISOS PARA ESA PETICIÓN
            if(requiredRole === 'administrador' && !decoded.isAdmin){
                // 403 -> Prohibido continuar
                return response.status(403).json({
                    mensaje: 'Acceso no permitido, no es administrador'
                });
            }

            // es guardar la info decodificada en la petición
            request.user = decoded;
            
        } catch (error) {
            // 400 -> algo falló en la petición
            return response.status(400).json({
                mensaje: 'Falló la autenticación del token',
                problema: error.message || error
            });
        }


        // indica que debe continuar con el siguiente proceso
        next();

    }
}

// 3. Exportarlo
export default auth;