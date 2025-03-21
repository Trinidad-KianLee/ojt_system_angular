/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2587027837")

  // update collection data
  unmarshal({
    "createRule": ""
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2587027837")

  // update collection data
  unmarshal({
    "createRule": "id = @request.auth.id"
  }, collection)

  return app.save(collection)
})
