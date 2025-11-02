// event_service/src/rabbitmq/consumer.js
const amqplib = require("amqplib");
const { AMQP_EXCHANGE, ORG_DELETED } = require("../constants/events");
// const Event = require("../models/Event"); // Event model not available in engagement service

class Consumer {
  constructor(amqpUrl) {
    this.amqpUrl = amqpUrl || process.env.RABBIT_URL || "amqp://localhost";
    this.conn = null;
    this.channel = null;
    this.queue = "engagement_service_queue"; // Changed to engagement
  }

  async init() {
    this.conn = await amqplib.connect(this.amqpUrl);
    this.channel = await this.conn.createChannel();
    await this.channel.assertExchange(AMQP_EXCHANGE, "topic", { durable: true });
    await this.channel.assertQueue(this.queue, { durable: true });
    await this.channel.bindQueue(this.queue, AMQP_EXCHANGE, ORG_DELETED);
    console.log("Consumer connected and bound to", ORG_DELETED);
    this.startConsume();
  }

  async startConsume() {
    if (!this.channel) {
      throw new Error("Channel not initialized");
    }

    this.channel.consume(this.queue, async (msg) => {
      if (!msg) return;
      try {
        const payload = JSON.parse(msg.content.toString());
        console.log("Received message:", payload);

        // Engagement service doesn't handle organization deletions directly
        // If needed, add logic here for engagement-related cleanup
        console.log("Organization deleted event received, but no action taken in engagement service");

        this.channel.ack(msg);
      } catch (err) {
        console.error("Error handling message:", err);
        // Nack and requeue (or send to DLQ if you configure one)
        this.channel.nack(msg, false, false); // do not requeue to avoid infinite loops by default
      }
    }, { noAck: false });
  }

  async close() {
    try {
      if (this.channel) await this.channel.close();
      if (this.conn) await this.conn.close();
    } catch (e) {
      console.warn("Error closing consumer:", e.message);
    }
  }
}

module.exports = Consumer;
