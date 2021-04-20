/* Override no express adicionando a tipagem da variável user
a ser usado na aplicação para armazenar o id do usuário.
Modifica a biblioteca e define o tipo dela
 */
declare namespace Express {
   export interface Request {
      user: {
         id: string;
      };
   }
}
