class Ingredient < ActiveRecord::Base
  has_many :dishes, :through => :dish_ingredients
  has_many :dish_ingredients
  has_many :stocks, :through => :ingredient_stocks
  has_many :ingredient_stocks
end
