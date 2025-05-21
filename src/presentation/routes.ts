import { Router } from "express";
import { TodoRoutes } from "./todos/routes";


//*Rutas de la aplicacion:
export class AppRoutes {

    static get routes(): Router {

        const router = Router();

        //*Como ya se creo un crontrolador de los todos, ya no es necesario.
        // const todoController = new TodosController();

        router.use('/api/todos', TodoRoutes.routes);


        return router;
    }


}