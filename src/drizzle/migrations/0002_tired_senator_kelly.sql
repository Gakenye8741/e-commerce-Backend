ALTER TABLE "payments" ADD COLUMN "checkoutRequestId" varchar(100);--> statement-breakpoint
ALTER TABLE "payments" ADD COLUMN "merchantRequestId" varchar(100);--> statement-breakpoint
ALTER TABLE "payments" ADD COLUMN "payerPhone" varchar(20);--> statement-breakpoint
ALTER TABLE "payments" ADD COLUMN "resultCode" integer;--> statement-breakpoint
ALTER TABLE "payments" ADD COLUMN "resultDesc" varchar(255);--> statement-breakpoint
ALTER TABLE "payments" ADD COLUMN "paymentDate" varchar(20);