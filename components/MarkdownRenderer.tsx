'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { Components } from 'react-markdown'

interface MarkdownRendererProps {
  content: string
  className?: string
}

export default function MarkdownRenderer({ content, className = '' }: MarkdownRendererProps) {
  const components: Components = {
    // Enhanced paragraph styling
    p: ({ children }) => (
      <p className="mb-6 leading-relaxed text-lg text-slate-700 dark:text-slate-300">
        {children}
      </p>
    ),
    
    // Enhanced heading styles with proper hierarchy
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mt-12 mb-6 leading-tight">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mt-10 mb-5 leading-tight">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mt-8 mb-4 leading-tight">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mt-6 mb-3 leading-tight">
        {children}
      </h4>
    ),
    
    // Enhanced emphasis and strong text
    strong: ({ children }) => (
      <strong className="font-semibold text-slate-900 dark:text-slate-100">
        {children}
      </strong>
    ),
    em: ({ children }) => (
      <em className="italic text-slate-600 dark:text-slate-400">
        {children}
      </em>
    ),
    
    // Enhanced blockquotes
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-blue-500 pl-6 py-4 my-8 bg-slate-50 dark:bg-slate-800 rounded-r-lg italic">
        {children}
      </blockquote>
    ),
    
    // Enhanced lists
    ul: ({ children }) => (
      <ul className="my-6 pl-6 space-y-2 list-disc">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="my-6 pl-6 space-y-2 list-decimal">
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li className="leading-relaxed text-slate-700 dark:text-slate-300">
        {children}
      </li>
    ),
    
    // Enhanced links
    a: ({ href, children }) => (
      <a 
        href={href}
        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline decoration-2 underline-offset-2 transition-colors"
        target={href?.startsWith('http') ? '_blank' : undefined}
        rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    ),
    
    // Enhanced code blocks
    code: ({ className, children, ...props }: any) => {
      const match = /language-(\w+)/.exec(className || '')
      const isInline = !className || !match
      return !isInline && match ? (
        <SyntaxHighlighter
          style={oneDark}
          language={match[1]}
          PreTag="div"
          className="my-6 rounded-lg"
          {...props}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code 
          className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-sm font-mono text-slate-800 dark:text-slate-200"
          {...props}
        >
          {children}
        </code>
      )
    },
    
    // Enhanced tables
    table: ({ children }) => (
      <div className="my-8 overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
          {children}
        </table>
      </div>
    ),
    thead: ({ children }) => (
      <thead className="bg-slate-50 dark:bg-slate-800">
        {children}
      </thead>
    ),
    tbody: ({ children }) => (
      <tbody className="bg-white dark:bg-slate-900 divide-y divide-slate-200 dark:divide-slate-700">
        {children}
      </tbody>
    ),
    th: ({ children }) => (
      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-slate-100">
        {children}
      </td>
    ),
    
    // Enhanced horizontal rule
    hr: () => (
      <hr className="my-12 border-t border-slate-200 dark:border-slate-700" />
    ),
  }

  return (
    <div className={`prose prose-xl max-w-none ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
