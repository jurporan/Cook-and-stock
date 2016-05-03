class CreateDishOrders < ActiveRecord::Migration
  def change
    create_table :dish_orders do |t|
      t.integer :dish_id
      t.integer :order_id
      t.integer :quantity

      t.timestamps null: false
    end
  end
end
