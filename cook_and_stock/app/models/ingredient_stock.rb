class IngredientStock < ActiveRecord::Base
    belongs_to :ingredient
    belongs_to :stock
end
