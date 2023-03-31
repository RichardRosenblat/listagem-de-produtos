import mongoose from 'mongoose';
const {
  Types: { ObjectId },
} = mongoose;

type databaseData = {
  _id: mongoose.Types.ObjectId;
  createdAt: string;
  updatedAt: string;
} & Record<string, any>;

export class ModelMock {
  private data: Record<string, any>;
  static memoryDatabase: databaseData[] = [];

  constructor(data: Record<string, any>) {
    this.data = data;
  }

  save = jest.fn(() => {
    const createdObj = {
      ...this.data,
      _id: new ObjectId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    ModelMock.memoryDatabase.push(createdObj);
    return { toObject: () => createdObj };
  });

  static resetMemoryDatabase = () => {
    ModelMock.memoryDatabase = [];
  };

  static find = jest.fn(() => {
    return {
      exec: () =>
        ModelMock.memoryDatabase.map((element) => ({
          toObject: () => element,
        })),
    };
  });

  static findOne = jest.fn(({ _id: id }: { _id: mongoose.Types.ObjectId }) => {
    return {
      exec: () => ({
        toObject: () =>
          ModelMock.memoryDatabase.find(
            (item) => item._id.toHexString() === id.toHexString(),
          ),
      }),
    };
  });

  static updateOne = jest.fn(
    ({ _id: id }: { _id: mongoose.Types.ObjectId }, data: any) => {
      return {
        exec: () => {
          const index = ModelMock.memoryDatabase.findIndex(
            (item) => item._id.toHexString() === id.toHexString(),
          );
          ModelMock.memoryDatabase[index] = {
            ...ModelMock.memoryDatabase[index],
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
          const index = ModelMock.memoryDatabase.findIndex(
            (item) => item._id.toHexString() === id.toHexString(),
          );
          ModelMock.memoryDatabase.splice(index, 1);
        },
      };
    },
  );
}
