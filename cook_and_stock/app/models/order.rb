class Order < ActiveRecord::Base
    has_many :dishes, :through => :dish_order
    has_many :dish_order
    belongs_to :user
    belongs_to :stock
end
