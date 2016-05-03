json.array!(@ingredient_stocks) do |ingredient_stock|
  json.extract! ingredient_stock, :id, :ingredient_id, :stock_id, :quantity, :quantity_unit
  json.url ingredient_stock_url(ingredient_stock, format: :json)
end
