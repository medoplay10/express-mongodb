import { getDb } from "../../../util/database";
import { ObjectId, WithId } from "mongodb";

class Product {
  _id: ObjectId | undefined;
  title: string;
  price: number;
  description: string;
  imageUrl: string;
  userId: ObjectId;

  constructor(
   
    title: string,
    price: number,
    description: string,
    imageUrl: string,
    userId: ObjectId,
    id?: ObjectId,
  ) {
    this._id = id;
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this.userId = userId;
  }

  async save(): Promise<any> {
    const db = getDb();
    try {
      const result = await db.collection("products").insertOne(this);
      return { ...this, _id: result.insertedId };
    } catch (error) {
      throw error;
    }
  }

  static async fetchAll(): Promise<any[]> {
    const db = getDb();
    try {
      return await db.collection("products").find().toArray();
    } catch (error) {
      console.log("Error fetching products:", error);
      throw error;
    }
  }

  static async findById(idProduct: string): Promise<any> {
    const db = getDb();
    try {
      const objectId = new ObjectId(idProduct);
      console.log(objectId);
      return await db.collection("products").findOne({ _id: objectId });
    } catch (error) {
      throw error;
    }
  }

  static async update(
    idProduct: string,
    updateData: Partial<Product>
  ): Promise<any> {
    const db = getDb();
    try {
      const objectId = new ObjectId(idProduct);
      return await db.collection("products").updateOne(
        { _id: objectId },
        {
          $set: updateData,
        }
      );
    } catch (error) {
      throw error;
    }
  }

  static async deleteById(idProduct: string): Promise<any> {
    const db = getDb();
    try {
      const objectId = new ObjectId(idProduct);
      return await db.collection("products").deleteOne({ _id: objectId });
    } catch (error) {
      throw error;
    }
  }
}

export { Product };
