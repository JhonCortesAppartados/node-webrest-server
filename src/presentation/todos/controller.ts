import { Request, Response } from "express";


const todos = [
    {id: 1, text: 'Buy milk', completedAt: new Date()},
    {id: 2, text: 'Buy bread', completedAt: null},
    {id: 3, text: 'Buy butter', completedAt: new Date()},
];

export class TodosController {

    // independency inyection:
    constructor() { }

    public getTodos = (req:Request, res:Response) => {
        res.json(todos);
    }

    public getTodoById = (req:Request, res:Response) => {
        //Se le pone el signo + para convertirlo en un number:
        const id = +req.params.id;

        //Para poder validar si el argumento que se envia es un number:
        if(isNaN(id)) res.json({error: 'ID argument is not a number'});

        //Se utliza para poder devolver el id cuando se solocite:
        // console.log(id, 10);
        // res.json({id})

        //Es para devolver la informaciónque contiene el id que se pidio:
        const todo = todos.find(todo => todo.id === id);
        
        //Se comenta para poder hacer la validación del 404, llegado al caso de que no se encuentre el id:
        // res.json(todo);

        //Se utiliza el ternario para poder validar el 404:
        (todo) 
            ? res.json(todo) 
            : res.status(404).json({error: `TODO with id ${id} not found`});

    }

    public createTodo = (req:Request, res:Response) => {
        //Se desestructura el body:
        const {text} = req.body;
        if(!text)  res.status(400).json({error: 'Text property is required'});

        const newTodo = {
            id: todos.length + 1,
            text: text,
            completedAt: null
        }

        todos.push(newTodo);

        res.json(newTodo);

    };


    public updateTodo = (req:Request, res:Response) => {

        const id = +req.params.id;
        if(isNaN(id)) res.status(400).json({error: 'ID argument is not a number'});
        
        const todo = todos.find(todo => todo.id === id);
        if(!todo) res.status(404).json({error: `Todo with id ${id} not found`});
        
        const {text, completedAt} = req.body;
        // if(!text) res.status(400).json({error: 'Text property is required'});

        todo!.text = text || todo!.text;

        (completedAt === 'null')
            ? todo!.completedAt = null
            : todo!.completedAt = new Date(completedAt) || todo!.completedAt;

        //! ojo, referencia

        // todos.forEach((todo, index) => {
        //     if(todo.id === id) {
        //          todos[index] = todo;
        //     }
        // });


        res.json(todo);
    };

    public deleteTodo = (req:Request, res:Response) => {
        
        const id = +req.params.id;
        if(isNaN(id)) res.status(400).json({error: 'ID argument is not a number'});
        
        const todo = todos.find(todo => todo.id === id);
        if(!todo) res.status(404).json({error: `Todo with id ${id} not found`});

        todos.splice(todos.indexOf(todo!), 1);

        res.json(todo);

    }


}


