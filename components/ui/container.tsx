import { cn } from '@/lib/utils'
type ContainerWidth = 'prose' | 'content' | 'layout' | 'wide' | 'full'
interface ContainerProps { children: React.ReactNode; width?: ContainerWidth; className?: string; as?: 'div' | 'section' | 'article' | 'main' | 'aside' }
const widthClasses: Record<ContainerWidth, string> = { prose: 'max-w-prose', content: 'max-w-content', layout: 'max-w-layout', wide: 'max-w-wide', full: 'max-w-none' }
export function Container({ children, width = 'layout', className, as: Tag = 'div' }: ContainerProps) {
  return <Tag className={cn('mx-auto px-6 lg:px-8', widthClasses[width], className)}>{children}</Tag>
}
