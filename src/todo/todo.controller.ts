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
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from 'src/user/user.service';
import { TodoCreateDto } from './models/todo-create.dto';
import { TodoDto } from './models/todo.dto';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  private logger = new Logger('TodoController');

  constructor(
    private todoService: TodoService,
    private userService: UserService,
  ) {}

  @Get()
  getAllTodos(): Promise<TodoDto[]> {
    return this.todoService.getAllTodos();
  }

  @Get('/:id')
  getTodoById(@Param('id', ParseIntPipe) id: number): Promise<TodoDto> {
    return this.todoService.getOneTodo({ where: { id }, relations: ['owner'] });
  }

  @Post('/create')
  @UseGuards(AuthGuard())
  async createTodo(
    @Body() todoDto: TodoCreateDto,
    @Req() req: any,
  ): Promise<TodoDto> {
    const { username } = req.user;
    const owner = await this.userService.getOneUser({ username });
    return this.todoService.createTodo(owner, todoDto);
  }

  @Patch('/:id')
  @UseGuards(AuthGuard())
  updateTodo(
    @Param('id', ParseIntPipe) id: number,
    @Body() todoDto: Partial<TodoCreateDto>,
  ): Promise<TodoDto> {
    return this.todoService.updateTodo(id, todoDto);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard())
  deleteTodo(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.todoService.deleteTodo(id);
  }
}
