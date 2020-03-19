import { Prisma } from 'prisma-binding'

const prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: 'http://localhost:4466'
})

// prisma.query prisma.mutation prisma.subscription prisma.exists

// 1. Create new post
// 2. Fetch all info about the author

const createPostForUser = async (authorId, data) => {
  const post = await prisma.mutation.createPost({
    data: {
      ...data,
      author: {
        connect: {
          id: authorId
        }
      }
    }
  }, '{id}')
  const user = await prisma.query.user({
    where: {
      id: authorId
    }
  }, '{ id, name, email posts { id, title , published}}')
  return user
}

// createPostForUser('ck7yl3p9o02du0805lfgircz3', {
//   title: 'Books to read',
//   body: 'more paperwork',
//   published: true
// }).then((user) => {
//   console.log(JSON.stringify(user, undefined, 2))
// })

const updatePostForUser = async (postId, data) => {
  const post = await prisma.mutation.updatePost({
    where: {
      id: postId
    },
    data: {
      ...data,
    }
  }, '{author {id}}')
  const user = await prisma.query.user({
    where: {
      id: post.author.id
    }
  }, '{id name email posts {id title published}}')
  return user
}

updatePostForUser('ck7xjeesq01l30905gnv5xpcr',
  {
    published: false,
    title: 'More comments'
  }, {
}).then((post) => {
  console.log(JSON.stringify(post, undefined, 2))
})

// updatePostForUser('ck7xjeesq01l30905gnv5xpcr', {
//   title: 'Udemy Classes #3',
//   body: 'Learning Graphql ...',
//   published: false
// }).then((user) => {
//   console.log(JSON.stringify(user, undefined, 2))
// })

// prisma.mutation.updatePost({
//   where: {
//     id: "ck7xjeesq01l30905gnv5xpcr"
//   },
//   data: {
//     title: " Graph 104, more post from NodeJS",
//     body: "hello there 104",
//     published: true
//   }
// }, '{id}').then((data) => {
//   return prisma.query.posts(null, '{ id title body published }')
// }).then((data) => {
//   console.log(data)
// })
