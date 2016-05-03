class Dish < ActiveRecord::Base
    has_many :dish_ingredient
    has_many :dish_order
end
