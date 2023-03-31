import mongoose from 'mongoose';
const {
  Types: { ObjectId },
} = mongoose;

type databaseData = {
  _id: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
} & Record<string, any>;

export const memoryDatabase: databaseData[] = [];

export class modelMock {
  data: Record<string, any>;

  constructor(data: Record<string, any>) {
    this.data = data;
  }

  save = jest.fn(() => {
    const createdObj = {
      ...this.data,
      _id: new ObjectId(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    memoryDatabase.push(createdObj);
    return { toObject: () => createdObj };
  });

  static find = jest.fn(() => {
    return {
      exec: () =>
        memoryDatabase.map((element) => ({ toObject: () => element })),
    };
  });

  static findOne = jest.fn(({ _id: id }: { _id: mongoose.Types.ObjectId }) => {
    return {
      exec: () => ({
        toObject: () =>
          memoryDatabase.find(
            (item) => item._id.toHexString() === id.toHexString(),
          ),
      }),
    };
  });

  static updateOne = jest.fn(
    ({ _id: id }: { _id: mongoose.Types.ObjectId }, data: any) => {
      return {
        exec: () => {
          const index = memoryDatabase.findIndex(
            (item) => item._id.toHexString() === id.toHexString(),
          );
          memoryDatabase[index] = {
            ...memoryDatabase[index],
            ...data,
            updatedAt: new Date(),
          };
        },
      };
    },
  );

  static deleteOne = jest.fn(
    ({ _id: id }: { _id: mongoose.Types.ObjectId }) => {
      return {
        exec: () => {
          const index = memoryDatabase.findIndex(
            (item) => item._id.toHexString() === id.toHexString(),
          );
          memoryDatabase.splice(index, 1);
        },
      };
    },
  );
}
