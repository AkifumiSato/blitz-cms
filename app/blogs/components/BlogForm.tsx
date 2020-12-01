/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import React from 'react'
import Button from '../../components/Button'

type BlogFormProps = {
  onSubmitClick: React.MouseEventHandler<HTMLButtonElement>
}

const BlogForm: React.FC<BlogFormProps> = ({ onSubmitClick, children }) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
      }}
    >
      {children}
      <div
        css={css`
          display: flex;
          justify-content: center;
          margin-top: 30px;
        `}
      >
        <div
          css={css`
            width: 300px;
          `}
        >
          <Button onClick={onSubmitClick}>Submit</Button>
        </div>
      </div>
    </form>
  )
}

export default BlogForm
