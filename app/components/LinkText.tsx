/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import { Link } from 'blitz'
import React from 'react'

type Props = {
  href: string
}

const LinkText: React.FC<Props> = ({ href, children }) => {
  return (
    <Link href={href}>
      <a
        css={css`
          text-decoration: underline;
        `}
      >
        {children}
      </a>
    </Link>
  )
}

export default LinkText
