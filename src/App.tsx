import { createServer, Model } from 'miragejs'
import { useEffect, useState } from 'react'

import { Header } from './components/Header'
import { Post } from './components/Post'
import { Sidebar } from './components/Sidebar'

import './global.css'
import styles from './App.module.css'

import { api } from './services/api'

import { PostProps } from './types'

// Create a new server miragejs
createServer({
  models: {
    post: Model
  },

  routes() {
    this.namespace = 'api'
    this.get('/posts', () => {
      return {
        posts: [
          {
            id: 1,
            author: {
              avatarUrl: 'https://github.com/cdfortes.png',
              name: 'Carlos Fortes',
              role: 'Web Developer'
            },
            content: [
              { type: 'paragraph', content: 'Fala Galeraa 👋' },
              {
                type: 'paragraph',
                content:
                  'Acabei de subir mais um projeto na rocketseat para agregar o portifólio de você. É um projeto que fiz para desenvolvermos juntos na NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀'
              },
              { type: 'link', content: 'jane.design/doctorcare' }
            ],
            publishedAt: new Date('2022-06-10 16:00:00')
          },
          {
            id: 2,
            author: {
              avatarUrl: 'https://github.com/maykbrito.png',
              name: 'Maykebrito',
              role: 'Educator @Roketseat'
            },
            content: [
              { type: 'paragraph', content: 'Faaala Dev 👋' },
              {
                type: 'paragraph',
                content:
                  'Acabei de subir mais um projeto na rocketseat para agregar o portifólio de você. É um projeto que fiz para desenvolvermos juntos na NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀'
              },
              { type: 'link', content: 'jane.design/doctorcare' }
            ],
            publishedAt: new Date('2022-06-10 15:30:00')
          }
        ]
      }
    })
  }
})

export function App() {
  const [posts, setPosts] = useState<Array<PostProps>>([])
  console.log(posts)
  useEffect(() => {
    api.get('posts').then((response) => setPosts(response.data.posts))
  }, [])
  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          {posts.map(({ id, author, content, publishedAt }) => (
            <Post
              id={id}
              key={id}
              author={author}
              content={content}
              publishedAt={publishedAt}
            />
          ))}
        </main>
      </div>
    </>
  )
}
