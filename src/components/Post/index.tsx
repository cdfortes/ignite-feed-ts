import { format, formatDistanceToNow, parseISO } from 'date-fns'
import pt from 'date-fns/locale/pt'
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react'

import { Avatar } from '../Avatar'
import { Comment } from '../Comment'
import styles from './styles.module.css'
import { PostProps, Author } from '../../types'

export function Post({ author, content, publishedAt }: PostProps) {
  const [comments, setComments] = useState<
    Array<{ author: Author; content: string; commentDate: Date }>
  >([])

  const [newCommentText, setNewCommentText] = useState('')

  const publishedAtDateFortmetted = format(
    parseISO(publishedAt.toString()),
    "d 'de' LLLL 'às' HH:mm'h'",
    {
      locale: pt
    }
  )

  const publishedAtDistanceToNow = formatDistanceToNow(
    parseISO(publishedAt.toString()),
    {
      locale: pt,
      addSuffix: true
    }
  )

  const handleSubmitComment = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setComments([
      ...comments,
      { author, content: newCommentText, commentDate: new Date() }
    ])
    setNewCommentText('')
  }

  const handleChangeNewComment = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.target.setCustomValidity('')
    setNewCommentText(e.target.value)
  }

  const handleNewCommentTextInvalid = (
    e: InvalidEvent<HTMLTextAreaElement>
  ) => {
    e.target.setCustomValidity(
      'Por favor, digite um comentário, campo obrigatório'
    )
  }

  const handleDeleteComment = (comment: string) => {
    setComments(comments.filter((c) => c.content !== comment))
  }

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={author.avatarUrl} />
          <div className={styles.authorinfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>

        <time
          title={publishedAtDateFortmetted}
          dateTime={publishedAt.toString()}
        >
          Publicado {publishedAtDistanceToNow} atrás
        </time>
      </header>
      <div className={styles.content}>
        {content.map((item) => {
          if (item.type === 'paragraph') {
            return <p key={item.content}>{item.content}</p>
          } else if (item.type === 'link') {
            return (
              <p key={item.content}>
                <a href="#">{item.content}</a>
              </p>
            )
          }
        })}
      </div>

      <form className={styles.commentForm} onSubmit={handleSubmitComment}>
        <strong>Deixe seu feedback</strong>

        <textarea
          placeholder="Deixe um comentário"
          required
          value={newCommentText}
          onChange={handleChangeNewComment}
          onInvalid={handleNewCommentTextInvalid}
        />

        <footer>
          <button type="submit">Publicar</button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map(({ author, content, commentDate }) => (
          <Comment
            key={content}
            author={author}
            content={content}
            commentDate={commentDate}
            onDeleteComment={handleDeleteComment}
          />
        ))}
      </div>
    </article>
  )
}
