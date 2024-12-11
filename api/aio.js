const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')
const router = express.Router()

async function AIO(url) {
    const { data: prefixPage } = await axios.get('https://retatube.com/api/v1/aio/index?s=retatube.com', {
      headers: { 'User-Agent': 'Postify/1.0.0' },
    })
    const prefix = cheerio.load(prefixPage)('input[name="prefix"]').val()
    const params = new URLSearchParams({ prefix, vid: url }).toString()
    const { data: resultPage } = await axios.post('https://retatube.com/api/v1/aio/search', params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Postify/1.0.0',
      },
    })
    const extractData = (regex) => (resultPage.match(regex) || [])[1] || ''
    const fans = extractData(/<p><strong>Fans：<\/strong>(\d+)/)
    const views = extractData(/<p><strong>Views:：<\/strong>(\d+)/)
    const shares = extractData(/<p><strong>Shares：<\/strong>(\d+)/)
    const $ = cheerio.load(resultPage)
    const results = $('div.icon-box')
      .map((_, element) => {
        const title = $(element).find('strong:contains("Title")').text().replace('Title：', '').trim()
        const owner = $(element).find('strong:contains("Owner")').parent().text().replace('Owner：', '').trim()
        const image = $(element).find('img').attr('src')

        const downloadLinks = $(element)
          .find('a.button.primary.expand')
          .map((_, el) => {
            const link = $(el).attr('href')
            if (link === 'javascript:void(0);') return null
            const teks = $(el)
              .find('span')
              .text()
              .replace('Download', '')
              .trim()
              .toLowerCase()
              .replace(/[]/g, '')
              .replace(/\s+/g, '_')
              .split('_')
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ')
            return { title: teks, link }
          })
          .get()
          .filter(Boolean)

        return { title, owner, fans, views, shares, image, dlink: downloadLinks }
      })
      .get()

    return results
}

router.get('/', async (req, res) => {
  const { url } = req.query
  if (!url) {
    return res.status(400).json({ success: false, message: 'URL is required!' })
  }
  try {
    const results = await AIO(url)
    res.json({ status: true, creator: 'Sanjaya', results })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

module.exports = router