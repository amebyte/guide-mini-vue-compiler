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
    dev: Developer2,
    manager: Manager2
  };
  type Keys2 = keyof typeof userMap2; // 'dev' | 'manager'
  type userTypes2 = typeof userMap2[Keys2]; //typeof Developer | typeof Manager
  type ExtractInstanceType2<T> = T extends new () => infer R ? R : never;
//   type a = typeof Developer2 | typeof Manager2 
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
  type keyObj = keyof typeof obj


//   type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;

function t() {

}
type tt = typeof t

type at = {b: number, c: string}

const a: at = {b: 1, c: 'xx'}
const b: at = {b: 2, c: 'oo'}
type aa = keyof typeof a

type aa1 = keyof typeof b

// 泛型
type Dog<T> = { name: string, type: T }

const dog: Dog<number> = { name: 'litter dog', type: 1 }

function addDog<T>(dog: Dog<T>) { return dog }

// 泛型约束
type n = number

function sum(arr: number[]): number {
    let count = 0
    arr.forEach(val => {
        count = count + val
    });
    return count
}

sum([1, 2, 3])

type D = { name: string, age: number }

function test<T extends D>(d:T): T {
    return d
}

const d1 = { name: 'd1', age: 1, type: 2 }
test(d1)
test({name: 'tt', age: 3})

// 支持多个泛型参数

function pick<T, U extends T>() {}

type DD = { name: string, age: number }
type DD1 = { name: string, age: number, type: number }

pick<DD, DD1>()

// extends 也可以当做一个三元运算符来使用

function tt<T, U>(v: T extends U ? string : number) {}
tt<DD1, DD>('sdff')

// 泛型推断 infer
type Foo<T> = T extends { t: infer T1 } ? T1 : number
type F2 = Foo<{t: 'xxx'}>
