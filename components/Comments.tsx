'use client'

import { Comments as CommentsComponent, CommentsConfig } from 'pliny/comments'
import { useState } from 'react'
import siteMetadata from '@/data/siteMetadata'
import { useTranslation } from './LanguageProvider'

export default function Comments({ slug }: { slug: string }) {
  const { locale, t } = useTranslation()
  const [loadComments, setLoadComments] = useState(false)

  if (!siteMetadata.comments?.provider) {
    return null
  }
  const commentsConfig: CommentsConfig =
    siteMetadata.comments.provider === 'giscus'
      ? {
          ...siteMetadata.comments,
          giscusConfig: {
            ...siteMetadata.comments.giscusConfig,
            lang: locale === 'zh-CN' ? 'zh-CN' : 'en',
          },
        }
      : siteMetadata.comments

  return (
    <>
      {loadComments ? (
        <CommentsComponent commentsConfig={commentsConfig} slug={slug} />
      ) : (
        <button onClick={() => setLoadComments(true)}>{t('comments.load')}</button>
      )}
    </>
  )
}
