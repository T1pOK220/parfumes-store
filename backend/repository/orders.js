import { createError } from "../utilities/errorResponse.js";
class OrderRepository {
    constructor(db) {
        this.db = db;
    }
    async getAllOrdersByUser(userId) {
        const orders = await this.db.query("SELECT * FROM o orders JOIN order_items oi ON oi.order_id = o.id WHERE o.user_id=$1 RETURNING *",[userId]);
        return orders.rows ?? [];
    }
  async CreateOrder(items, userId) {
    const client = await this.db.connect();

    try {
      await client.query("BEGIN");
      if (!Array.isArray(items) || items.length === 0) {
        throw new Error("Кошик пустий");
      }
      for (const item of items) {
        if (
            !Number.isInteger(item.quantity) ||
            item.quantity <= 0
        ) {
            throw new Error("Некоректна кількість товару");
        }
      }
      const quantities = new Map();
      for (const item of items) {
        const id = item.parfume_id;

        quantities.set(
            id,
            (quantities.get(id) || 0) + item.quantity
        );
      }
      const parfumeIds = [...quantities.keys()].sort((a, b) => a - b);
      const parfumes = new Map();
      let sum = 0;
      for (const id of parfumeIds) {
          const { rows } = await client.query(
             `SELECT id, name, price, stock
             FROM parfumes
             WHERE id = $1
             FOR UPDATE`,
            [id]
        );

        if (rows.length === 0) {
            throw new Error(`Парфум ${id} не знайдено`);
        }

        const parfume = rows[0];
        const quantity = quantities.get(id);

        if (parfume.stock < quantity) {
            throw new Error(
                `Недостатньо товару "${parfume.name}" на складі`
            );
        }

        parfumes.set(id, parfume);
        sum += quantity * Number(parfume.price);
      }
      const { rows: orderRows } = await client.query(`INSERT INTO orders (user_id, status, sum) VALUES ($1, $2, $3) RETURNING *`,[userId, "Створено", sum]);
      const order = orderRows[0];
      for (const id of parfumeIds) {
        const parfume = parfumes.get(id);
        const quantity = quantities.get(id);

        const { rowCount } = await client.query(
            `UPDATE parfumes
             SET stock = stock - $1
             WHERE id = $2 AND stock >= $1`,
            [quantity, id]
        );

        if (rowCount !== 1) {
            throw new Error("Не вдалося списати товар");
        }

        await client.query(
            `INSERT INTO order_items
                (order_id, parfume_id, quantity, price)
             VALUES ($1, $2, $3, $4)`,
            [order.id, id, quantity, parfume.price]
        );
      }

      await client.query("COMMIT");

      return order.rows[0]??null;
  }   catch (error) {
       await client.query("ROLLBACK");
       throw createError("BAD_REQUEST", error, error.message, 400);
  } finally {
    client.release();
  }

  }
}
export default OrderRepository;