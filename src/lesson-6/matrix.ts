type matrixAxis = { X: number; Y: number; Z: number };

class Matrix3D {
  #array: any[];
  #rows: number;
  #cols: number;
  #deps: number;
  constructor(options: matrixAxis = { X: 0, Y: 0, Z: 0 }) {
    this.#rows = options.Y;
    this.#cols = options.X;
    this.#deps = options.Z;
    this.#array = new Array(options.X * options.Y * options.Z).fill(0);
  }

  #getIndex({ X, Y, Z }: matrixAxis) {
    if (Y >= this.#rows || X >= this.#cols) throw new ReferenceError("Indexes out of bound");
    return this.#cols * this.#rows * Z + this.#rows * Y + X;
  }

  set(position: matrixAxis, value: any) {
    this.#array[this.#getIndex(position)] = value;
  }
  get(position: matrixAxis) {
    return this.#array[this.#getIndex(position)];
  }

  log() {
    let result = [];

    for (let index = 0; index < this.#array.length; index++) {
      const element = this.#array[index] || " _ ";

      if (index % this.#cols === 0) {
        result.push([element]);
      } else {
        result[result.length - 1].push(element);
      }
    }

    console.log(result.join("\n"));
    console.log(this.#array);
  }
}

const matrix = new Matrix3D({ X: 4, Y: 3, Z: 2 });

matrix.set({ X: 2, Y: 1, Z: 0 }, 345);

matrix.log();
