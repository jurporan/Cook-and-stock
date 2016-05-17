class Ingredient < ActiveRecord::Base
    has_many :dishes, :through => :dish_ingredients
    has_many :dish_ingredients
end
