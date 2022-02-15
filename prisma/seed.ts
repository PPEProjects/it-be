// import { PrismaClient, Prisma } from '@prisma/client'
// import * as bcrypt from 'bcryptjs'
// const prisma = new PrismaClient() 

// const userData: Prisma.UserCreateInput[] = [
//   {
//     name: 'Alice',
//     email: 'alice@prisma.io',
//     password: '123455689',
//     posts: {
//       create: [
//         {
//           title: 'Join the Prisma Slack',
//           content: 'https://slack.prisma.io',
//           published: true,
//         },
//       ],
//     },
//     infos: {
//       create: [
//         {
//           name:"hihi",
//             content: "master code",
//             attachments: [{
//               "id": 1,
//               "url": "abc.png"
//             }],
//         },
//       ],
//     },
//   },
//   {
//     name: 'Nilu',
//     email: 'nilu@prisma.io',
//     password: '123455689',
//     posts: {
//       create: [
//         {
//           title: 'Follow Prisma on Twitter',
//           content: 'https://www.twitter.com/prisma',
//           published: true,
//           viewCount: 42,
//         },
//       ],
//     },
//     infos: {
//       create: [
//         {
//             name:"hihi",
//             content: "master guitar",
//             attachments: [{
//               "id": 1,
//               "url": "abc.png"
//             }],
//         },
//       ],
//     },
//   },
//   {
//     name: 'Mahmoud',
//     email: 'mahmoud@prisma.io',
//     password: '123455689',
//     posts: {
//       create: [
//         {
//           title: 'Ask a question about Prisma on GitHub',
//           content: 'https://www.github.com/prisma/prisma/discussions',
//           published: true,
//           viewCount: 128,
//         },
//         {
//           title: 'Prisma on YouTube',
//           content: 'https://pris.ly/youtube',
//         },
//       ],
//     },
//     infos: {
//       create: [
//         {
//           name:"hihi",
//             content: "hacker pro",
//           attachments: [{
//             "id": 1,
//             "url": "abc.png"
//           }],
//         }
//       ],
//     },
//   },
// ]

// async function main() {
//   console.log(`Start seeding ...`)
//   for (const u of userData) {
//     const password =  await bcrypt.hash(u.password, 10)
//     const user = await prisma.user.create({
//       data: {...u,
//         password: password
//       },
//     })
//     console.log(`Created user with id: ${user.id}`)
//   }
//   console.log(`Seeding finished.`)
// }

// main()
//   .catch((e) => {
//     console.error(e)
//     process.exit(1)
//   })
//   .finally(async () => {
//     await prisma.$disconnect()
//   })
