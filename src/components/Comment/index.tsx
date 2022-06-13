import { format, formatDistanceToNow } from 'date-fns'
import { pt } from 'date-fns/locale'
import { ThumbsUp, Trash } from 'phosphor-react'
import { useState } from 'react'
import { Avatar } from '../Avatar'
import styles from './styles.module.css'

interface CommentProps {
  author: {
    name: string
    avatarUrl: string
  }
  content: string
  commentDate: Date
  onDeleteComment: (comment: string) => void
}

export function Comment({
  author,
  content,
  commentDate,
  onDeleteComment
}: CommentProps) {
  const [likeCount, setLikeCount] = useState(0)

  const commentDateFortmetted = format(
    commentDate,
    "d 'de' LLLL 'às' HH:mm'h'",
    {
      locale: pt
    }
  )

  const commentDistanceToNow = formatDistanceToNow(commentDate, {
    locale: pt,
    addSuffix: true
  })

  const handleDeleteComment = () => {
    onDeleteComment(content)
  }

  const handleLikeComment = () => {
    setLikeCount(likeCount + 1)
  }
  return (
    <div className={styles.comment}>
      <Avatar src={author.avatarUrl} hasBorder={false} />

      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>{author.name}</strong>
              <time
                title={commentDateFortmetted}
                dateTime={commentDate.toISOString()}
              >
                {commentDistanceToNow} atrás
              </time>
            </div>
            <button title="Deletar comentário" onClick={handleDeleteComment}>
              <Trash size={24} />
            </button>
          </header>

          <p>{content}</p>
        </div>

        <footer>
          <button onClick={handleLikeComment}>
            <ThumbsUp />
            Aplaudir <span>{likeCount}</span>
          </button>
        </footer>
      </div>
    </div>
  )
}
