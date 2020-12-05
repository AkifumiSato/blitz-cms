/** @jsx jsx */
import { css, jsx } from '@emotion/react'
import React from 'react'
import { colors } from '../../stylesheets/colors'

type Props = {
  value: string
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>
  maxLength?: number
}

const Textarea: React.FC<Props> = ({ value, onChange, maxLength }) => (
  <textarea
    value={value}
    maxLength={maxLength}
    onChange={onChange}
    css={css`
      border: 1px solid ${colors.gray['400']};
      border-radius: 3px;
      padding: 10px;
      height: 500px;
      font-size: 15px;
      line-height: 1.5;
      width: 100%;
    `}
  />
)

export default Textarea
