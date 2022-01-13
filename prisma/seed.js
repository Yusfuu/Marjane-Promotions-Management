const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const Centers = [
  {
    name: 'MARJANE DERB SULTAN',
    city: 'Casablanca',
  },
  {
    name: 'MARJANE HAY HASSANI',
    city: 'Casablanca',
  },
  {
    name: 'MARJANE MENARA',
    city: 'Marrakech',
  },
  {
    name: 'MARJANE MARRA. MASSIRA',
    city: 'Marrakech',
  },
  {
    name: 'MARJANE Safi',
    city: 'Safi',
  }
];


const Category = [
  'Sports & Leisure',
  'Arts & Crafts',
  'Clothes & shoes',
  'Multimedia'
];



const Product = [
  {
    name: 'T-shirt',
    price: 20.2,
    quantity: 80,
    url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&q=75&fit=crop&w=600"
  },
  {
    name: 'JBL Tune',
    price: 49.95,
    quantity: 34,
    url: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&q=75&fit=crop&w=600"
  },
  {
    price: 109.95,
    name: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    quantity: 80,
    url: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&q=75&fit=crop&w=600"
  },
  {
    name: "Mens Casual Premium Slim Fit T-Shirts ",
    price: 22.3,
    quantity: 80,
    url: "https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&q=75&fit=crop&w=600"
  },
  {
    name: "Mens Cotton Jacket",
    price: 55.99,
    quantity: 80,
    url: "https://images.unsplash.com/photo-1528476513691-07e6f563d97f?auto=format&q=75&fit=crop&w=600"
  },
  {
    name: "Mens Casual Slim Fit",
    price: 15.99,
    quantity: 80,
    url: "https://images.unsplash.com/photo-1612033448550-9d6f9c17f07d?auto=format&q=75&fit=crop&w=600"
  },
  {
    name: "Silver Dragon Chain Bracelet",
    price: 695,
    quantity: 80,
    url: "https://images.unsplash.com/photo-1579609598065-79f8e5bcfb70?auto=format&q=75&fit=crop&w=600"
  }
];


const Admin = {
  email: "admin@test.com",
  password: "BaFq_9t7WVNw0aK"
}

async function main() {
  await prisma.admin.create({ data: Admin });
  const centerIds = await Promise.all(Centers.map(({ name, city }) => prisma.center.create({ data: { name, city } })));
  const categoryIds = await Promise.all(Category.map(name => prisma.category.create({ data: { name } })));
  const productIds = await Promise.all(Product.map(({ name, price, quantity, url }) => prisma.product.create({ data: { name, price, quantity, url, categoryId: categoryIds[~~(Math.random() * categoryIds.length)].id } })));
}

main()
  .catch((e) => { throw e })
  .finally(async () => await prisma.$disconnect())