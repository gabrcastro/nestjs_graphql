import { User } from '../../../user/entities/user';

export default class TestUtil {
  static giveMeAValidaUser(): User {
    const user = new User();
    user.id = 1;
    user.name = 'John Doe';
    user.email = 'john.doe@example.com';

    return user;
  }
}
