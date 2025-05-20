import { TodoEntity } from "../../entities/todo.entity";
import { TodoReopository } from "../../repositories/todo.repository";


export interface DeleteTodoUseCase {
    execute (id: number): Promise <TodoEntity>
}

export class DeleteTodo implements DeleteTodoUseCase {

    constructor(
        private readonly repository: TodoReopository,
    ){}   
    execute(id: number): Promise<TodoEntity> {
        return this.repository.deleteById(id);
    }
}