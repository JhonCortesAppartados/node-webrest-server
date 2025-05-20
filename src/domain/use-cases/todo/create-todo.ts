import { CreateTodoDto } from "../../dtos";
import { TodoEntity } from "../../entities/todo.entity";
import { TodoReopository } from "../../repositories/todo.repository";


export interface CreateTodoUseCase {
    execute (dto: CreateTodoDto): Promise <TodoEntity>
}

export class CreateTodo implements CreateTodoUseCase {

    constructor(
        private readonly repository: TodoReopository,
    ){}   
    execute(dto: CreateTodoDto): Promise<TodoEntity> {
        return this.repository.create(dto);
    }
}