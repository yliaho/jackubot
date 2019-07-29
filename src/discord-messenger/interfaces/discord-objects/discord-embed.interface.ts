export interface DiscordEmbedField {
  name: string
  value: string
  inline?: boolean
}

export interface DiscordEmbed {
  title: string
  description: string
  url: string
  color: string | number
  timestamp: Date
  footer: {
    icon_url: string
    text: string
  }
  thumbnail: {
    url: string
  }
  image: {
    url: string
  }
  author: {
    name: string
    url: string
    icon_url: string
  }
  fields: DiscordEmbedField[]
}
