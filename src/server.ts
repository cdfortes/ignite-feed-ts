import { Server, Model, Factory } from 'miragejs'
import { faker } from '@faker-js/faker'
export function setupMirage(environment = 'development') {
  return new Server({
    environment,
    models: {
      post: Model,
      comment: Model,
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
      server.createList('post', 2)
    },

    routes() {
      this.namespace = 'api'

      this.get('/posts', (schema) => {
        return schema.all('post')
      })
      this.get('/comments', (schema) => {
        return schema.all('comments')
      })
    }
  })
}
