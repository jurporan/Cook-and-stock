json.array!(@stocks) do |stock|
  json.extract! stock, :id, :name, :location
  json.url stock_url(stock, format: :json)
end
