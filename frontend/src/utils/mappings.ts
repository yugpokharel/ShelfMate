import { Product } from '@/types'

const getFallbackImage = (name: string, category: string) => {
  const normName = name.toLowerCase()
  if (normName.includes('banana')) return 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=500&h=500&fit=crop'
  if (normName.includes('spinach')) return 'https://images.unsplash.com/photo-1599599810694-d3fc7d5c894d?w=500&h=500&fit=crop'
  if (normName.includes('apple')) return 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=500&h=500&fit=crop'
  if (normName.includes('tomato')) return 'https://images.unsplash.com/photo-1592841494993-52ec804ca42d?w=500&h=500&fit=crop'
  if (normName.includes('milk')) return 'https://images.unsplash.com/photo-1563636619-e0db3814b5be?w=500&h=500&fit=crop'
  if (normName.includes('yogurt')) return 'https://images.unsplash.com/photo-1488528130486-8ae231a1b1bc?w=500&h=500&fit=crop'
  if (normName.includes('bread')) return 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&h=500&fit=crop'
  if (normName.includes('egg')) return 'https://images.unsplash.com/photo-1569718212847-cd039da78b25?w=500&h=500&fit=crop'
  if (normName.includes('avocado')) return 'https://lh3.googleusercontent.com/aida-public/AB6AXuDU7A5bhRpy2IG87ABT4aFyWthojHG44zr_KVzZ2zxQ3pBA1UTQ3Vo_sJONYSmzrFkqB3e8S4i-zwwsui5-9zzOS2Jq_cksG4MsgaWnQSy9_yTa5LX7q1m4F9xcSDDL_qo-tkVajHFJ2jJ5c-ZlEqfaW0xXiy7IzrKH2MtEA4jdebANCy7DZUqBKoW-gjjFy_3AAWseDFE_95jO_qFjxbSU6h5VLJvFpDSWBXuSuQWjHQtAqOq5ya8x'

  const cat = category || ''
  if (cat.toLowerCase() === 'fruits') return 'https://images.unsplash.com/photo-1610832958506-ee5633619141?w=500&h=500&fit=crop'
  if (cat.toLowerCase() === 'vegetables') return 'https://images.unsplash.com/photo-1566385101042-1a010c4fd636?w=500&h=500&fit=crop'
  if (cat.toLowerCase() === 'dairy') return 'https://images.unsplash.com/photo-1527018601619-a508a2be00cd?w=500&h=500&fit=crop'
  if (cat.toLowerCase() === 'meat') return 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=500&h=500&fit=crop'
  if (cat.toLowerCase() === 'bakery') return 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&h=500&fit=crop'
  return 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&h=500&fit=crop'
}

export const mapBackendProductToFrontend = (p: any): Product => {
  const catName = p.category?.name || (typeof p.category === 'string' ? p.category : 'Uncategorized')
  return {
    id: p._id || p.id,
    name: p.name,
    price: p.price,
    originalPrice: p.price * 1.25,
    image: p.images?.[0] || getFallbackImage(p.name, catName),
    category: catName,
    rating: p.ratings?.average || 4.5,
    reviews: p.ratings?.count || 12,
    description: p.description || '',
    inStock: p.stock > 0,
    discount: 20,
    tags: p.dietaryTags || [],
  }
}
