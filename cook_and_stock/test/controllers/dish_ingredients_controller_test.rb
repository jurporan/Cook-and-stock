require 'test_helper'

class DishIngredientsControllerTest < ActionController::TestCase
  setup do
    @dish_ingredient = dish_ingredients(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:dish_ingredients)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create dish_ingredient" do
    assert_difference('DishIngredient.count') do
      post :create, dish_ingredient: { dish_id: @dish_ingredient.dish_id, ingredient_id: @dish_ingredient.ingredient_id, quantity: @dish_ingredient.quantity, quantity_unit: @dish_ingredient.quantity_unit }
    end

    assert_redirected_to dish_ingredient_path(assigns(:dish_ingredient))
  end

  test "should show dish_ingredient" do
    get :show, id: @dish_ingredient
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @dish_ingredient
    assert_response :success
  end

  test "should update dish_ingredient" do
    patch :update, id: @dish_ingredient, dish_ingredient: { dish_id: @dish_ingredient.dish_id, ingredient_id: @dish_ingredient.ingredient_id, quantity: @dish_ingredient.quantity, quantity_unit: @dish_ingredient.quantity_unit }
    assert_redirected_to dish_ingredient_path(assigns(:dish_ingredient))
  end

  test "should destroy dish_ingredient" do
    assert_difference('DishIngredient.count', -1) do
      delete :destroy, id: @dish_ingredient
    end

    assert_redirected_to dish_ingredients_path
  end
end
