
import express, { Application, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { logger } from './middleware/logger';
import userRoutes from './services/users/users.route'
import productRoutes from './services/Products/Product.route';
import imageRoutes from './services/images/images.route';
import orderRoutes from './services/orders/orders.route';
import orderItemRoutes from './services/orderItems/orderItems.route';
import reviewRoutes from './services/reveiws/reveiw.route';
import cartRoutes from './services/cart/cart.route';
import supportTicketRoutes from './services/supportTicket/supportTickets.route';
import paymentRoutes from './services/payment/payment.route';
import adminResponseRoutes from './services/adminResponse/adminResponse.route';
import categoryRoutes from './services/categories/categories.route';
import subcategoryRoutes from './services/subCategories/subcategories.route';
import { authRouter } from './services/auth/auth.route';


dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 8080; // ✅ Fallback for Azure compatibility

// ✅ Webhook route first — requires raw body


// ✅ Middlewares (after webhook)
app.use(cors());

app.use(express.json()); // Must be after webhook
app.use(logger); // Custom logger middleware

// ✅ Health check / default route
app.get('/', (_req, res: Response) => {
  res.send("🚀 Welcome to the 🛒 NovaCart E-commerce PLatform(Drizzle + PostgreSQL) — Designed by Gakenye Ndiritu 😎");
});

// ✅ Route registration
app.use('/api/',userRoutes);
app.use('/api/',productRoutes);
app.use('/api/',imageRoutes);
app.use('/api/',orderRoutes);
app.use('/api/',orderItemRoutes);
app.use('/api/',reviewRoutes);
app.use('/api/',cartRoutes);
app.use('/api/',supportTicketRoutes);
app.use('/api/',paymentRoutes);
app.use('/api/', adminResponseRoutes);
app.use('/api/', categoryRoutes);
app.use('/api/', subcategoryRoutes);
app.use('/api/', authRouter);

// ✅ Start server
app.listen(PORT, () => {
  console.log(`
  🚀 Server running on port: ${PORT}
  ✅ 🛒 NovaCart e-commerce platform Backend Initialized!
  🛠️ Developed by: GAKENYE NDIRITU 😉😎
  `);
});
