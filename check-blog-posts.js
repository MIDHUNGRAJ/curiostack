#!/usr/bin/env node

const { PrismaClient } = require('@prisma/client');

async function checkBlogPosts() {
  const prisma = new PrismaClient();
  
  try {
    console.log('🔄 Connecting to database...');
    
    // Count total blog posts
    const totalPosts = await prisma.blogPost.count();
    console.log(`\n📊 Total blog posts in database: ${totalPosts}`);
    
    if (totalPosts > 0) {
      // Get basic stats
      const categories = await prisma.blogPost.groupBy({
        by: ['category'],
        _count: true,
      });
      
      console.log('\n📑 Posts by category:');
      categories.forEach(cat => {
        console.log(`   ${cat.category}: ${cat._count} posts`);
      });
      
      // Get latest posts
      const latestPosts = await prisma.blogPost.findMany({
        select: {
          title: true,
          category: true,
          date: true,
        },
        orderBy: {
          createdAt: 'desc'
        },
        take: 5
      });
      
      console.log('\n🆕 Latest 5 posts:');
      latestPosts.forEach(post => {
        console.log(`   "${post.title}" (${post.category}) - ${post.date}`);
      });
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

checkBlogPosts();