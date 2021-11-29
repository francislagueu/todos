import { Logger, NotFoundException } from '@nestjs/common';
import { UserEntity } from 'src/user/models/user.entity';
import { toTodoDto } from 'src/utils/mapper';
import { EntityRepository, Repository } from 'typeorm';
import { TodoCreateDto } from './models/todo-create.dto';
import { TodoDto } from './models/todo.dto';
import { TodoEntity } from './models/todo.entity';

@EntityRepository(TodoEntity)
export class TodoRepository extends Repository<TodoEntity> {
  private logger = new Logger('TodoRepository');
  async createTodo(
    owner: UserEntity,
    todoDto: TodoCreateDto,
  ): Promise<TodoDto | null> {
    let todo = new TodoEntity();
    todo.title = todoDto.title;
    todo.description = todoDto.description;
    todo.owner = owner;
    todo = await this.save(todo);
    return toTodoDto(todo);
  }

  async getAllTodos(): Promise<TodoDto[]> {
    const todos = await this.find({ relations: ['owner'] });
    return todos.map((todo) => toTodoDto(todo));
  }

  async getOneTodo(condition: any): Promise<TodoDto> {
    const found = await this.findOne(condition);
    if (!found) {
      this.logger.error(`Todo not found.`);
      throw new NotFoundException(`Todo not found.`);
    }
    return toTodoDto(found);
  }

  async updateTodo(
    id: number,
    todoDto: Partial<TodoCreateDto>,
  ): Promise<TodoDto> {
    await this.update({ id }, todoDto);
    this.logger.log(`Todo with id ${id} updated.`);
    return await this.getOneTodo({ where: { id }, relations: ['owner'] });
  }

  async deleteTodo(id: number): Promise<void> {
    const result = await this.delete({ id });
    if (result.affected === 0) {
      this.logger.log(`Todo with id ${id} not found.`);
      throw new NotFoundException(`Todo with id ${id} not found.`);
    }
  }
}
