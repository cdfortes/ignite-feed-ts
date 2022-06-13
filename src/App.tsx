import { useEffect, useState } from 'react'

import { Header } from './components/Header'
import { Post } from './components/Post'
import { Sidebar } from './components/Sidebar'

import './global.css'
import styles from './App.module.css'

import { api } from './services/api'

import { PostProps } from './types'
import { setupMirage } from './server'

if (process.env.NODE_ENV === 'development') {
  setupMirage()
}

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
