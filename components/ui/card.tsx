import * as React from "react"

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({  ...props }, ref) => (
    <div
      ref={ref}
      className="rounded-lg border bg-white shadow"
      {...props}
    />
  )
)
Card.displayName = "Card"

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ ...props }, ref) => (
    <div
      ref={ref}
      className="flex flex-col space-y-1.5 p-6"
      {...props}
    />
  )
)
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ ...props }, ref) => (
    <div
      ref={ref}
      className="flex flex-col space-y-1.5 p-6"
      {...props}
    />
  )
)
CardTitle.displayName = "CardTitle"

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ ...props }, ref) => (
    <div ref={ref} className="p-6 pt-0" {...props} />
  )
)
CardContent.displayName = "CardContent"

export { Card, CardHeader, CardContent, CardTitle }