const mongoose = require('mongoose');
const config = require('../../config');

mongoose.set('useCreateIndex', true);

const siteSchema = new mongoose.Schema({
  title: { type: String, default: 'NEMV', index: true },
  copyright: { type: String, default: '© 2018 nemv' },
  dark: { type: Boolean, default: false }
});

const Site = mongoose.model('Site', siteSchema);

// 데이터가 하나도 없을때만 생성해 하도록 만들었습니다.
Site.findOne()
 .then(site => {
   if (!site) return Site.create({})
   return Promise.resolve(null)
 })
 .then(site => {
   if (site) console.log(`${site.title} site is created`)
 })
 .catch(err => console.error(err.message));
 
module.exports = Site
