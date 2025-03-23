/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2291690852")

  // update collection data
  unmarshal({
    "name": "warehouse_regis"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2291690852")

  // update collection data
  unmarshal({
    "name": "warehouse"
  }, collection)

  return app.save(collection)
})
