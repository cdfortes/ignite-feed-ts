export interface CommentProps {
  author: {
    name: string
    avatarUrl: string
  }
  content: string
  commentDate: Date
  onDeleteComment: (comment: string) => void
}

export interface AvatarProps {
  src: string
  hasBorder?: boolean
}

export type Author = {
  name: string
  avatarUrl: string
  role: string
}

export interface PostProps {
  id: number
  author: Author
  publishedAt: Date
  content: Array<{
    type: string
    content: string
  }>
}
