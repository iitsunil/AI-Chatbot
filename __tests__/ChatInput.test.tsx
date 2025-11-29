import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ChatInput from '@/components/ChatInput'

describe('ChatInput', () => {
  it('renders input field and send button', () => {
    const mockSend = jest.fn()
    render(<ChatInput onSend={mockSend} />)

    expect(screen.getByPlaceholderText(/type your message/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument()
  })

  it('calls onSend when send button is clicked', async () => {
    const user = userEvent.setup()
    const mockSend = jest.fn()
    render(<ChatInput onSend={mockSend} />)

    const input = screen.getByPlaceholderText(/type your message/i)
    const sendButton = screen.getByRole('button', { name: /send/i })

    await user.type(input, 'Hello, chatbot!')
    await user.click(sendButton)

    expect(mockSend).toHaveBeenCalledWith('Hello, chatbot!')
    expect(input).toHaveValue('')
  })

  it('calls onSend when Enter key is pressed', async () => {
    const user = userEvent.setup()
    const mockSend = jest.fn()
    render(<ChatInput onSend={mockSend} />)

    const input = screen.getByPlaceholderText(/type your message/i)

    await user.type(input, 'Hello, chatbot!')
    await user.keyboard('{Enter}')

    expect(mockSend).toHaveBeenCalledWith('Hello, chatbot!')
    expect(input).toHaveValue('')
  })

  it('does not send empty messages', async () => {
    const user = userEvent.setup()
    const mockSend = jest.fn()
    render(<ChatInput onSend={mockSend} />)

    const sendButton = screen.getByRole('button', { name: /send/i })
    await user.click(sendButton)

    expect(mockSend).not.toHaveBeenCalled()
  })

  it('disables input and button when disabled prop is true', () => {
    const mockSend = jest.fn()
    render(<ChatInput onSend={mockSend} disabled={true} />)

    const input = screen.getByPlaceholderText(/type your message/i)
    const sendButton = screen.getByRole('button', { name: /send/i })

    expect(input).toBeDisabled()
    expect(sendButton).toBeDisabled()
  })
})

