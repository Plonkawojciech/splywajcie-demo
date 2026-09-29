import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { pl } from '@payloadcms/translations/languages/pl'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Rivers } from './collections/Rivers'
import { Packages } from './collections/Packages'
import { Equipment } from './collections/Equipment'
import { News } from './collections/News'
import { Reservations } from './collections/Reservations'
import { Settings } from './globals/Settings'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const hosts = ['https://splywajcie.programo.pl', 'http://localhost:3014']

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    meta: { titleSuffix: ' · Splywajcie.pl CMS' },
    components: { graphics: { Logo: '@/components/admin/Logo', Icon: '@/components/admin/Icon' } },
  },
  i18n: { supportedLanguages: { pl }, fallbackLanguage: 'pl' },
  collections: [Reservations, Rivers, Packages, Equipment, News, Media, Users],
  globals: [Settings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'dev-secret',
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
  db: sqliteAdapter({
    client: { url: process.env.DATABASE_URI || 'file:./payload.db' },
    migrationDir: path.resolve(dirname, 'migrations'),
    push: false,
  }),
  sharp,
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL,
  cors: hosts,
  csrf: hosts,
})
