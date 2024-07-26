import { getDb } from "../../../util/database";
import { ObjectId } from "mongodb";
import { Product } from "../../product/models/product";

class User {
  _id: ObjectId | undefined;
  username: string;
  email: string;
  cart: { items: any[] };

  constructor(
    username: string,
    email: string,
    cart?: { items: any[] },
    id?: ObjectId
  ) {
    this._id = id;
    this.username = username;
    this.email = email;
    this.cart = cart ? cart : { items: [] };
    this.cart.items = cart ? cart.items : [];
  }

  async save(): Promise<any> {
    const db = getDb();
    try {
      return await db.collection("users").insertOne(this);
    } catch (error) {
      throw error;
    }
  }
  async addProductToCart(product: Product, quantity: number) {
    const cartProductIndex = this.cart.items.findIndex((item) => {
      return item.productId.toString() === product._id!.toString();
    });
    const updateCartItems = [...this.cart.items];

    if (cartProductIndex >= 0) {
      updateCartItems[cartProductIndex].quantity += quantity;
    } else {
      updateCartItems.push({ productId: new ObjectId(product._id), quantity });
    }

    const db = getDb();
    const userId = new ObjectId(this._id);

    try {
      return await db.collection("users").updateOne(
        {
          _id: userId,
        },
        {
          $set: { cart: { items: updateCartItems } },
        }
      );
    } catch (error) {
      throw error;
    }
  }

  async getMyCart() {
    const db = getDb();
    try {
      const listProductId = this.cart.items.map((item) => {
        return item.productId;
      });
      console.log("listProductId", listProductId);
      const products = await db
        .collection("products")
        .find({ _id: { $in: listProductId } })
        .toArray();
      console.log("products", products);

      const cartItems = products.map((product) => {
        const item = this.cart.items.find((item) => {
          return item.productId.toString() === product._id.toString();
        });
        return {
          ...product,
          quantity: item.quantity,
        };
      });
      console.log("cart", cartItems);

      return cartItems;
    } catch (error) {
      throw error;
    }
  }

  async deleteItemFromCart(productId: string) {
    const productObjectId = new ObjectId(productId);
    const db = getDb();
    try {
      const cartItems = this.cart.items.filter((item) => {
        console.log("item.productId", item.productId);
        console.log("productObjectId", productObjectId);
        return item.productId.toString() != productObjectId.toString();
      });

      return await db.collection("users").updateOne(
        { _id: this._id },
        {
          $set: {
            cart: {
              items: cartItems,
            },
          },
        }
      );
    } catch (error) {
      throw error;
    }
  }

  async addOrder() {
    const db = getDb();
    const cartItems = await this.getMyCart();
    const orderModel = {
      items: cartItems,
      user: {
        _id: this._id,
        name: this.username,
      },
    };

    try {
      const order = await db.collection("orders").insertOne(orderModel);
      await db.collection("users").updateOne(
        { _id: this._id },
        {
          $set: {
            cart: {
              items: [],
            },
          },
        }
      );
      return order;
    } catch (error) {
      throw error;
    }
  }

  async getOrders() {
    const db = getDb();
    try {
      return await db
        .collection("orders")
        .find({ "user._id": this._id })
        .toArray();
    } catch (error) {
      throw error;
    }
  }
  static async fetchAll(): Promise<any[]> {
    const db = getDb();
    try {
      return await db.collection("users").find().toArray();
    } catch (error) {
      throw error;
    }
  }

  static async findById(idUser: string): Promise<any> {
    const db = getDb();
    try {
      const userId = new ObjectId(idUser);
      return await db.collection("users").findOne({ _id: userId });
    } catch (error) {
      throw error;
    }
  }
}

export { User };
