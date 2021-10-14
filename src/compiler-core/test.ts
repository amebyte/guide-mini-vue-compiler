class Point {
    x: number;
    y: number;
    constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
    }
  }

class ChildPoint extends Point {
    
}

  function createInstance(TheClass: new (x: number, y: number) => Point, x: number, y: number) {
    return new TheClass(x, y);
  }

  const point = createInstance(ChildPoint, 3, 6);
console.log(point instanceof Point);