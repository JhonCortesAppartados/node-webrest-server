import { Request, Response } from "express";
import { prisma } from "../../data/postgres";

// //Se crea un array de objetos, para utilizarlo en la base de datos:
// const todos = [
//     {id: 1, text: 'Buy milk', completedAt: new Date()},
//     {id: 2, text: 'Buy bread', completedAt: null},
//     {id: 3, text: 'Buy butter', completedAt: new Date()},
// ];

export class TodosController {

    // independency inyection:
    constructor() { }

    public getTodos = async (req:Request, res:Response) => {

        const getTodo = await prisma.todo.findMany();
        console.log(getTodo);

        res.json(getTodo);
    }

    public getTodoById = async (req:Request, res:Response) => {
        //Se le pone el signo + para convertirlo en un number:
        const id = +req.params.id;

        //Para poder validar si el argumento que se envia es un number:
        if(isNaN(id)) res.json({error: 'ID argument is not a number'});

        //Se utliza para poder devolver el id cuando se solocite:
        // console.log(id, 10);
        // res.json({id})

        //Es para devolver la informaciónque contiene el id que se pidio de los Todos:
        // const todo = todos.find(todo => todo.id === id);

        //*Esta forma es utilizando el prisma:
        const todo = await prisma.todo.findFirst({
            where: {
                id: id
            }
        });
        
        //Se comenta para poder hacer la validación del 404, llegado al caso de que no se encuentre el id:
        // res.json(todo);

        //Se utiliza el ternario para poder validar el 404:
        (todo) 
            ? res.json(todo) 
            : res.status(404).json({error: `TODO with id ${id} not found`});

    }

    public createTodo = async (req:Request, res:Response) => {
        //Se desestructura el body:
        const {text} = req.body;
        if(!text)  res.status(400).json({error: 'Text property is required'});

        //Este es el metodo para poder crear un nuevo todo con prisma:
        const todo = await prisma.todo.create({
            data: {
                text: text
            }
        });

        // //Se utiliza para poder crear un nuevo todo:
        // const newTodo = {
        //     id: todos.length + 1,
        //     text: text,
        //     completedAt: null
        // }

        //Ya no se utiliza para poder crear un nuevo todo:
        // todos.push(newTodo);

        res.json(todo);

    };


    public updateTodo = async (req:Request, res:Response) => {

        const id = +req.params.id;
        if(isNaN(id)) res.status(400).json({error: 'ID argument is not a number'});
        
        // // Se utiliza para poder devolver el id cuando se solocite:
        // const todo = todos.find(todo => todo.id === id);
        // if(!todo) res.status(404).json({error: `Todo with id ${id} not found`});

        //*Esta forma es utilizando el prisma:
        const todo = prisma.todo.findFirst({
            where: {
                id: id
            }
        });
        if(!todo) res.status(404).json({error: `Todo with id ${id} not found`});
        
        const {text, completedAt} = req.body;
        // if(!text) res.status(400).json({error: 'Text property is required'});

        // Esta es la version anterior para poder actualizar el todo:
        // todo!.text = text || todo!.text;

        // (completedAt === 'null')
        //     ? todo!.completedAt = null
        //     : todo!.completedAt = new Date(completedAt) || todo!.completedAt;

        //! ojo, referencia

        // todos.forEach((todo, index) => {
        //     if(todo.id === id) {
        //          todos[index] = todo;
        //     }
        // });

        //*Esta es la version de actualizar el todo utilizando el prisma:
        const updatedTodo = await prisma.todo.update({
            where: {
                id: id
            },
            data: {
                text: text,
                completedAt: (completedAt) ? new Date(completedAt) : null
            }
        });

        res.json(updatedTodo);
    };

    public deleteTodo = async (req:Request, res:Response) => {
        
        const id = +req.params.id;
        if(isNaN(id)) res.status(400).json({error: 'ID argument is not a number'});
        
        // const todo = todos.find(todo => todo.id === id);
        // if(!todo) res.status(404).json({error: `Todo with id ${id} not found`});

        const todo = prisma.todo.findFirst({
            where: {
                id: id
            }
        });
        if(!todo) res.status(404).json({error: `Todo with id ${id} not found`});

        //Este es el metodo para poder borrar el todo:
        // todos.splice(todos.indexOf(todo!), 1);

        //*Esta es la forma de borrar el todo con prisma:
        const deleted = await prisma.todo.delete({
            where: {
                id: id
            }
        });

        (deleted) 
            ? res.json(deleted) 
            : res.status(404).json({error: `TODO with id ${id} not found`});

    }


}


