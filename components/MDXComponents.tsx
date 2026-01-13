import TOCInline from 'pliny/ui/TOCInline'
import Pre from 'pliny/ui/Pre'
import BlogNewsletterForm from 'pliny/ui/BlogNewsletterForm'
import type { MDXComponents } from 'mdx/types'
import { Tweet } from 'react-tweet'
import Image from './Image'
import CustomLink from './Link'
import TableWrapper from './TableWrapper'
import TOCInlineWithSticky from './TOCInlineWithSticky'
import Mermaid from './Mermaid'
import { Subscription } from './Subscription'
import {
  SleepTable2024,
  DietAndExerciseTable2024,
  BooksAndMediaTable2024,
} from './LifeData/2024/index'
import {
  BooksAndMediaTable2025,
  DietAndExerciseTable2025,
  SleepTable2025,
  SleepTableApp2025,
} from './LifeData/2025'
import {
  BooksAndMediaTable2026,
  DietAndExerciseTable2026,
  SleepTable2026,
  SleepTableApp2026,
} from './LifeData/2026'

export const components: MDXComponents = {
  Image,
  TOCInline,
  a: CustomLink,
  pre: Pre,
  table: TableWrapper,
  BlogNewsletterForm,
  TOCInlineWithSticky,
  Tweet,
  Mermaid,
  Subscription,
  SleepTable2024,
  DietAndExerciseTable2024,
  BooksAndMediaTable2024,
  SleepTable2025,
  SleepTableApp2025,
  DietAndExerciseTable2025,
  BooksAndMediaTable2025,
  SleepTable2026,
  SleepTableApp2026,
  DietAndExerciseTable2026,
  BooksAndMediaTable2026,
}
