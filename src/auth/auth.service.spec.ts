import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt');

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;
  let configService: ConfigService;

  const mockUser = {
    id: 'user-id',
    email: 'user@example.com',
    username: 'testuser',
    password: 'hashed-password',
  };

  const mockUsersService = {
    findByEmailWithPassword: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn().mockReturnValue('mock-token'),
  };

  const mockConfigService = {
    get: jest.fn().mockImplementation((key, defaultValue) => defaultValue),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: mockUsersService },
        { provide: JwtService, useValue: mockJwtService },
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
    configService = module.get<ConfigService>(ConfigService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('login', () => {
    it('should throw UnauthorizedException if user not found', async () => {
      mockUsersService.findByEmailWithPassword.mockResolvedValue(null);

      await expect(
        authService.login({ email: 'wrong@example.com', password: 'password' }),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException if password is invalid', async () => {
      mockUsersService.findByEmailWithPassword.mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(
        authService.login({ email: 'user@example.com', password: 'wrongpassword' }),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should successfully log in and generate token with default configuration when rememberMe is false', async () => {
      mockUsersService.findByEmailWithPassword.mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await authService.login({
        email: 'user@example.com',
        password: 'password',
        rememberMe: false,
      });

      expect(usersService.findByEmailWithPassword).toHaveBeenCalledWith('user@example.com');
      expect(jwtService.sign).toHaveBeenCalledWith({ sub: mockUser.id, email: mockUser.email }, {});
      expect(result).toEqual({
        user: { id: mockUser.id, email: mockUser.email, username: mockUser.username },
        token: 'mock-token',
      });
    });

    it('should successfully log in and generate token with extended expiration when rememberMe is true', async () => {
      mockUsersService.findByEmailWithPassword.mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      mockConfigService.get.mockReturnValue('7d');

      const result = await authService.login({
        email: 'user@example.com',
        password: 'password',
        rememberMe: true,
      });

      expect(jwtService.sign).toHaveBeenCalledWith(
        { sub: mockUser.id, email: mockUser.email },
        { expiresIn: '7d' },
      );
      expect(configService.get).toHaveBeenCalledWith('JWT_REMEMBER_ME_EXPIRATION', '7d');
      expect(result).toEqual({
        user: { id: mockUser.id, email: mockUser.email, username: mockUser.username },
        token: 'mock-token',
      });
    });
  });
});
