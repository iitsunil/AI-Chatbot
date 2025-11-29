import { render, screen } from '@testing-library/react'
import ChatMessage from '@/components/ChatMessage'
import { Message } from '@/lib/db'

describe('ChatMessage', () => {
  const mockUserMessage: Message = {
    id: '1',
    conversation_id: 'conv-1',
    role: 'user',
    content: 'Hello, chatbot!',
    created_at: new Date().toISOString(),
  }

  const mockAssistantMessage: Message = {
    id: '2',
    conversation_id: 'conv-1',
    role: 'assistant',
    content: 'Hello! How can I help you?',
    created_at: new Date().toISOString(),
  }

  it('renders user message correctly', () => {
    render(<ChatMessage message={mockUserMessage} />)
    
    expect(screen.getByText('Hello, chatbot!')).toBeInTheDocument()
  })

  it('renders assistant message correctly', () => {
    render(<ChatMessage message={mockAssistantMessage} />)
    
    expect(screen.getByText('Hello! How can I help you?')).toBeInTheDocument()
  })

  it('applies correct styling for user messages', () => {
    const { container } = render(<ChatMessage message={mockUserMessage} />)
    const messageDiv = container.querySelector('.bg-blue-600')
    
    expect(messageDiv).toBeInTheDocument()
  })

  it('applies correct styling for assistant messages', () => {
    const { container } = render(<ChatMessage message={mockAssistantMessage} />)
    const messageDiv = container.querySelector('.bg-white')
    
    expect(messageDiv).toBeInTheDocument()
  })
})

