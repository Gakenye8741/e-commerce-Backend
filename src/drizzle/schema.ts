import {
  pgTable,
  serial,
  varchar,
  integer,
  numeric,
  timestamp,
  boolean,
  text,
  pgEnum,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// ========== ENUMS ==========
export const paymentStatusEnum = pgEnum("payment_status", [
  "pending",
  "completed",
  "failed",
]);

export const userRoleEnum = pgEnum("user_role", ["user", "admin"]);

// ========== TABLES ==========

// Users
export const users = pgTable("users", {
  userId: serial("userId").primaryKey(),
  firstName: varchar("firstName", { length: 255 }).notNull(),
  lastName: varchar("lastName", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  emailVerified: boolean("emailVerified").notNull().default(false),
  confirmationCode: varchar("confirmationCode", { length: 255 }).default(""),
  password: varchar("password", { length: 255 }).notNull(),
  contactPhone: varchar("contactPhone", { length: 20 }),
  address: text("address"),
  profileImageUrl: text("profileImageUrl"),
  role: userRoleEnum("role").notNull().default("user"),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});

// Categories
export const categories = pgTable("categories", {
  categoryId: serial("categoryId").primaryKey(),
  name: varchar("name", { length: 255 }).notNull().unique(),
  description: text("description"),
  imageUrl: varchar("imageUrl"),
  createdAt: timestamp("createdAt").defaultNow(),
});

// Subcategories
export const subcategories = pgTable("subcategories", {
  subcategoryId: serial("subcategoryId").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  imageUrl: varchar('imageUrl'),
  description: text("description"),
  categoryId: integer("categoryId")
    .references(() => categories.categoryId)
    .notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
});

// Products
export const products = pgTable("products", {
  productId: serial("productId").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  stock: integer("stock").notNull(),
  subcategoryId: integer("subcategoryId")
    .references(() => subcategories.subcategoryId)
    .notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
});

// Images
export const images = pgTable("images", {
  imageId: serial("imageId").primaryKey(),
  productId: integer("productId")
    .references(() => products.productId)
    .notNull(),
  url: varchar("url", { length: 500 }).notNull(),
  alt: varchar("alt", { length: 255 }),
});

// Orders
export const orders = pgTable("orders", {
  orderId: serial("orderId").primaryKey(),
  userId: integer("userId")
    .references(() => users.userId)
    .notNull(),
  totalAmount: numeric("totalAmount", { precision: 10, scale: 2 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
});

// Order Items
export const orderItems = pgTable("orderItems", {
  orderItemId: serial("orderItemId").primaryKey(),
  orderId: integer("orderId")
    .references(() => orders.orderId)
    .notNull(),
  productId: integer("productId")
    .references(() => products.productId)
    .notNull(),
  quantity: integer("quantity").notNull(),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
});

// Reviews
export const reviews = pgTable("reviews", {
  reviewId: serial("reviewId").primaryKey(),
  userId: integer("userId")
    .references(() => users.userId)
    .notNull(),
  productId: integer("productId")
    .references(() => products.productId)
    .notNull(),
  rating: integer("rating").notNull(),
  comment: text("comment"),
  createdAt: timestamp("createdAt").defaultNow(),
});

// Cart
export const carts = pgTable("carts", {
  cartId: serial("cartId").primaryKey(),
  userId: integer("userId")
    .references(() => users.userId)
    .notNull(),
  productId: integer("productId")
    .references(() => products.productId)
    .notNull(),
  quantity: integer("quantity").notNull(),
});

// Support Tickets
export const supportTickets = pgTable("supportTickets", {
  ticketId: serial("ticketId").primaryKey(),
  userId: integer("userId")
    .references(() => users.userId)
    .notNull(),
  subject: varchar("subject", { length: 255 }),
  message: text("message"),
  resolved: boolean("resolved").default(false),
  createdAt: timestamp("createdAt").defaultNow(),
});

// Payments
export const payments = pgTable("payments", {
  paymentId: serial("paymentId").primaryKey(),
  userId: integer("userId")
    .references(() => users.userId)
    .notNull(),
  amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),
  method: varchar("method", { length: 50 }).default("mpesa"),
  status: varchar("status", {
    enum: paymentStatusEnum.enumValues,
  }).default("pending"),
  transactionId: varchar("transactionId", { length: 100 }),
  createdAt: timestamp("createdAt").defaultNow(),
});

// Admin Responses
export const adminResponses = pgTable("admin_responses", {
  responseId: serial("responseId").primaryKey(),
  ticketId: integer("ticketId")
    .notNull()
    .references(() => supportTickets.ticketId, { onDelete: "cascade" }),
  adminId: integer("adminId")
    .notNull()
    .references(() => users.userId, { onDelete: "cascade" }),
  message: text("message").notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
});

// ========== RELATIONS ==========

export const usersRelations = relations(users, ({ many }) => ({
  orders: many(orders),
  reviews: many(reviews),
  carts: many(carts),
  supportTickets: many(supportTickets),
  payments: many(payments),
  adminResponses: many(adminResponses),
}));

export const categoriesRelations = relations(categories, ({ many }) => ({
  subcategories: many(subcategories),
}));

export const subcategoriesRelations = relations(subcategories, ({ one, many }) => ({
  category: one(categories, {
    fields: [subcategories.categoryId],
    references: [categories.categoryId],
  }),
  products: many(products),
}));

export const productsRelations = relations(products, ({ one, many }) => ({
  subcategory: one(subcategories, {
    fields: [products.subcategoryId],
    references: [subcategories.subcategoryId],
  }),
  images: many(images),
  reviews: many(reviews),
  orderItems: many(orderItems),
  carts: many(carts),
}));

export const imagesRelations = relations(images, ({ one }) => ({
  product: one(products, {
    fields: [images.productId],
    references: [products.productId],
  }),
}));

export const ordersRelations = relations(orders, ({ one, many }) => ({
  user: one(users, {
    fields: [orders.userId],
    references: [users.userId],
  }),
  items: many(orderItems),
}));

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, {
    fields: [orderItems.orderId],
    references: [orders.orderId],
  }),
  product: one(products, {
    fields: [orderItems.productId],
    references: [products.productId],
  }),
}));

export const reviewsRelations = relations(reviews, ({ one }) => ({
  user: one(users, {
    fields: [reviews.userId],
    references: [users.userId],
  }),
  product: one(products, {
    fields: [reviews.productId],
    references: [products.productId],
  }),
}));

export const cartsRelations = relations(carts, ({ one }) => ({
  user: one(users, {
    fields: [carts.userId],
    references: [users.userId],
  }),
  product: one(products, {
    fields: [carts.productId],
    references: [products.productId],
  }),
}));

export const supportTicketsRelations = relations(supportTickets, ({ one, many }) => ({
  user: one(users, {
    fields: [supportTickets.userId],
    references: [users.userId],
  }),
  responses: many(adminResponses),
}));

export const paymentsRelations = relations(payments, ({ one }) => ({
  user: one(users, {
    fields: [payments.userId],
    references: [users.userId],
  }),
}));

export const adminResponsesRelations = relations(adminResponses, ({ one }) => ({
  ticket: one(supportTickets, {
    fields: [adminResponses.ticketId],
    references: [supportTickets.ticketId],
  }),
  admin: one(users, {
    fields: [adminResponses.adminId],
    references: [users.userId],
  }),
}));

// ========== TYPES ==========

export type TSelectUser = typeof users.$inferSelect;
export type TInsertUser = typeof users.$inferInsert;

export type TSelectCategory = typeof categories.$inferSelect;
export type TInsertCategory = typeof categories.$inferInsert;

export type TSelectSubcategory = typeof subcategories.$inferSelect;
export type TInsertSubcategory = typeof subcategories.$inferInsert;

export type TSelectProduct = typeof products.$inferSelect;
export type TInsertProduct = typeof products.$inferInsert;

export type TSelectImage = typeof images.$inferSelect;
export type TInsertImage = typeof images.$inferInsert;

export type TSelectOrder = typeof orders.$inferSelect;
export type TInsertOrder = typeof orders.$inferInsert;

export type TSelectOrderItem = typeof orderItems.$inferSelect;
export type TInsertOrderItem = typeof orderItems.$inferInsert;

export type TSelectReview = typeof reviews.$inferSelect;
export type TInsertReview = typeof reviews.$inferInsert;

export type TSelectCart = typeof carts.$inferSelect;
export type TInsertCart = typeof carts.$inferInsert;

export type TSelectSupportTicket = typeof supportTickets.$inferSelect;
export type TInsertSupportTicket = typeof supportTickets.$inferInsert;

export type TSelectPayment = typeof payments.$inferSelect;
export type TInsertPayment = typeof payments.$inferInsert;

export type TSelectAdminResponse = typeof adminResponses.$inferSelect;
export type TInsertAdminResponse = typeof adminResponses.$inferInsert;

export type TPaymentStatus = typeof paymentStatusEnum.enumValues[number];
export type TUserRole = typeof userRoleEnum.enumValues[number];
