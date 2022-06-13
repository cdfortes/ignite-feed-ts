import { Server, Model, Factory, hasMany, belongsTo } from 'miragejs'
import { faker } from '@faker-js/faker'
export function setupMirage(environment = 'development') {
  return new Server({
    environment,
    models: {
      post: Model.extend({
        comments: hasMany()
      }),
      comment: Model.extend({
        post: belongsTo()
      }),
      user: Model
    },

    factories: {
      post: Factory.extend({
        author() {
          return {
            avatarUrl: faker.image.avatar(),
            name: faker.name.findName(),
            role: faker.name.jobTitle()
          }
        },
        content() {
          return [
            { type: 'paragraph', content: 'Fala Galeraa 👋' },
            {
              type: 'paragraph',
              content: faker.lorem.paragraphs()
            },
            {
              type: 'link',
              content: `${faker.internet.domainName()}`
            }
          ]
        },
        publishedAt() {
          return faker.date.past()
        }
      }),
      comment: Factory.extend({
        author() {
          return {
            avatarUrl: faker.image.avatar(),
            name: faker.name.findName(),
            role: faker.name.jobTitle()
          }
        },
        content() {
          return faker.lorem.paragraph()
        },
        commentDate() {
          return faker.date.past()
        }
      })
    },

    seeds(server) {
      server.createList('post', 2).forEach((post) =>
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        server.createList('comment', 1, { postId: post.id })
      )
    },

    routes() {
      this.namespace = 'api'

      this.get('/posts', (schema) => {
        return schema.all('post')
      })
      this.get('/posts/:id/comments', (schema, request) => {
        const comments = schema.db.posts.find(request.params.id).commentIds
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        return comments.map((commentId) => schema.db.comments.find(commentId))
      })
      this.get('/comments', (schema) => {
        return schema.all('comment')
      })
    }
  })
}
