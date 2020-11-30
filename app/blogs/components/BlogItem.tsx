/** @jsx jsx */
import { Link } from '@blitzjs/core'
import { LinkProps } from 'next/link'
import { css, jsx } from '@emotion/react'
import React from 'react'
import { colors } from '../../stylesheets/colors'

const BlogItem: React.FC<LinkProps> = ({ children, ...props }) => {
  return (
    <Link {...props}>
      <a
        css={css`
          background-color: ${colors.white.base};
          border: 1px solid ${colors.gray['300']};
          border-radius: 5px;
          display: block;
          font-size: 15px;
          padding: 20px;
          width: 100%;
          transition: background-color 0.5s;
          cursor: pointer;

          &:hover {
            background-color: ${colors.gray['100']};
          }
        `}
      >
        {children}
      </a>
    </Link>
  )
}

export default BlogItem
