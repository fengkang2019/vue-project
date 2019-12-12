'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

// module.exports = merge(prodEnv, {
//   NODE_ENV: '"development"',
//   API_ROOT:'"http://192.168.120.208:9110/"',
//   EQUIPMENT_IP:'"192.168.120.208"',
//   baseURl:'"http://121.36.142.21"',
//   serverUrlPark:'"http://test.bj-jtjt.cn"',
// })

module.exports = merge(prodEnv,{
  NODE_ENV: '"development"',
  API_ROOT:'"http://121.40.228.66:9110/"',
  EQUIPMENT_IP:'"134.175.37.184"',
  baseURl:'"http://park.tnar.cn"',
  serverUrlPark:'"http://park.tnar.cn"',

})