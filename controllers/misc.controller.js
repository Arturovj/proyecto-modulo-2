module.exports.home = (req, res, next) => {
    res.render('misc/home')
  }

module.exports.about = (req, res, next) => {
  res.render('misc/about')
}

module.exports.services = (req, res, next) => {
  res.render('misc/services')
}

module.exports.faq = (req, res, next) => {
  res.render('misc/faq')
}

module.exports.shop = (req, res, next) => {
  res.render('misc/shop')
}
