const fs = require('fs')
const path = require('path')

const botDirectory = path.resolve(__dirname, '../..')
let catalog, catalogSignature, lastCheckedAt = 0

class KuramaEmojis {

  static getCatalogFile() {
    if (process.env.KURAMA_EMOJIS_FILE) {
      const configuredFile = path.resolve(process.env.KURAMA_EMOJIS_FILE)
      if (fs.existsSync(configuredFile)) return configuredFile;

      throw new Error('Configure KURAMA_EMOJIS_FILE com o caminho do kurama-emojis.json compartilhado.')
    }

    const catalogFiles = [
      path.join(botDirectory, 'shared/kurama-emojis.json'),
      path.resolve(botDirectory, '../kurama-stable/shared/kurama-emojis.json'),
      path.resolve(botDirectory, '../../Fuzzy-Kurama/kurama-stable/shared/kurama-emojis.json')
    ]

    const catalogFile = catalogFiles.find(file => fs.existsSync(file))
    if (!catalogFile) throw new Error('Configure KURAMA_EMOJIS_FILE com o caminho do kurama-emojis.json compartilhado.')

    return catalogFile;
  }

  static validateCatalog(emojis) {
    if (!emojis || typeof emojis !== 'object' || Array.isArray(emojis)) {
      throw new Error('Catálogo de emojis inválido.')
    }

    for (const [key, emoji] of Object.entries(emojis)) {
      const validKey = /^[A-Za-z0-9_]+$/.test(key)
      const validID = emoji && typeof emoji.id === 'string' && /^\d{17,20}$/.test(emoji.id)
      const validName = emoji && /^[A-Za-z0-9_]{2,32}$/.test(emoji.name)
      const validAnimated = emoji && typeof emoji.animated === 'boolean'

      if (!validKey || !validID || !validName || !validAnimated) {
        throw new Error(`Emoji inválido: ${key}`)
      }

      Object.freeze(emoji)
    }

    return Object.freeze(emojis);
  }

  static load(force = false) {
    if (!force && Date.now() - lastCheckedAt < 1000) return catalog;
    lastCheckedAt = Date.now()

    try {
      const fileInfo = fs.statSync(KuramaEmojis.file)
      const fileSignature = `${fileInfo.mtimeMs}:${fileInfo.size}`
      if (!force && fileSignature === catalogSignature) return catalog;

      const emojis = JSON.parse(fs.readFileSync(KuramaEmojis.file, 'utf8'))
      catalog = KuramaEmojis.validateCatalog(emojis)
      catalogSignature = fileSignature
    } catch (err) {
      if (!catalog) throw err;
      console.error(`[EMOJIS] Mantendo o último catálogo válido: ${err.message}`)
    }

    return catalog;
  }

  static entry(key) {
    const emoji = KuramaEmojis.load()[key]
    if (!emoji) throw new Error(`Emoji do Kurama desconhecido: ${key}`)

    return emoji;
  }

  static id(key) {
    return KuramaEmojis.entry(key).id;
  }

  static mention(key) {
    const emoji = KuramaEmojis.entry(key)
    const prefix = emoji.animated ? 'a' : ''

    return `<${prefix}:${emoji.name}:${emoji.id}>`;
  }

  static url(key) {
    const emoji = KuramaEmojis.entry(key)
    const extension = emoji.animated ? 'gif' : 'png'

    return `https://cdn.discordapp.com/emojis/${emoji.id}.${extension}`;
  }

  static text(value) {
    if (typeof value !== 'string') return value;

    return value.replace(/\[\[emoji(-url)?:([A-Za-z0-9_]+)\]\]/g, (match, image, key) => {
      if (image) return KuramaEmojis.url(key);
      return KuramaEmojis.mention(key);
    });
  }

  static reload() {
    return KuramaEmojis.load(true);
  }

  static attach(client) {
    const emojis = KuramaEmojis.load()

    // Adiciona as menções sem substituir o EmojiManager do discord.js.
    for (const key of Object.keys(emojis)) {
      if (key in client.emojis) throw new Error(`Propriedade já existente no EmojiManager: ${key}`)

      Object.defineProperty(client.emojis, key, {
        enumerable: true,
        get: () => KuramaEmojis.mention(key)
      })
    }

    client.kuramaEmojis = module.exports
  }

}

KuramaEmojis.file = KuramaEmojis.getCatalogFile()
KuramaEmojis.load(true)

// Permite usar kuramaEmojis.kurama_lurk nos utilitários e comandos existentes.
module.exports = new Proxy(KuramaEmojis, {
  get(target, key) {
    if (Reflect.has(target, key)) return Reflect.get(target, key);

    const emojis = KuramaEmojis.load()
    if (typeof key === 'string' && Object.prototype.hasOwnProperty.call(emojis, key)) {
      return KuramaEmojis.mention(key);
    }

    return undefined;
  }
})
