require 'test_helper'

class DishOrdersControllerTest < ActionController::TestCase
  setup do
    @dish_order = dish_orders(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:dish_orders)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create dish_order" do
    assert_difference('DishOrder.count') do
      post :create, dish_order: { dish_id: @dish_order.dish_id, order_id: @dish_order.order_id, quantity: @dish_order.quantity }
    end

    assert_redirected_to dish_order_path(assigns(:dish_order))
  end

  test "should show dish_order" do
    get :show, id: @dish_order
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @dish_order
    assert_response :success
  end

  test "should update dish_order" do
    patch :update, id: @dish_order, dish_order: { dish_id: @dish_order.dish_id, order_id: @dish_order.order_id, quantity: @dish_order.quantity }
    assert_redirected_to dish_order_path(assigns(:dish_order))
  end

  test "should destroy dish_order" do
    assert_difference('DishOrder.count', -1) do
      delete :destroy, id: @dish_order
    end

    assert_redirected_to dish_orders_path
  end
end
