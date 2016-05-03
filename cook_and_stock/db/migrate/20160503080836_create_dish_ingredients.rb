class CreateDishIngredients < ActiveRecord::Migration
  def change
    create_table :dish_ingredients do |t|
      t.integer :dish_id
      t.integer :ingredient_id
      t.float :quantity
      t.string :quantity_unit

      t.timestamps null: false
    end
  end
end
