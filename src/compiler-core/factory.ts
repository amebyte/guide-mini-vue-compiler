interface IStaff {
    getSalary(): void;
  }
  
  class Manager implements IStaff {
    getSalary() {
      return "I am paid too much";
    }
  }
  
  class Developer implements IStaff {
    getSalary() {
      return `under paid`;
    }
  }
  
  const userMap = {
    dev: Developer,
    manager: Manager
  };
  type UserMap = typeof userMap;
  type Keys = keyof UserMap; // 'dev' | 'manager'
  type Tuples<T> = T extends Keys ? [T, InstanceType<UserMap[T]>] : never;
  type SingleKeys<K> = [K] extends (K extends Keys ? [K] : never) ? K : never;
  type ClassType<K extends Keys> = Extract<Tuples<Keys>, [K, any]>[1];
  
  class UserFactory {
    static getUser<K extends Keys>(k: SingleKeys<K>): ClassType<K> {
      return new userMap[k]();
    }
  }
  
  class UserService {
    getSalaryByUser<K extends Keys>(user: SingleKeys<K>) {
      return UserFactory.getUser(user).getSalary();
    }
  }
  
  const developer = UserFactory.getUser("dev");
  const manager = UserFactory.getUser("manager");
  
  console.log(
    "salary for manager: ",
    new UserService().getSalaryByUser("manager")
  );
  console.log("salary for dev: ", new UserService().getSalaryByUser("dev"));

