class Ingredient < ActiveRecord::Base
    has_many :dish_ingredient
    has_many :ingredient_stock
end
