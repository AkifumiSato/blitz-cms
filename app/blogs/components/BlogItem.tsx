/** @jsx jsx */
import { Link } from '@blitzjs/core'
import { css, jsx } from '@emotion/react'
import React from 'react'
import { colors } from '../../stylesheets/colors'
import { Blog } from '@prisma/client'

type Props = {
  blog: Blog
}

const BlogItem: React.FC<Props> = ({ blog }) => (
  <div
    css={css`
      padding: 20px;
      width: 100%;
      position: relative;
    `}
  >
    <Link href={`/blogs/${blog.id}`}>
      <a
        css={css`
          display: inline-block;
          font-size: 20px;
          font-weight: bold;

          &::before {
            bottom: 0;
            content: '';
            display: block;
            left: 0;
            position: absolute;
            right: 0;
            top: 0;
            z-index: 1;
          }
        `}
      >
        {blog.title}
      </a>
    </Link>
    <p
      css={css`
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        text-overflow: ellipsis;
        overflow: hidden;
        color: ${colors.gray['500']};
        font-size: 15px;
        line-height: 2;
        margin-top: 10px;
      `}
    >
      {blog.body}
    </p>
  </div>
)

export default BlogItem
