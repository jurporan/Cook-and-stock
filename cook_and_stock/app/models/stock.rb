class Stock < ActiveRecord::Base
    has_many :ingredient_stock
    has_many :order
end
