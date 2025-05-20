import { TodoEntity } from "../../entities/todo.entity";
import { TodoReopository } from "../../repositories/todo.repository";


export interface GetTodosUseCase {
    execute (): Promise <TodoEntity[]>
}

export class GetTodos implements GetTodosUseCase {

    constructor(
        private readonly repository: TodoReopository,
    ){}   
    execute(): Promise<TodoEntity[]> {
        return this.repository.getAll();
    }
}