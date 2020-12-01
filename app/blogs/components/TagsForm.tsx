import { Tag } from '@prisma/client'
import React, { useState } from 'react'

type TagsFormProps = {
  tags: Tag[]
  onSubmit: (e: React.FormEvent<HTMLFormElement>, name: string) => void
}

const TagsForm: React.FC<TagsFormProps> = ({ tags, onSubmit }) => {
  const [name, setName] = useState('')

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit(event, name)
      }}
    >
      <ul>
        {tags.map((tag) => (
          <li key={tag.id}>
            <button>{tag.name}</button>
          </li>
        ))}
      </ul>

      <h3>New tag name</h3>
      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <button
        style={{
          marginTop: '30px',
        }}
      >
        Submit
      </button>
    </form>
  )
}

export default TagsForm
