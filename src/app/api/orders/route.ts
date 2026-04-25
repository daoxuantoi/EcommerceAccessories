import { NextRequest, NextResponse } from 'next/server'

const orders: Record<string, unknown>[] = []

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const order = {
      id: `ORD-${Date.now()}`,
      ...body,
      status: 'pending',
      payment_method: 'cod',
      created_at: new Date().toISOString(),
    }
    orders.push(order)
    return NextResponse.json({ success: true, orderId: order.id })
  } catch {
    return NextResponse.json({ success: false, message: 'Lỗi tạo đơn hàng' }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json(orders)
}
