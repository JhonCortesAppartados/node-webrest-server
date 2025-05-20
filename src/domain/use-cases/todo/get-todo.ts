import { TodoEntity } from "../../entities/todo.entity";
import { TodoReopository } from "../../repositories/todo.repository";


export interface GetTodoUseCase {
    execute (id: number): Promise <TodoEntity>
}

export class GetTodo implements GetTodoUseCase {

    constructor(
        private readonly repository: TodoReopository,
    ){}   
    execute(id: number): Promise<TodoEntity> {
        return this.repository.findById(id);
    }
}