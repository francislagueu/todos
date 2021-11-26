import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoCreateDto } from './models/todo-create.dto';
import { TodoEntity } from './models/todo.entity';
import { TodoRepository } from './todo.repository';

@Injectable()
export class TodoService {
  private logger = new Logger('TodoService');

  constructor(
    @InjectRepository(TodoRepository) private todoRepository: TodoRepository,
  ) {}

  async getAllTodos(): Promise<TodoEntity[]> {
    return await this.todoRepository.getAllTodos();
  }

  async getOneTodoById(id: number): Promise<TodoEntity> {
    return await this.todoRepository.getOneTodo({ id });
  }

  async getOneTodo(condition: any): Promise<TodoEntity> {
    return await this.todoRepository.getOneTodo(condition);
  }

  async createTodo(todoDto: TodoCreateDto): Promise<TodoEntity> {
    return await this.todoRepository.createTodo(todoDto);
  }

  async updateTodo(
    id: number,
    todoDto: Partial<TodoCreateDto>,
  ): Promise<TodoEntity> {
    return await this.todoRepository.updateTodo(id, todoDto);
  }

  async deleteTodo(id: number): Promise<void> {
    return await this.todoRepository.deleteTodo(id);
  }
}
