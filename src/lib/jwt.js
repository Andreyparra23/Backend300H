import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'; 
dotenv.config();

const key = process.env.SECRET_KEY

//funcion para generar el token 
//payload es la informacion del usuario

export function generateToken (payload)  {
return new Promise((resolve, reject) => {
    jwt.sign(payload, key, {expiresIn: '1h'}, (error, token)=>{
        if(error){
            reject(new Error('error al generar el JWT' + error.message));
        } else {
            resolve (token);
        }
    })
})
}

//funcion verificar token

export const verifyToken = (token) => {

    return new Promise((resolve, reject) => {
  
      jwt.verify(token, key, (error, decoded) => {
        if (error) {
          // si sale mal, que me responsa con un error
          reject(new Error("Error al verificar JWT " + error.message));
        }else{
          resolve(decoded);
        }
  
      });
    });
  };

