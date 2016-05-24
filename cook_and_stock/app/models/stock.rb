class Stock < ActiveRecord::Base
  has_many :ingredients, :through => :ingredient_stocks
  has_many :ingredient_stock
  has_many :order
end
