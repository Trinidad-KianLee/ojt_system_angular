/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2587027837")

  // update collection data
  unmarshal({
    "listRule": "@request.auth.role = \"admin\"\n\n"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2587027837")

  // update collection data
  unmarshal({
    "listRule": "id = @request.auth.id\n"
  }, collection)

  return app.save(collection)
})
