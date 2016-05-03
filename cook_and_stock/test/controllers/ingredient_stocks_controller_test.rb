require 'test_helper'

class IngredientStocksControllerTest < ActionController::TestCase
  setup do
    @ingredient_stock = ingredient_stocks(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:ingredient_stocks)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create ingredient_stock" do
    assert_difference('IngredientStock.count') do
      post :create, ingredient_stock: { ingredient_id: @ingredient_stock.ingredient_id, quantity: @ingredient_stock.quantity, quantity_unit: @ingredient_stock.quantity_unit, stock_id: @ingredient_stock.stock_id }
    end

    assert_redirected_to ingredient_stock_path(assigns(:ingredient_stock))
  end

  test "should show ingredient_stock" do
    get :show, id: @ingredient_stock
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @ingredient_stock
    assert_response :success
  end

  test "should update ingredient_stock" do
    patch :update, id: @ingredient_stock, ingredient_stock: { ingredient_id: @ingredient_stock.ingredient_id, quantity: @ingredient_stock.quantity, quantity_unit: @ingredient_stock.quantity_unit, stock_id: @ingredient_stock.stock_id }
    assert_redirected_to ingredient_stock_path(assigns(:ingredient_stock))
  end

  test "should destroy ingredient_stock" do
    assert_difference('IngredientStock.count', -1) do
      delete :destroy, id: @ingredient_stock
    end

    assert_redirected_to ingredient_stocks_path
  end
end
