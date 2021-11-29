import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UserEntity } from 'src/user/models/user.entity';
import { UserModule } from 'src/user/user.module';
import { TodoEntity } from './models/todo.entity';
import { TodoController } from './todo.controller';
import { TodoRepository } from './todo.repository';
import { TodoService } from './todo.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TodoEntity, TodoRepository, UserEntity]),
    UserModule,
    AuthModule,
  ],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
