interface IStaff {
  getSalary(): string;
}

class Manager1 implements IStaff {
  getSalary() {
    return "I am paid too much";
  }
  level1!: string;
}

class Developer1 implements IStaff {
  getSalary() {
    return `under paid`;
  }
}

const userMap1 = {
  dev: Developer,
  manager: Manager
};
type Keys1 = keyof typeof userMap; // 'dev' | 'manager'
type userTypes = typeof userMap[Keys1]; //typeof Developer | typeof Manager
type ExtractInstanceType<T> = T extends new () => infer R ? R : never;

class UserFactory1 {
  static getUser(k: Keys1): ExtractInstanceType<userTypes> {
    return new userMap[k]();
  }
}

class UserService1 {
  getSalaryByUser(user: Keys1) {
    return UserFactory1.getUser(user).getSalary();
  }
}

console.log(
  "salary for manager: ",
  new UserService1().getSalaryByUser("manager")
);
console.log("salary for dev: ", new UserService1().getSalaryByUser("dev"));