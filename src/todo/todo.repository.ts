import { Logger, NotFoundException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { TodoCreateDto } from './models/todo-create.dto';
import { TodoEntity } from './models/todo.entity';

@EntityRepository(TodoEntity)
export class TodoRepository extends Repository<TodoEntity> {
  private logger = new Logger('TodoRepository');
  async createTodo(todoDto: TodoCreateDto): Promise<TodoEntity | null> {
    const todo = new TodoEntity();
    todo.title = todoDto.title;
    todo.description = todoDto.description;
    return await this.save(todo);
  }

  async getAllTodos(): Promise<TodoEntity[]> {
    return await this.find();
  }

  async getOneTodo(condition: any): Promise<TodoEntity> {
    const found = await this.findOne(condition);
    if (!found) {
      this.logger.error(`Todo not found.`);
      throw new NotFoundException(`Todo not found.`);
    }
    return found;
  }

  async updateTodo(
    id: number,
    todoDto: Partial<TodoCreateDto>,
  ): Promise<TodoEntity> {
    await this.update({ id }, todoDto);
    this.logger.log(`Todo with id ${id} updated.`);
    return await this.getOneTodo({ id });
  }

  async deleteTodo(id: number): Promise<void> {
    const result = await this.delete({ id });
    if (result.affected === 0) {
      this.logger.log(`Todo with id ${id} not found.`);
      throw new NotFoundException(`Todo with id ${id} not found.`);
    }
  }
}
