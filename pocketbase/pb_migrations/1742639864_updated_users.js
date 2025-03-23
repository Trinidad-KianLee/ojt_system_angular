/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("_pb_users_auth_")

  // update collection data
  unmarshal({
    "updateRule": "id = @request.auth.id && @request.auth.role = \"admin\"",
    "viewRule": "id = @request.auth.id && @request.auth.role = \"admin\""
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("_pb_users_auth_")

  // update collection data
  unmarshal({
    "updateRule": "id = @request.auth.id",
    "viewRule": "id = @request.auth.id || @request.auth.role = \"admin\""
  }, collection)

  return app.save(collection)
})
