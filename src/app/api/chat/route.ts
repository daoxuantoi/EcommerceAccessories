import Anthropic from '@anthropic-ai/sdk'
import { NextRequest, NextResponse } from 'next/server'
import { products, categories } from '@/lib/data'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const SYSTEM_PROMPT = `Bạn là trợ lý tư vấn bán hàng thông minh của cửa hàng đồ gia dụng "Nhà Xinh".
Nhiệm vụ của bạn là giúp khách hàng tìm sản phẩm phù hợp, so sánh sản phẩm, và trả lời câu hỏi về đồ gia dụng.

DANH MỤC SẢN PHẨM:
${categories.map(c => `- ${c.name}: ${c.description}`).join('\n')}

SẢN PHẨM HIỆN CÓ:
${products.map(p => `- ${p.name} | Giá: ${p.price.toLocaleString('vi-VN')}đ | Thương hiệu: ${p.brand} | Đánh giá: ${p.rating}/5 | Tính năng: ${p.features?.join(', ')}`).join('\n')}

NGUYÊN TẮC TƯ VẤN:
1. Trả lời ngắn gọn, thân thiện bằng tiếng Việt
2. Khi gợi ý sản phẩm, đề cập tên sản phẩm và giá cụ thể
3. So sánh ưu nhược điểm khi khách hỏi nhiều sản phẩm
4. Hỏi thêm về nhu cầu (ngân sách, gia đình mấy người, v.v.) để tư vấn tốt hơn
5. Không bịa thêm sản phẩm không có trong danh sách
6. Luôn kết thúc bằng câu hỏi để tiếp tục hỗ trợ`

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()

    const response = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: messages.map((m: { role: string; content: string }) => ({
        role: m.role,
        content: m.content,
      })),
    })

    const message = response.content[0].type === 'text' ? response.content[0].text : 'Xin lỗi, có lỗi xảy ra.'

    return NextResponse.json({ message })
  } catch (error) {
    console.error('Chat error:', error)
    return NextResponse.json({ message: 'Xin lỗi, dịch vụ chat tạm thời gián đoạn. Vui lòng thử lại sau!' }, { status: 500 })
  }
}
