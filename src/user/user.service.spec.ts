import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user';
import TestUtil from './common/test/test-util';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

describe('UserService', () => {
  let service: UserService;

  const mockRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  beforeEach(() => {
    mockRepository.find.mockReset();
    mockRepository.findOne.mockReset();
    mockRepository.create.mockReset();
    mockRepository.save.mockReset();
    mockRepository.update.mockReset();
    mockRepository.delete.mockReset();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('find all', () => {
    it('should be list all users', async () => {
      const user = TestUtil.giveMeAValidaUser();
      mockRepository.find.mockReturnValue([user, user]);
      const users = await service.findAll();

      expect(users).toHaveLength(2);
      expect(mockRepository.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('find user by id', () => {
    it('should find a existing user', async () => {
      const user = TestUtil.giveMeAValidaUser();
      mockRepository.findOne.mockReturnValue(user);
      const foundUser = await service.findUserById(1);

      expect(foundUser).toMatchObject({ name: user.name });
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
    });

    it('should return a exception when does not to find a user', async () => {
      mockRepository.findOne.mockReturnValue(null);

      expect(service.findUserById(1)).rejects.toBeInstanceOf(NotFoundException);
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('create user', () => {
    it('should create a user', async () => {
      const user = TestUtil.giveMeAValidaUser();
      mockRepository.create.mockReturnValue(user);
      mockRepository.save.mockReturnValue(user);
      const createdUser = await service.create({
        name: user.name,
        email: user.email,
      });

      expect(createdUser).toMatchObject({ name: user.name, email: user.email });
      expect(mockRepository.create).toHaveBeenCalledTimes(1);
      expect(mockRepository.save).toHaveBeenCalledTimes(1);
    });

    it('should return a exception when doesnt create a user', async () => {
      const user = TestUtil.giveMeAValidaUser();
      mockRepository.create.mockReturnValue(user);
      mockRepository.save.mockReturnValue(null);
      const createdUser = await service
        .create({
          name: user.name,
          email: user.email,
        })
        .catch((err) => {
          expect(err).toBeInstanceOf(InternalServerErrorException);
          expect(err).toMatchObject({ message: 'Error to create a user' });
        });

      expect(mockRepository.create).toHaveBeenCalledTimes(1);
      expect(mockRepository.save).toHaveBeenCalledTimes(1);
    });
  });

  describe('update user', () => {
    it('should update a user', async () => {
      const user = TestUtil.giveMeAValidaUser();
      mockRepository.findOne.mockReturnValue(user);
      mockRepository.update.mockReturnValue({
        ...user,
        name: 'Updated John Doe',
      });
      mockRepository.create.mockReturnValue({
        ...user,
        name: 'Updated John Doe',
      });
      const updatedUser = await service.update(1, {
        ...user,
        name: 'Updated John Doe',
      });

      expect(updatedUser).toMatchObject(updatedUser);
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
      expect(mockRepository.update).toHaveBeenCalledTimes(1);
      expect(mockRepository.create).toHaveBeenCalledTimes(1);
    });

    it('should return a exception when doesnt create a user', async () => {
      const user = TestUtil.giveMeAValidaUser();
      mockRepository.findOne.mockReturnValue(user);
      mockRepository.update.mockReturnValue({
        ...user,
        name: 'Updated John Doe',
      });

      const updatedUser = await service
        .update(1, {
          ...user,
          name: 'Updated John Doe',
        })
        .catch((err) => {
          expect(err).toBeInstanceOf(InternalServerErrorException);
          expect(err).toMatchObject({ message: 'Error to update a user' });
        });

      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
      expect(mockRepository.update).toHaveBeenCalledTimes(1);
    });

    describe('delete user', () => {
      it('should delete a existing user', async () => {
        const user = TestUtil.giveMeAValidaUser();
        mockRepository.delete.mockReturnValue(user);
        mockRepository.findOne.mockReturnValue(user);
        const deletedUser = await service.delete(1);

        expect(deletedUser).toBe(true);
        expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
        expect(mockRepository.delete).toHaveBeenCalledTimes(1);
      });

      it('shouldnt delete a existing user', async () => {
        const user = TestUtil.giveMeAValidaUser();
        mockRepository.delete.mockReturnValue(null);
        mockRepository.findOne.mockReturnValue(user);
        const deletedUser = await service.delete(9);

        expect(deletedUser).toBe(false);
        expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
        expect(mockRepository.delete).toHaveBeenCalledTimes(1);
      });
    });
  });
});
