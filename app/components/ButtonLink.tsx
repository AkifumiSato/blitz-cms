/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import React from 'react'
import { LinkProps } from 'next/link'
import { Link } from 'blitz'
import { colors } from '../stylesheets/colors'

type SizeProperty = {
  fontSize: string
  height: string
}

type SizeDictionary = {
  large: SizeProperty
  normal: SizeProperty
  small: SizeProperty
}

const sizeProperty: SizeDictionary = {
  large: {
    fontSize: '18px',
    height: '50px',
  },
  normal: {
    fontSize: '15px',
    height: '35px',
  },
  small: {
    fontSize: '12px',
    height: '20px',
  },
}

type SizeProps = keyof SizeDictionary

const ButtonLink: React.FC<LinkProps & { size?: SizeProps }> = ({
  children,
  size = 'normal',
  ...props
}) => {
  const { fontSize, height } = sizeProperty[size]
  return (
    <Link {...props}>
      <a
        css={css`
          background-color: ${colors.blue['400']};
          border-radius: 5px;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          justify-content: center;
          color: ${colors.white.base};
          font-size: ${fontSize};
          height: ${height};
          padding: 0 10px;
          width: 100%;
          transition-property: color, background-color;
          transition-duration: 0.5s;

          &&:hover {
            color: ${colors.white.base};
            background-color: ${colors.blue['200']};
          }
        `}
      >
        <div>{children}</div>
      </a>
    </Link>
  )
}

export default ButtonLink
