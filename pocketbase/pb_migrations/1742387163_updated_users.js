//  <reference path="../pb_data/types.d.ts" />
// migrate((app) => {
//   const collection = app.findCollectionByNameOrId("_pb_users_auth_")

//   unmarshal({
//     "listRule": "id = @request.auth.id"
//   }, collection)

//   return app.save(collection)
// }, (app) => {
//   const collection = app.findCollectionByNameOrId("_pb_users_auth_")

//   unmarshal({
//     "listRule": ""
//   }, collection)

//   return app.save(collection)
// })
