import React from "react"

type BlogFormProps = {
  onSubmit: React.FormEventHandler<HTMLFormElement>
}

const BlogForm: React.FC<BlogFormProps> = ({ onSubmit, children }) => {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit(event)
      }}
    >
      {children}
      <button
        style={{
          marginTop: "30px",
        }}
      >
        Submit
      </button>
    </form>
  )
}

export default BlogForm
