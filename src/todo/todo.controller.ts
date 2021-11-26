import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { TodoCreateDto } from './models/todo-create.dto';
import { TodoEntity } from './models/todo.entity';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  private logger = new Logger('TodoController');

  constructor(private todoService: TodoService) {}

  @Get()
  getAllTodos(): Promise<TodoEntity[]> {
    return this.todoService.getAllTodos();
  }

  @Get('/:id')
  getTodoById(@Param('id', ParseIntPipe) id: number): Promise<TodoEntity> {
    return this.todoService.getOneTodo({ id });
  }

  @Post('/create')
  createTodo(@Body() todoDto: TodoCreateDto): Promise<TodoEntity> {
    return this.todoService.createTodo(todoDto);
  }

  @Patch('/:id')
  updateTodo(
    @Param('id', ParseIntPipe) id: number,
    @Body() todoDto: Partial<TodoCreateDto>,
  ): Promise<TodoEntity> {
    return this.todoService.updateTodo(id, todoDto);
  }

  @Delete('/:id')
  deleteTodo(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.todoService.deleteTodo(id);
  }
}
