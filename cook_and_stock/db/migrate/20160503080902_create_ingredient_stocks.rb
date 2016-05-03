class CreateIngredientStocks < ActiveRecord::Migration
  def change
    create_table :ingredient_stocks do |t|
      t.integer :ingredient_id
      t.integer :stock_id
      t.float :quantity
      t.string :quantity_unit

      t.timestamps null: false
    end
  end
end
