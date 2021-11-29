import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/models/user.entity';
import { UserService } from 'src/user/user.service';
import { TodoCreateDto } from './models/todo-create.dto';
import { TodoDto } from './models/todo.dto';
import { TodoRepository } from './todo.repository';

@Injectable()
export class TodoService {
  private logger = new Logger('TodoService');

  constructor(
    @InjectRepository(TodoRepository) private todoRepository: TodoRepository,
    private readonly userService: UserService,
  ) {}

  async getAllTodos(): Promise<TodoDto[]> {
    return await this.todoRepository.getAllTodos();
  }

  async getOneTodoById(id: number): Promise<TodoDto> {
    return await this.todoRepository.getOneTodo({
      where: { id },
      relations: ['owner'],
    });
  }

  async getOneTodo(condition: any): Promise<TodoDto> {
    return await this.todoRepository.getOneTodo(condition);
  }

  async createTodo(
    owner: UserEntity,
    todoDto: TodoCreateDto,
  ): Promise<TodoDto> {
    return await this.todoRepository.createTodo(owner, todoDto);
  }

  async updateTodo(
    id: number,
    todoDto: Partial<TodoCreateDto>,
  ): Promise<TodoDto> {
    return await this.todoRepository.updateTodo(id, todoDto);
  }

  async deleteTodo(id: number): Promise<void> {
    return await this.todoRepository.deleteTodo(id);
  }
}
