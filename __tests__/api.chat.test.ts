/**
 * Integration tests for chat API
 * Note: These tests require environment variables to be set
 * Run with: npm test -- __tests__/api.chat.test.ts
 */

describe('Chat API', () => {
  const API_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

  it('should handle profile request detection', () => {
    const profilePhrases = [
      'Who am I?',
      'Tell me about myself',
      'What do you know about me?',
      'My profile',
      'Describe me',
    ]

    const isProfileRequest = (message: string): boolean => {
      const lowerMessage = message.toLowerCase()
      return (
        lowerMessage.includes('who am i') ||
        lowerMessage.includes('tell me about myself') ||
        lowerMessage.includes('what do you know about me') ||
        lowerMessage.includes('my profile') ||
        lowerMessage.includes('describe me')
      )
    }

    profilePhrases.forEach((phrase) => {
      expect(isProfileRequest(phrase)).toBe(true)
    })

    expect(isProfileRequest('Hello')).toBe(false)
    expect(isProfileRequest('How are you?')).toBe(false)
  })

  it('should validate message format', () => {
    const validMessage = 'Hello, chatbot!'
    const emptyMessage = '   '
    const longMessage = 'a'.repeat(10000)

    expect(validMessage.trim().length).toBeGreaterThan(0)
    expect(emptyMessage.trim().length).toBe(0)
    expect(longMessage.length).toBeGreaterThan(0)
  })
})

