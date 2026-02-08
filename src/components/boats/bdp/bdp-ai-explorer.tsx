"use client"

import { useRef, useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"

type MessageAuthor = "user" | "assistant"

type Message = {
  id: string
  author: MessageAuthor
  content: string
}

const SUGGESTED_QUESTIONS = [
  "What are the most notable features?",
  "What safety features are included?",
] as const

type BdpAiExplorerProps = {
  boatTitle: string
}

export function BdpAiExplorer({ boatTitle }: BdpAiExplorerProps) {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [isThinking, setIsThinking] = useState(false)
  const nextIdRef = useRef(0)

  const hasMessages = messages.length > 0

  function nextId(prefix: MessageAuthor) {
    nextIdRef.current += 1
    return `${prefix}-${nextIdRef.current}`
  }

  function addSimulatedAnswer(question: string) {
    const userMessage: Message = {
      id: nextId("user"),
      author: "user",
      content: question,
    }

    const assistantMessage: Message = {
      id: nextId("assistant"),
      author: "assistant",
      content:
        "This is a simulated answer. In the next version, this section will use AI to search the web and expert sources to give you detailed, up-to-date information about this boat.",
    }

    setMessages((prev) => [...prev, userMessage])
    setIsThinking(true)

    // Simulate a short thinking delay before showing the assistant message
    window.setTimeout(() => {
      setMessages((prev) => [...prev, assistantMessage])
      setIsThinking(false)
    }, 600)
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    const trimmed = input.trim()
    if (!trimmed || isThinking) return

    addSimulatedAnswer(trimmed)
    setInput("")
  }

  function handleSuggestedClick(question: string) {
    if (isThinking) return
    addSimulatedAnswer(question)
  }

  return (
    <Card className="rounded-lg border-border/80 bg-background/80">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl sm:text-2xl">
          Ask or choose any question <span className="text-muted-foreground">{boatTitle}</span>
        </CardTitle>
        <CardDescription>
          Merging the web, expert opinions, and more into one place. This is a
          preview using simulated answers.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        {hasMessages ? (
          <div className="space-y-3 rounded-lg border border-border/60 bg-muted/40 p-3 text-sm">
            {messages.map((message) => (
              <div key={message.id} className="space-y-1">
                <p className="text-xs font-semibold text-muted-foreground">
                  {message.author === "user" ? "You" : "Marine Source"}
                </p>
                <p className="text-sm text-foreground">{message.content}</p>
              </div>
            ))}
            {isThinking ? (
              <p className="text-xs text-muted-foreground">Thinking…</p>
            ) : null}
          </div>
        ) : null}

        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-3 rounded-lg border border-border/60 bg-background px-3 py-3"
        >
          <Input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Type your question here..."
            className="border-0 bg-transparent px-0 text-sm shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          <Button
            type="submit"
            disabled={!input.trim() || isThinking}
          >
            Ask to AI
          </Button>
        </form>

        <div className="flex flex-wrap gap-3">
          {SUGGESTED_QUESTIONS.map((question) => (
            <Button
              key={question}
              type="button"
              variant="outline"
              size="sm"
              className="rounded-full border-primary/60 text-primary hover:bg-primary/5"
              onClick={() => handleSuggestedClick(question)}
              disabled={isThinking}
            >
              {question}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

