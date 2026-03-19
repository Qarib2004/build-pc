import 'dotenv/config'
import { Pool } from "pg"
import { PrismaPg } from '@prisma/adapter-pg'
import { ComponentType, PrismaClient } from '@prisma/client'

const pool = new Pool({ connectionString: process.env.DATABASE_URL })

const adapter = new PrismaPg(pool as any)

const prisma = new PrismaClient({ adapter })
async function main() {
  console.log('🌱 Starting database seeding...')

  console.log('Cleaning up old data...')
  await prisma.like.deleteMany()
  await prisma.buildComponent.deleteMany()
  await prisma.build.deleteMany()
  await prisma.component.deleteMany()
  await prisma.user.deleteMany()

  console.log('Adding components...')

  await prisma.component.createMany({
    data: [
      // Intel
      { type: ComponentType.cpu, name: 'Intel Core i5-13600K', price: 319, socket: 'LGA1700' },
      { type: ComponentType.cpu, name: 'Intel Core i7-13700K', price: 409, socket: 'LGA1700' },
      { type: ComponentType.cpu, name: 'Intel Core i9-13900K', price: 589, socket: 'LGA1700' },
      { type: ComponentType.cpu, name: 'Intel Core i5-12400F', price: 149, socket: 'LGA1700' },
      { type: ComponentType.cpu, name: 'Intel Core i3-12100F', price: 99, socket: 'LGA1700' },
      
      // AMD
      { type: ComponentType.cpu, name: 'AMD Ryzen 5 7600X', price: 229, socket: 'AM5' },
      { type: ComponentType.cpu, name: 'AMD Ryzen 7 7800X3D', price: 449, socket: 'AM5' },
      { type: ComponentType.cpu, name: 'AMD Ryzen 9 7950X', price: 599, socket: 'AM5' },
      { type: ComponentType.cpu, name: 'AMD Ryzen 5 5600X', price: 159, socket: 'AM4' },
      { type: ComponentType.cpu, name: 'AMD Ryzen 7 5800X3D', price: 329, socket: 'AM4' }
    ]
  })

  await prisma.component.createMany({
    data: [
      { type: ComponentType.gpu, name: 'NVIDIA RTX 4070 Ti', price: 799, socket: null },
      { type: ComponentType.gpu, name: 'NVIDIA RTX 4080', price: 1199, socket: null },
      { type: ComponentType.gpu, name: 'NVIDIA RTX 4090', price: 1699, socket: null },
      { type: ComponentType.gpu, name: 'NVIDIA RTX 4060 Ti', price: 399, socket: null },
      { type: ComponentType.gpu, name: 'NVIDIA RTX 3060', price: 289, socket: null },
      { type: ComponentType.gpu, name: 'AMD RX 7900 XTX', price: 949, socket: null },
      { type: ComponentType.gpu, name: 'AMD RX 7800 XT', price: 499, socket: null },
      { type: ComponentType.gpu, name: 'AMD RX 7700 XT', price: 449, socket: null },
      { type: ComponentType.gpu, name: 'AMD RX 6800', price: 379, socket: null }
    ]
  })

  await prisma.component.createMany({
    data: [
      { type: ComponentType.motherboard, name: 'ASUS PRIME Z790-P', price: 249, socket: 'LGA1700' },
      { type: ComponentType.motherboard, name: 'MSI B760 GAMING PLUS', price: 159, socket: 'LGA1700' },
      { type: ComponentType.motherboard, name: 'GIGABYTE B760 DS3H', price: 139, socket: 'LGA1700' },
      { type: ComponentType.motherboard, name: 'ASUS TUF GAMING B650-PLUS', price: 219, socket: 'AM5' },
      { type: ComponentType.motherboard, name: 'MSI B650 GAMING PLUS', price: 199, socket: 'AM5' },
      { type: ComponentType.motherboard, name: 'MSI B550 GAMING GEN3', price: 119, socket: 'AM4' },
      { type: ComponentType.motherboard, name: 'ASUS PRIME B450-PLUS', price: 99, socket: 'AM4' }
    ]
  })

  await prisma.component.createMany({
    data: [
      { type: ComponentType.ram, name: 'Kingston Fury 16GB DDR4', price: 45, socket: null },
      { type: ComponentType.ram, name: 'Kingston Fury 32GB DDR4', price: 85, socket: null },
      { type: ComponentType.ram, name: 'Corsair Vengeance 16GB DDR5', price: 75, socket: null },
      { type: ComponentType.ram, name: 'Corsair Vengeance 32GB DDR5', price: 125, socket: null },
      { type: ComponentType.ram, name: 'Samsung 16GB DDR4', price: 39, socket: null },
      { type: ComponentType.ram, name: 'G.Skill Trident Z5 32GB DDR5', price: 149, socket: null }
    ]
  })

  await prisma.component.createMany({
    data: [
      { type: ComponentType.ssd, name: 'Samsung 980 500GB NVMe', price: 55, socket: null },
      { type: ComponentType.ssd, name: 'Samsung 980 1TB NVMe', price: 89, socket: null },
      { type: ComponentType.ssd, name: 'Samsung 980 Pro 1TB NVMe', price: 109, socket: null },
      { type: ComponentType.ssd, name: 'WD Blue 1TB SATA SSD', price: 65, socket: null },
      { type: ComponentType.ssd, name: 'Kingston NV2 1TB NVMe', price: 59, socket: null },
      { type: ComponentType.ssd, name: 'Kingston NV2 2TB NVMe', price: 105, socket: null },
      { type: ComponentType.ssd, name: 'Seagate BarraCuda 1TB HDD', price: 45, socket: null },
      { type: ComponentType.ssd, name: 'WD Blue 2TB HDD', price: 59, socket: null }
    ]
  })

  await prisma.component.createMany({
    data: [
      { type: ComponentType.psu, name: 'be quiet! 550W Bronze', price: 65, socket: null },
      { type: ComponentType.psu, name: 'be quiet! 650W Gold', price: 95, socket: null },
      { type: ComponentType.psu, name: 'be quiet! 750W Gold', price: 119, socket: null },
      { type: ComponentType.psu, name: 'Corsair 650W Bronze', price: 79, socket: null },
      { type: ComponentType.psu, name: 'Corsair 850W Gold', price: 139, socket: null },
      { type: ComponentType.psu, name: 'DeepCool 500W', price: 45, socket: null },
      { type: ComponentType.psu, name: 'DeepCool 750W Gold', price: 99, socket: null }
    ]
  })

  await prisma.component.createMany({
    data: [
      { type: ComponentType.case, name: 'DeepCool CC560', price: 55, socket: null },
      { type: ComponentType.case, name: 'DeepCool CH370', price: 65, socket: null },
      { type: ComponentType.case, name: 'Zalman S2', price: 49, socket: null },
      { type: ComponentType.case, name: 'Corsair 4000D Airflow', price: 95, socket: null },
      { type: ComponentType.case, name: 'NZXT H5 Flow', price: 99, socket: null },
      { type: ComponentType.case, name: 'Lian Li Lancool 216', price: 105, socket: null },
      { type: ComponentType.case, name: 'be quiet! Pure Base 500DX', price: 115, socket: null }
    ]
  })

  await prisma.component.createMany({
    data: [
      { type: ComponentType.cooler, name: 'DeepCool AK400', price: 35, socket: null },
      { type: ComponentType.cooler, name: 'DeepCool AK620', price: 65, socket: null },
      { type: ComponentType.cooler, name: 'be quiet! Pure Rock 2', price: 45, socket: null },
      { type: ComponentType.cooler, name: 'Noctua NH-D15', price: 109, socket: null },
      { type: ComponentType.cooler, name: 'DeepCool LS520 SE 240mm', price: 89, socket: null },
      { type: ComponentType.cooler, name: 'DeepCool LS720 360mm', price: 129, socket: null },
      { type: ComponentType.cooler, name: 'Arctic Liquid Freezer II 240', price: 95, socket: null },
      { type: ComponentType.cooler, name: 'Arctic Liquid Freezer II 360', price: 125, socket: null },
      { type: ComponentType.cooler, name: 'MSI MAG CoreLiquid 240R', price: 99, socket: null }
    ]
  })

  console.log('Adding test user...')
  await prisma.user.create({
    data: {
      email: 'test@example.com',
      name: 'Test User',
      password: 'password123'
    }
  })

  const componentsCount = await prisma.component.count()
  const usersCount = await prisma.user.count()
  
  console.log(`✅ Success! Added:`)
  console.log(`   - ${componentsCount} components`)
  console.log(`   - ${usersCount} users`)
}

main()
  .catch((e) => {
    console.error('❌ Error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })