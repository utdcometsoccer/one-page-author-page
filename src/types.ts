export type Book = {
  title: string
  description: string
  url?: string
  cover?: string
}

export type SocialLink = {
  name: string
  url: string
}

export type AuthorData = {
  name: string
  welcome: string
  aboutMe: string
  headshot: string
  books?: Book[]
  copyright: string
  social?: SocialLink[]
  email?: string
}

export type LocaleHeaders = {
  welcome: string
  aboutMe: string
  myBooks: string
  loading?: string
  emailPrompt?: string
  contactMe?: string
  emailLinkText?: string
  noEmail?: string
  switchToLight?: string
  switchToDark?: string
}
