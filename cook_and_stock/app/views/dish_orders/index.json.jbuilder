json.array!(@dish_orders) do |dish_order|
  json.extract! dish_order, :id, :dish_id, :order_id, :quantity
  json.url dish_order_url(dish_order, format: :json)
end
