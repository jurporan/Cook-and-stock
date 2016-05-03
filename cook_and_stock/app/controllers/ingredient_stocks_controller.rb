class IngredientStocksController < ApplicationController
  before_action :set_ingredient_stock, only: [:show, :edit, :update, :destroy]

  # GET /ingredient_stocks
  # GET /ingredient_stocks.json
  def index
    @ingredient_stocks = IngredientStock.all
  end

  # GET /ingredient_stocks/1
  # GET /ingredient_stocks/1.json
  def show
  end

  # GET /ingredient_stocks/new
  def new
    @ingredient_stock = IngredientStock.new
  end

  # GET /ingredient_stocks/1/edit
  def edit
  end

  # POST /ingredient_stocks
  # POST /ingredient_stocks.json
  def create
    @ingredient_stock = IngredientStock.new(ingredient_stock_params)

    respond_to do |format|
      if @ingredient_stock.save
        format.html { redirect_to @ingredient_stock, notice: 'Ingredient stock was successfully created.' }
        format.json { render :show, status: :created, location: @ingredient_stock }
      else
        format.html { render :new }
        format.json { render json: @ingredient_stock.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /ingredient_stocks/1
  # PATCH/PUT /ingredient_stocks/1.json
  def update
    respond_to do |format|
      if @ingredient_stock.update(ingredient_stock_params)
        format.html { redirect_to @ingredient_stock, notice: 'Ingredient stock was successfully updated.' }
        format.json { render :show, status: :ok, location: @ingredient_stock }
      else
        format.html { render :edit }
        format.json { render json: @ingredient_stock.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /ingredient_stocks/1
  # DELETE /ingredient_stocks/1.json
  def destroy
    @ingredient_stock.destroy
    respond_to do |format|
      format.html { redirect_to ingredient_stocks_url, notice: 'Ingredient stock was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_ingredient_stock
      @ingredient_stock = IngredientStock.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def ingredient_stock_params
      params.require(:ingredient_stock).permit(:ingredient_id, :stock_id, :quantity, :quantity_unit)
    end
end
