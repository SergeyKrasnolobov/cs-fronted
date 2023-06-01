type matrixAxises = { X: number; Y: number };

class Matrix {
  array;
  #rows;
  #cols;
  constructor(
    options: matrixAxises = {
      X: 4,
      Y: 4,
    }
  ) {
    this.#rows = options.Y;
    this.#cols = options.X;
    this.array = new Array(options.X * options.Y).fill(0);
  }

  #getIndex({ X, Y }: matrixAxises) {
    return this.#cols * Y + X;
  }

  set(position: matrixAxises, value: any) {
    this.array[this.#getIndex(position)] = value;
  }
  get(position: matrixAxises) {
    return this.array[this.#getIndex(position)];
  }

  *[Symbol.iterator]() {
    for (let row = 0; row < this.#rows; row++) {
      for (let col = 0; col < this.#cols; col++) {
        yield [{ row, col }, this.get({ Y: row, X: col })];
      }
    }
  }

  clone() {
    const newMatrix = new Matrix({ X: this.#rows, Y: this.#cols });
    newMatrix.array = this.array.slice();
    return newMatrix;
  }
}

class Vertex {
  value;
  neighbors;
  constructor(value: string | number, neighbors: Vertex[]) {
    this.value = value;
    this.neighbors = neighbors;
  }
}

class Graph {
  size;
  matrix;
  type: "directed" | "undirected";
  constructor(size: number, typeGraph: "directed" | "undirected" = "undirected") {
    this.size = size;
    this.type = typeGraph;
    this.matrix = new Matrix({ X: size, Y: size });
  }

  setRelation(from: string, to: string) {
    if (this.type === "undirected") {
      this.matrix.set({ X: this.#getPos(to), Y: this.#getPos(from) }, 1);
    }
  }
  hasRelation(from: string, to: string) {
    const hasRel = this.matrix.get({ X: this.#getPos(to), Y: this.#getPos(from) }) === 1 ? true : false;
    console.log({ hasRel });
    return hasRel;
  }

  #getPos(letter: string) {
    return letter.charCodeAt(0) - "a".charCodeAt(0);
  }

  createTransitiveClosure() {
    const newGraph = new Graph(this.size);
    newGraph.matrix = this.matrix.clone();

    //Warshall algorithm
    for (let y = 0; y < this.size; y++) {
      for (let x = 0; x < this.size; x++) {
        if (this.matrix.get({ Y: y, X: x }) === 1) {
          for (let z = 0; z < this.size; z++) {
            if (this.matrix.get({ Y: z, X: y }) === 1) {
              newGraph.matrix.set({ Y: z, X: x }, 1);
            }
          }
        }
      }
    }

    return newGraph;
  }
}

const graph = new Graph(4);

graph.setRelation("a", "b");
graph.setRelation("b", "c");

graph.hasRelation("a", "c");

graph.createTransitiveClosure().hasRelation("a", "c");

const graph2 = [
  {
    value: "Стать человеком",
    relation: ["Жениться", "Дети", "Высшее образование"],
  },
  {
    value: "Дети",
    relation: ["Жениться"],
  },
  {
    value: "Жениться",
    relation: ["Высшее образование"],
  },
  {
    value: "Высшее образование",
    relation: ["Закончить школу"],
  },
  {
    value: "Закончить школу",
    relation: ["Родиться"],
  },
  {
    value: "Родиться",
  },
];
const sort = (graph: { value: any; relation?: any }[]) => {
  const map = new Map(
    graph.map(({ value, relation }) => {
      return [value, { value, relation }];
    })
  );
  const set = new Set();
  graph.forEach(({ value }) => traverse(value));
  function traverse(value: any) {
    const { relation } = map.get(value)!;

    if (set.has(value)) {
      return;
    }
    if (!relation) {
      set.add(value);
      return;
    }
    relation.forEach((val: any) => traverse(val));
    set.add(value);
  }

  return set;
};

console.log(sort(graph2));
