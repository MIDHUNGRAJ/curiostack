import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import fs from 'fs'
import path from 'path'

// Force dynamic rendering for AI posts route
export const dynamic = 'force-dynamic'

// Helper function to get shortened category names for badges
const getShortCategoryName = (category: string): string => {
  const shortNames: { [key: string]: string } = {
    'Technology': 'Tech',
    'Cybersecurity': 'Security',
    'Artificial Intelligence': 'AI',
    'Machine Learning': 'ML',
    'Web Development': 'Web Dev',
    'Mobile Development': 'Mobile',
    'Cloud Computing': 'Cloud',
    'Data Science': 'Data',
    'Blockchain': 'Crypto',
    'Internet of Things': 'IoT',
    'Virtual Reality': 'VR',
    'Augmented Reality': 'AR'
  }
  
  return shortNames[category] || category
}

// Helper function to get author name based on category
const getAuthorByCategory = (category: string): string => {
  const authorMap: { [key: string]: string } = {
    'AI': 'AI Team',
    'Technology': 'Tech Team',
    'Cybersecurity': 'Security Team',
    'Business': 'Business Team',
    'Startups': 'Startup Team',
    'Machine Learning': 'ML Team',
    'Web Development': 'Web Dev Team',
    'Mobile Development': 'Mobile Team',
    'Cloud Computing': 'Cloud Team',
    'Data Science': 'Data Team',
    'Blockchain': 'Crypto Team',
    'Internet of Things': 'IoT Team',
    'Virtual Reality': 'VR Team',
    'Augmented Reality': 'AR Team'
  }
  
  return authorMap[category] || 'Tech Team' // Default to Tech Team
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Helper function to estimate read time
    const estimateReadTime = (content: string): string => {
      const wordsPerMinute = 200
      const wordCount = content.split(/\s+/).length
      const minutes = Math.ceil(wordCount / wordsPerMinute)
      return `${minutes} min read`
    }

    // Helper function to generate excerpt if not provided
    const generateExcerpt = (content: string, maxLength: number = 150): string => {
      // Remove markdown formatting for excerpt
      const plainText = content
        .replace(/#{1,6}\s+/g, '') // Remove headers
        .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
        .replace(/\*(.*?)\*/g, '$1') // Remove italic
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove links
        .replace(/`([^`]+)`/g, '$1') // Remove code
        .replace(/\n+/g, ' ') // Replace newlines with spaces
        .trim()
      
      if (plainText.length <= maxLength) {
        return plainText
      }
      
      return plainText.substring(0, maxLength).replace(/\s+\S*$/, '') + '...'
    }

    // Helper function to extract tags from content if not provided
    const extractTagsFromContent = (content: string, title: string): string[] => {
      const commonTags = ['Technology', 'AI', 'Business', 'Startups', 'Cybersecurity', 'Programming', 'Web Development', 'Machine Learning']
      const extractedTags: string[] = []
      
      // Extract tags from title and content
      const textToAnalyze = `${title} ${content}`.toLowerCase()
      
      commonTags.forEach(tag => {
        if (textToAnalyze.includes(tag.toLowerCase())) {
          extractedTags.push(tag)
        }
      })
      
      // Add some default tags if none found
      if (extractedTags.length === 0) {
        extractedTags.push('Technology')
      }
      
      return extractedTags
    }

    // Helper function to determine category from content with enhanced niche detection
    const determineCategory = (content: string, title: string, tags: string[]): string => {
      const textToAnalyze = `${title} ${content}`.toLowerCase()
      
      // AI & Machine Learning niche
      if (textToAnalyze.includes('ai') || 
          textToAnalyze.includes('artificial intelligence') || 
          textToAnalyze.includes('machine learning') ||
          textToAnalyze.includes('deep learning') ||
          textToAnalyze.includes('neural network') ||
          textToAnalyze.includes('gpt') ||
          textToAnalyze.includes('openai') ||
          textToAnalyze.includes('chatgpt') ||
          textToAnalyze.includes('llm') ||
          textToAnalyze.includes('large language model') ||
          textToAnalyze.includes('computer vision') ||
          textToAnalyze.includes('nlp') ||
          textToAnalyze.includes('natural language processing') ||
          textToAnalyze.includes('robotics') ||
          textToAnalyze.includes('automation')) {
        return 'AI'
      }
      
      // Cybersecurity niche
      if (textToAnalyze.includes('cybersecurity') || 
          textToAnalyze.includes('security') || 
          textToAnalyze.includes('hack') || 
          textToAnalyze.includes('breach') || 
          textToAnalyze.includes('api') || 
          textToAnalyze.includes('application programming interface') ||
          textToAnalyze.includes('vulnerability') ||
          textToAnalyze.includes('penetration testing') ||
          textToAnalyze.includes('ethical hacking') ||
          textToAnalyze.includes('firewall') ||
          textToAnalyze.includes('encryption') ||
          textToAnalyze.includes('zero-day') ||
          textToAnalyze.includes('malware') ||
          textToAnalyze.includes('ransomware') ||
          textToAnalyze.includes('phishing') ||
          textToAnalyze.includes('data breach') ||
          textToAnalyze.includes('compliance') ||
          textToAnalyze.includes('gdpr') ||
          textToAnalyze.includes('privacy')) {
        return 'Cybersecurity'
      }
      
      // Startups & Entrepreneurship niche
      if (textToAnalyze.includes('startup') || 
          textToAnalyze.includes('entrepreneur') ||
          textToAnalyze.includes('venture capital') ||
          textToAnalyze.includes('funding') ||
          textToAnalyze.includes('seed round') ||
          textToAnalyze.includes('series a') ||
          textToAnalyze.includes('series b') ||
          textToAnalyze.includes('unicorn') ||
          textToAnalyze.includes('pitch deck') ||
          textToAnalyze.includes('mvp') ||
          textToAnalyze.includes('product-market fit') ||
          textToAnalyze.includes('accelerator') ||
          textToAnalyze.includes('incubator') ||
          textToAnalyze.includes('angel investor') ||
          textToAnalyze.includes('bootstrapping')) {
        return 'Startups'
      }
      
      // Business & Strategy niche
      if (textToAnalyze.includes('business') || 
          textToAnalyze.includes('strategy') ||
          textToAnalyze.includes('digital transformation') ||
          textToAnalyze.includes('innovation') ||
          textToAnalyze.includes('leadership') ||
          textToAnalyze.includes('management') ||
          textToAnalyze.includes('marketing') ||
          textToAnalyze.includes('sales') ||
          textToAnalyze.includes('customer') ||
          textToAnalyze.includes('revenue') ||
          textToAnalyze.includes('profit') ||
          textToAnalyze.includes('growth') ||
          textToAnalyze.includes('scaling') ||
          textToAnalyze.includes('competitive advantage') ||
          textToAnalyze.includes('market analysis') ||
          textToAnalyze.includes('business model')) {
        return 'Business'
      }
      
      // Technology (default for tech topics not fitting other niches)
      if (textToAnalyze.includes('technology') || 
          textToAnalyze.includes('software') ||
          textToAnalyze.includes('programming') ||
          textToAnalyze.includes('development') ||
          textToAnalyze.includes('coding') ||
          textToAnalyze.includes('web') ||
          textToAnalyze.includes('mobile') ||
          textToAnalyze.includes('cloud') ||
          textToAnalyze.includes('database') ||
          textToAnalyze.includes('infrastructure') ||
          textToAnalyze.includes('devops') ||
          textToAnalyze.includes('blockchain') ||
          textToAnalyze.includes('crypto') ||
          textToAnalyze.includes('iot') ||
          textToAnalyze.includes('internet of things') ||
          textToAnalyze.includes('5g') ||
          textToAnalyze.includes('quantum computing')) {
        return 'Technology'
      }
      
      return 'Technology' // Default category for any other content
    }

    // Prepare post data with smart defaults
    const determinedCategory = body.category || determineCategory(body.content || '', body.title || '', body.tags || [])
    const postData = {
      title: body.title || 'Untitled Post',
      excerpt: body.excerpt || generateExcerpt(body.content || ''),
      content: body.content || '',
      category: determinedCategory,
      image: body.image || 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop', // Default tech image
      date: body.date || new Date().toISOString().split('T')[0],
      readTime: body.readTime || estimateReadTime(body.content || ''),
      author: body.author || getAuthorByCategory(determinedCategory),
      tags: body.tags || extractTagsFromContent(body.content || '', body.title || ''),
      featured: body.featured || false,
      source: body.source || getShortCategoryName(determinedCategory),
      aiVersion: body.aiVersion || '1.0'
    }

    // Validate that we have at least title and content
    if (!body.title && !body.content) {
      return NextResponse.json(
        { error: 'At least title or content is required' },
        { status: 400 }
      )
    }

    // Validate date format if provided (YYYY-MM-DD)
    if (body.date) {
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/
      if (!dateRegex.test(body.date)) {
        return NextResponse.json(
          { error: 'Invalid date format. Use YYYY-MM-DD format' },
          { status: 400 }
        )
      }
    }

    // Create new post
    const post = await prisma.blogPost.create({
      data: {
        title: postData.title,
        excerpt: postData.excerpt,
        content: postData.content,
        category: postData.category,
        image: postData.image,
        date: postData.date,
        readTime: postData.readTime,
        author: postData.author,
        tags: JSON.stringify(postData.tags),
        featured: postData.featured,
        source: postData.source,
        aiVersion: postData.aiVersion
      }
    })

    return NextResponse.json({
      message: 'AI post created successfully',
      post: {
        ...post,
        tags: JSON.parse(post.tags || '[]')
      },
      autoGenerated: {
        excerpt: !body.excerpt,
        category: !body.category,
        image: !body.image,
        readTime: !body.readTime,
        author: !body.author,
        tags: !body.tags,
        date: !body.date
      }
    })
  } catch (error) {
    console.error('Error creating AI post:', error)
    return NextResponse.json(
      { error: 'Failed to create AI post' },
      { status: 500 }
    )
  }
}

// New endpoint to process JSON files from a directory
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { directory = 'processed-data' } = body
    
    const dataDir = path.join(process.cwd(), directory)
    const results: {
      processed: number;
      errors: number;
      posts: Array<{ id: string; title: string; filename: string }>;
    } = {
      processed: 0,
      errors: 0,
      posts: []
    }

    // Check if directory exists
    if (!fs.existsSync(dataDir)) {
      return NextResponse.json(
        { error: `Directory ${directory} does not exist` },
        { status: 400 }
      )
    }

    // Read all JSON files in the directory
    const files = fs.readdirSync(dataDir).filter(file => file.endsWith('.json'))
    
    for (const file of files) {
      try {
        const filePath = path.join(dataDir, file)
        const fileContent = fs.readFileSync(filePath, 'utf-8')
        
        // Skip empty files
        if (!fileContent.trim()) {
          console.log(`⚠️ Skipping empty file: ${file}`)
          fs.unlinkSync(filePath) // Delete empty file
          continue
        }
        
        const jsonData = JSON.parse(fileContent)
        
        // Process the JSON data and create a blog post
        const post = await processJsonToBlogPost(jsonData, file)
        
        if (post) {
          results.posts.push(post)
          results.processed++
          
          // Move to processed directory for backup, then delete original
          const processedDir = path.join(dataDir, 'processed')
          if (!fs.existsSync(processedDir)) {
            fs.mkdirSync(processedDir, { recursive: true })
          }
          
          // Copy to processed directory for backup
          fs.copyFileSync(filePath, path.join(processedDir, file))
          
          // Delete the original file from processed-data/
          fs.unlinkSync(filePath)
          
          console.log(`✅ Processed and deleted: ${file}`)
        }
      } catch (error) {
        console.error(`Error processing file ${file}:`, error)
        results.errors++
      }
    }

    return NextResponse.json({
      message: `Processed ${results.processed} files, ${results.errors} errors`,
      results
    })
  } catch (error) {
    console.error('Error processing JSON files:', error)
    return NextResponse.json(
      { error: 'Failed to process JSON files' },
      { status: 500 }
    )
  }
}

// Helper function to convert JSON data to blog post
async function processJsonToBlogPost(jsonData: any, filename: string) {
  try {
    // Extract data from JSON - handle different possible structures
    const title = jsonData.title || jsonData.headline || jsonData.name || 'Untitled Post'
    const content = jsonData.content || jsonData.body || jsonData.text || jsonData.article || ''
    const excerpt = jsonData.excerpt || jsonData.summary || jsonData.description || ''
    const image = jsonData.image || jsonData.imageUrl || jsonData.thumbnail || 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop'
    const tags = jsonData.tags || jsonData.keywords || []
    const featured = jsonData.featured || false
            // Use source if provided, otherwise use category name as badge (will be updated after processing)
    let source = jsonData.source || null
    const aiVersion = jsonData.aiVersion || jsonData.version || '1.0'
    
    // Generate missing fields
    const estimatedReadTime = estimateReadTime(content)
    const generatedExcerpt = excerpt || generateExcerpt(content)
    const extractedTags = tags.length > 0 ? tags : extractTagsFromContent(content, title)
    const determinedCategory = determineCategory(content, title, extractedTags)
    
    // Use provided category if it exists, otherwise use determined category
    let finalCategory = jsonData.category || jsonData.topic || determinedCategory
    
    // Fix category case
    const categoryMap: { [key: string]: string } = {
      'ai': 'AI',
      'technology': 'Technology',
      'business': 'Business',
      'startups': 'Startups',
      'cybersecurity': 'Cybersecurity',
      'apis': 'APIs'
    }
    finalCategory = categoryMap[finalCategory.toLowerCase()] || finalCategory
    
    source = jsonData.source || getShortCategoryName(finalCategory)
    

    
    // Validate date format if provided (YYYY-MM-DD)
    if (jsonData.date) {
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/
      if (!dateRegex.test(jsonData.date)) {
        console.error(`Invalid date format in ${filename}: ${jsonData.date}. Using current date.`)
      }
    }

    // Set author based on category, or use provided author as fallback
    const author = jsonData.author || jsonData.writer || jsonData.creator || getAuthorByCategory(finalCategory)

    // Create the blog post
    const post = await prisma.blogPost.create({
      data: {
        title,
        excerpt: generatedExcerpt,
        content,
        category: finalCategory,
        image,
        date: jsonData.date || new Date().toISOString().split('T')[0],
        readTime: estimatedReadTime,
        author,
        tags: JSON.stringify(extractedTags),
        featured,
        source,
        aiVersion
      }
    })

    return {
      id: post.id,
      title: post.title,
      filename
    }
  } catch (error) {
    console.error('Error creating post from JSON:', error)
    return null
  }
}

// Helper functions (same as above)
function estimateReadTime(content: string): string {
  const wordsPerMinute = 200
  const wordCount = content.split(/\s+/).length
  const minutes = Math.ceil(wordCount / wordsPerMinute)
  return `${minutes} min read`
}

function generateExcerpt(content: string, maxLength: number = 150): string {
  const plainText = content
    .replace(/#{1,6}\s+/g, '')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\n+/g, ' ')
    .trim()
  
  if (plainText.length <= maxLength) {
    return plainText
  }
  
  return plainText.substring(0, maxLength).replace(/\s+\S*$/, '') + '...'
}

function extractTagsFromContent(content: string, title: string): string[] {
  const commonTags = ['Technology', 'AI', 'Business', 'Startups', 'Cybersecurity', 'Programming', 'Web Development', 'Machine Learning']
  const extractedTags: string[] = []
  
  const textToAnalyze = `${title} ${content}`.toLowerCase()
  
  commonTags.forEach(tag => {
    if (textToAnalyze.includes(tag.toLowerCase())) {
      extractedTags.push(tag)
    }
  })
  
  if (extractedTags.length === 0) {
    extractedTags.push('Technology')
  }
  
  return extractedTags
}

function determineCategory(content: string, title: string, tags: string[]): string {
  const textToAnalyze = `${title} ${content}`.toLowerCase()
  
  // AI & Machine Learning niche
  if (textToAnalyze.includes('ai') || 
      textToAnalyze.includes('artificial intelligence') || 
      textToAnalyze.includes('machine learning') ||
      textToAnalyze.includes('deep learning') ||
      textToAnalyze.includes('neural network') ||
      textToAnalyze.includes('gpt') ||
      textToAnalyze.includes('openai') ||
      textToAnalyze.includes('chatgpt') ||
      textToAnalyze.includes('llm') ||
      textToAnalyze.includes('large language model') ||
      textToAnalyze.includes('computer vision') ||
      textToAnalyze.includes('nlp') ||
      textToAnalyze.includes('natural language processing') ||
      textToAnalyze.includes('robotics') ||
      textToAnalyze.includes('automation')) {
    return 'AI'
  }
  
  // Cybersecurity niche
  if (textToAnalyze.includes('cybersecurity') || 
      textToAnalyze.includes('security') || 
      textToAnalyze.includes('hack') || 
      textToAnalyze.includes('breach') || 
      textToAnalyze.includes('api') || 
      textToAnalyze.includes('application programming interface') ||
      textToAnalyze.includes('vulnerability') ||
      textToAnalyze.includes('penetration testing') ||
      textToAnalyze.includes('ethical hacking') ||
      textToAnalyze.includes('firewall') ||
      textToAnalyze.includes('encryption') ||
      textToAnalyze.includes('zero-day') ||
      textToAnalyze.includes('malware') ||
      textToAnalyze.includes('ransomware') ||
      textToAnalyze.includes('phishing') ||
      textToAnalyze.includes('data breach') ||
      textToAnalyze.includes('compliance') ||
      textToAnalyze.includes('gdpr') ||
      textToAnalyze.includes('privacy')) {
    return 'Cybersecurity'
  }
  
  // Startups & Entrepreneurship niche
  if (textToAnalyze.includes('startup') || 
      textToAnalyze.includes('entrepreneur') ||
      textToAnalyze.includes('venture capital') ||
      textToAnalyze.includes('funding') ||
      textToAnalyze.includes('seed round') ||
      textToAnalyze.includes('series a') ||
      textToAnalyze.includes('series b') ||
      textToAnalyze.includes('unicorn') ||
      textToAnalyze.includes('pitch deck') ||
      textToAnalyze.includes('mvp') ||
      textToAnalyze.includes('product-market fit') ||
      textToAnalyze.includes('accelerator') ||
      textToAnalyze.includes('incubator') ||
      textToAnalyze.includes('angel investor') ||
      textToAnalyze.includes('bootstrapping')) {
    return 'Startups'
  }
  
  // Business & Strategy niche
  if (textToAnalyze.includes('business') || 
      textToAnalyze.includes('strategy') ||
      textToAnalyze.includes('digital transformation') ||
      textToAnalyze.includes('innovation') ||
      textToAnalyze.includes('leadership') ||
      textToAnalyze.includes('management') ||
      textToAnalyze.includes('marketing') ||
      textToAnalyze.includes('sales') ||
      textToAnalyze.includes('customer') ||
      textToAnalyze.includes('revenue') ||
      textToAnalyze.includes('profit') ||
      textToAnalyze.includes('growth') ||
      textToAnalyze.includes('scaling') ||
      textToAnalyze.includes('competitive advantage') ||
      textToAnalyze.includes('market analysis') ||
      textToAnalyze.includes('business model')) {
    return 'Business'
  }
  
  // Technology (default for tech topics not fitting other niches)
  if (textToAnalyze.includes('technology') || 
      textToAnalyze.includes('software') ||
      textToAnalyze.includes('programming') ||
      textToAnalyze.includes('development') ||
      textToAnalyze.includes('coding') ||
      textToAnalyze.includes('web') ||
      textToAnalyze.includes('mobile') ||
      textToAnalyze.includes('cloud') ||
      textToAnalyze.includes('database') ||
      textToAnalyze.includes('infrastructure') ||
      textToAnalyze.includes('devops') ||
      textToAnalyze.includes('blockchain') ||
      textToAnalyze.includes('crypto') ||
      textToAnalyze.includes('iot') ||
      textToAnalyze.includes('internet of things') ||
      textToAnalyze.includes('5g') ||
      textToAnalyze.includes('quantum computing')) {
    return 'Technology'
  }
  
  return 'Technology' // Default category for any other content
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '50')
    const skip = (page - 1) * limit

    // Get CurioStack posts (posts with source = 'CurioStack' or 'CurioStack AI')
    const posts = await prisma.blogPost.findMany({
      where: {
        OR: [
          { source: 'CurioStack' },
          { source: 'CurioStack AI' }
        ]
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
    })

    const totalPosts = await prisma.blogPost.count({
      where: {
        OR: [
          { source: 'CurioStack' },
          { source: 'CurioStack AI' }
        ]
      }
    })

    // Transform posts to include parsed tags
    const transformedPosts = posts.map(post => ({
      ...post,
      tags: JSON.parse(post.tags || '[]')
    }))

    return NextResponse.json({
      posts: transformedPosts,
      pagination: {
        totalPosts,
        totalPages: Math.ceil(totalPosts / limit),
        currentPage: page,
        hasNextPage: skip + limit < totalPosts,
        hasPrevPage: page > 1
      }
    })
  } catch (error) {
    console.error('Error fetching CurioStack posts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch CurioStack posts' },
      { status: 500 }
    )
  }
} 