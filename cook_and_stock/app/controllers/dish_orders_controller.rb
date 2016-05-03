class DishOrdersController < ApplicationController
  before_action :set_dish_order, only: [:show, :edit, :update, :destroy]

  # GET /dish_orders
  # GET /dish_orders.json
  def index
    @dish_orders = DishOrder.all
  end

  # GET /dish_orders/1
  # GET /dish_orders/1.json
  def show
  end

  # GET /dish_orders/new
  def new
    @dish_order = DishOrder.new
  end

  # GET /dish_orders/1/edit
  def edit
  end

  # POST /dish_orders
  # POST /dish_orders.json
  def create
    @dish_order = DishOrder.new(dish_order_params)

    respond_to do |format|
      if @dish_order.save
        format.html { redirect_to @dish_order, notice: 'Dish order was successfully created.' }
        format.json { render :show, status: :created, location: @dish_order }
      else
        format.html { render :new }
        format.json { render json: @dish_order.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /dish_orders/1
  # PATCH/PUT /dish_orders/1.json
  def update
    respond_to do |format|
      if @dish_order.update(dish_order_params)
        format.html { redirect_to @dish_order, notice: 'Dish order was successfully updated.' }
        format.json { render :show, status: :ok, location: @dish_order }
      else
        format.html { render :edit }
        format.json { render json: @dish_order.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /dish_orders/1
  # DELETE /dish_orders/1.json
  def destroy
    @dish_order.destroy
    respond_to do |format|
      format.html { redirect_to dish_orders_url, notice: 'Dish order was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_dish_order
      @dish_order = DishOrder.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def dish_order_params
      params.require(:dish_order).permit(:dish_id, :order_id, :quantity)
    end
end
