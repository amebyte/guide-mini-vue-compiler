interface IStaff {
    getSalary(): string;
  }
  
  class Manager2 implements IStaff {
    getSalary() {
      return "I am paid too much";
    }
    level!: string;
  }
  
  class Developer2 implements IStaff {
    getSalary() {
      return `under paid`;
    }
  }
  
  const userMap2 = {
    dev: Developer,
    manager: Manager
  };
  type Keys2 = keyof typeof userMap2; // 'dev' | 'manager'
  type userTypes2 = typeof userMap2[Keys2]; //typeof Developer | typeof Manager
  type ExtractInstanceType2<T> = T extends new () => infer R ? R : never;
  
  class UserFactory2 {
    static getUser(k: Keys2): ExtractInstanceType2<userTypes2> {
      return new userMap2[k]();
    }
  }
  
  class UserService2 {
    getSalaryByUser(user: Keys2) {
      return UserFactory2.getUser(user).getSalary();
    }
  }
  
  console.log(
    "salary for manager: ",
    new UserService2().getSalaryByUser("manager")
  );
  console.log("salary for dev: ", new UserService2().getSalaryByUser("dev"));

  const obj = { a: 1, b: 'xx' }
  type keyObj = typeof obj