CREATE TYPE "public"."order_status" AS ENUM('pending', 'completed', 'failed');--> statement-breakpoint
ALTER TABLE "orderItems" DROP CONSTRAINT "orderItems_orderId_orders_orderId_fk";
--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "status" "order_status" DEFAULT 'pending';--> statement-breakpoint
ALTER TABLE "orderItems" ADD CONSTRAINT "orderItems_orderId_orders_orderId_fk" FOREIGN KEY ("orderId") REFERENCES "public"."orders"("orderId") ON DELETE cascade ON UPDATE no action;