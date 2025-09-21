# CurioStack - News Aggregation Platform

A production-ready news aggregation and AI-summarized content platform for AI, Business, Data-Science,Cybersecurity niches. Automatically processes scraped data, categorizes it with AI, and displays it.

## 🚀 **Features**

### **Automated Content Processing:**
- **Scraped data** → **AI processing** → **Database storage** → **Website display**
- **Auto-categorization** (AI, Business, Data-Science, Cybersecurity)
- **Auto-tagging** based on content keywords
- **Auto-excerpt generation**
- **Auto-image assignment** by category

### **Easy Management:**
- **Admin interface** for content management
- **Command-line tools** for batch operations
- **Statistics dashboard** for monitoring
- **One-click operations** for content management

### **Production-Ready:**
- **Database-driven** (handles thousands of posts)
- **Ad integration** ready
- **SEO optimized**
- **Mobile responsive**
- **Fast loading**

## 🛠️ **Quick Start**

### **1. Install Dependencies:**
```bash
npm install
```

### **2. Setup Database:**
```bash
npx prisma generate
npx prisma db push
```

### **3. Start Development Server:**
```bash
npm run dev
```

### **4. Access Your Platform:**
- **Website**: http://localhost:3001
- **Admin Panel**: http://localhost:3001/admin

```

### **Scraped Data Format:**
```json
{
  "title": "Your Article Title",
  "content": "Your article content here...",
  "url": "https://source.com/article",
  "source": "Tech News",
  "date": "2024-01-15"
}
```

## 📁 **Project Structure**

```
website/
├── app/                    # Next.js app directory
├── components/            # React components
├── lib/                   # Utilities and services
│   ├── types.ts          # TypeScript interfaces
│   ├── db.ts             # Database connection
│   ├── blog-service.ts   # Client-side API service
│   └── server-blog-service.ts # Server-side database service
├── prisma/               # Database schema and migrations
│   └── schema.prisma     # Database schema
└── [other config files]
```

## 🎯 **Perfect for News Aggregation**

✅ **Automated processing** - handles scraped data automatically  
✅ **AI categorization** - content is processed and organized  
✅ **Easy management** - monitor and adjust, minimal manual work  
✅ **Production ready** - handles many users and ads  
✅ **Scalable** - can manage thousands of articles   


## 🔧 **Technology Stack**

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS
- **Database**: SQLite (dev) / PostgreSQL (prod)
- **ORM**: Prisma
- **Processing**: python backend automation
- **Deployment**: Vercel ready

## 📋 **Content Categories**

- **AI** - Artificial Intelligence, Machine Learning
- **Technology** - General tech news and trends
- **Business** - Strategy, markets, companies
- **Data Science** - Data, Study, news, updates
- **CyberSecurity** - Cyber attacks, latest news, hackers
- **APIs** - Development, programming, integration


## 🚀 **Deployment**

### **Development:**
```bash
npm run dev
```

### **Production:**
```bash
npm run build
npm start
```

### **Database Migration:**
```bash
npx prisma migrate deploy
```

---

**🎉 Your news aggregation platform is ready for production!**

The system automatically handles content processing, categorization, and display while you focus on monitoring and optimization. 

