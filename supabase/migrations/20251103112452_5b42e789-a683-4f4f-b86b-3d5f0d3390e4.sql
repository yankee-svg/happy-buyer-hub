-- Create User table
CREATE TABLE public."User" (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create Product table
CREATE TABLE public."Product" (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  price DOUBLE PRECISION NOT NULL,
  "imageUrl" TEXT,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  "ownerId" UUID REFERENCES public."User"(id) ON DELETE SET NULL
);

-- Create Order table
CREATE TABLE public."Order" (
  id SERIAL PRIMARY KEY,
  "userId" UUID REFERENCES public."User"(id) ON DELETE CASCADE NOT NULL,
  total DOUBLE PRECISION NOT NULL,
  status TEXT DEFAULT 'pending' NOT NULL,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create OrderItem table
CREATE TABLE public."OrderItem" (
  id SERIAL PRIMARY KEY,
  "orderId" INTEGER REFERENCES public."Order"(id) ON DELETE CASCADE NOT NULL,
  "productId" INTEGER REFERENCES public."Product"(id) ON DELETE CASCADE NOT NULL,
  quantity INTEGER DEFAULT 1 NOT NULL,
  price DOUBLE PRECISION NOT NULL
);

-- Create Advertisement table
CREATE TABLE public."Advertisement" (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  "imageUrl" TEXT,
  link TEXT,
  active BOOLEAN DEFAULT true NOT NULL,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Enable RLS on all tables
ALTER TABLE public."User" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."Product" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."Order" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."OrderItem" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."Advertisement" ENABLE ROW LEVEL SECURITY;

-- RLS Policies for User table
CREATE POLICY "Users can view their own profile" ON public."User"
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public."User"
  FOR UPDATE USING (auth.uid() = id);

-- RLS Policies for Product table
CREATE POLICY "Anyone can view products" ON public."Product"
  FOR SELECT USING (true);

CREATE POLICY "Users can create their own products" ON public."Product"
  FOR INSERT WITH CHECK (auth.uid() = "ownerId");

CREATE POLICY "Users can update their own products" ON public."Product"
  FOR UPDATE USING (auth.uid() = "ownerId");

CREATE POLICY "Users can delete their own products" ON public."Product"
  FOR DELETE USING (auth.uid() = "ownerId");

-- RLS Policies for Order table
CREATE POLICY "Users can view their own orders" ON public."Order"
  FOR SELECT USING (auth.uid() = "userId");

CREATE POLICY "Users can create their own orders" ON public."Order"
  FOR INSERT WITH CHECK (auth.uid() = "userId");

-- RLS Policies for OrderItem table
CREATE POLICY "Users can view order items for their orders" ON public."OrderItem"
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public."Order"
      WHERE public."Order".id = "OrderItem"."orderId"
      AND public."Order"."userId" = auth.uid()
    )
  );

CREATE POLICY "Users can create order items for their orders" ON public."OrderItem"
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public."Order"
      WHERE public."Order".id = "OrderItem"."orderId"
      AND public."Order"."userId" = auth.uid()
    )
  );

-- RLS Policies for Advertisement table
CREATE POLICY "Anyone can view active advertisements" ON public."Advertisement"
  FOR SELECT USING (active = true);