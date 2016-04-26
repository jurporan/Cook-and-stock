json.array!(@dishes) do |dish|
  json.extract! dish, :id, :name, :directions
  json.url dish_url(dish, format: :json)
end
