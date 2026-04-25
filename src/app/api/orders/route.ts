import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        customer_name: body.customer_name,
        customer_phone: body.customer_phone,
        customer_email: body.customer_email,
        shipping_address: body.shipping_address,
        notes: body.notes,
        total: body.total,
        status: 'pending',
        payment_method: 'cod',
      })
      .select()
      .single()

    if (orderError) throw orderError

    const orderItems = body.items.map((item: { product_id: string; product_name: string; price: number; quantity: number }) => ({
      order_id: order.id,
      product_id: item.product_id,
      product_name: item.product_name,
      price: item.price,
      quantity: item.quantity,
    }))

    const { error: itemsError } = await supabase.from('order_items').insert(orderItems)
    if (itemsError) throw itemsError

    return NextResponse.json({ success: true, orderId: order.id })
  } catch (error) {
    console.error('Order error:', error)
    return NextResponse.json({ success: false, message: 'Lỗi tạo đơn hàng' }, { status: 500 })
  }
}

export async function GET() {
  const { data, error } = await supabase
    .from('orders')
    .select('*, order_items(*)')
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}
