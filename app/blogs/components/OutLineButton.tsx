/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import { Link } from 'blitz'
import React from 'react'
import { colors } from 'app/stylesheets/colors'

const buttonStyle = css`
  border: 1px solid ${colors.gray['700']};
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  width: 100px;
  font-size: 15px;
  color: ${colors.gray['700']};
  transition-property: color, background-color;
  transition-duration: 0.5s;
  cursor: pointer;

  &:disabled {
    border: 1px solid ${colors.gray['400']};
    color: ${colors.gray['400']};
  }

  &&:not(:disabled):hover {
    background-color: ${colors.gray['700']};
    color: ${colors.white.base};
  }
`

const OutLineButton: React.FC<{
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  disabled?: boolean
  href?: string
}> = ({ onClick = (e) => e.preventDefault(), disabled, href, children }) => {
  if (href) {
    return (
      <Link href={href}>
        <a css={buttonStyle}>{children}</a>
      </Link>
    )
  }

  return (
    <button onClick={onClick} disabled={disabled} css={buttonStyle}>
      {children}
    </button>
  )
}

export default OutLineButton
