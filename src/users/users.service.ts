import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const emailNormalized = createUserDto.email.toLowerCase().trim();

    const exists = await this.userRepository.findOneBy({ email: emailNormalized });
    if (exists) {
      throw new ConflictException(`User with email ${createUserDto.email} already exists`);
    }

    const usernameTrimmed = createUserDto.username.trim();
    const usernameExists = await this.userRepository.findOneBy({ username: usernameTrimmed });
    if (usernameExists) {
      throw new ConflictException(`User with username ${createUserDto.username} already exists`);
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

    const user = this.userRepository.create({
      ...createUserDto,
      email: emailNormalized,
      password: hashedPassword,
    });

    const savedUser = await this.userRepository.save(user);

    delete (savedUser as any).password;
    return savedUser;
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({
      where: { email: email.toLowerCase().trim() },
    });
  }

  async findByEmailWithPassword(email: string): Promise<User | null> {
    return await this.userRepository.findOne({
      where: { email: email.toLowerCase().trim() },
      select: ['id', 'email', 'username', 'password'],
    });
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }
}
