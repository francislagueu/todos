import { TodoDto } from 'src/todo/models/todo.dto';
import { TodoEntity } from 'src/todo/models/todo.entity';
import { UserDto } from 'src/user/models/user.dto';
import { UserEntity } from 'src/user/models/user.entity';

export const toUserDto = (user: UserEntity): UserDto => {
  const userDto: UserDto = {
    id: user.id,
    username: user.username,
    email: user.email,
    createOn: user.createOn,
    updateOn: user.updateOn,
  };
  return userDto;
};

export const toTodoDto = (todo: TodoEntity): TodoDto => {
  const todoDto: TodoDto = {
    id: todo.id,
    title: todo.title,
    description: todo.description,
    isActive: todo.isActive,
    status: todo.status,
    owner: todo.owner ? toUserDto(todo.owner) : null,
  };
  return todoDto;
};
