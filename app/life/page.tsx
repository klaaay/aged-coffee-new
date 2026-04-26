import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import { genPageMetadata } from 'app/seo'
import ListLayout from '@/layouts/ListLayout'

export const metadata = genPageMetadata({
  title: '生活',
  description: '生活相关记录索引',
})

export default async function LifePage() {
  const posts = allCoreContent(
    sortPosts(
      allBlogs.filter((post) => post.slug.startsWith('life/') && post.slug.split('/').length === 2)
    )
  )

  return <ListLayout posts={posts} title="生活" />
}
