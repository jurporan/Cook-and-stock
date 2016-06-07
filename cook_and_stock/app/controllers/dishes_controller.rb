class DishesController < ApplicationController
  before_filter :authenticate_user!
  load_and_authorize_resource
  before_action :set_dish, only: [:show, :edit, :update, :destroy]

  # GET /dishes
  # GET /dishes.json
  def index
    @dishes = Dish.all
  end

  # GET /dishes/new
  def new
    @dish = Dish.new
  end

  def add_ingredient
      @dish = Dish.find(params[:id])
      @ingredients = Ingredient.all
  end

  def create_ingredient
      @dish = Dish.find(params[:id])
      ingredient = DishIngredient.new(ingredient_params)
      ingredient.dish = @dish
      ingredient.save
      redirect_to dish_path(@dish)
  end

  def delete_ingredient
      @dish = Dish.find(params[:id])
  end

  def update_ingredient
      @dish = Dish.find(params[:id])
  end

  # GET /dishes/1
  def show
  end

  # GET /dishes/1/edit
  def edit
    @dish = Dish.find(params[:id])
  end

  # POST /dishes
  # POST /dishes.json
  def create
    @dish = Dish.new(dish_params)

    respond_to do |format|
      if @dish.save
        format.html { redirect_to @dish, notice: 'Dish was successfully created.' }
        format.json { render :show, status: :created, location: @dish }
      else
        format.html { render :new }
        format.json { render json: @dish.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /dishes/1
  # PATCH/PUT /dishes/1.json
  def update
    respond_to do |format|
      if @dish.update(dish_params)
        format.html { redirect_to @dish, notice: 'Dish was successfully updated.' }
        format.json { render :show, status: :ok, location: @dish }
      else
        format.html { render :edit }
        format.json { render json: @dish.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /dishes/1
  # DELETE /dishes/1.json
  def destroy
    @dish.destroy
    respond_to do |format|
      format.html { redirect_to dishes_url, notice: 'Dish was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_dish
      @dish = Dish.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def dish_params
      params.require(:dish).permit(:name, :directions)
    end

    def ingredient_params
        params.require(:dish_ingredients).permit(:ingredient_id, :quantity,:quantity_unit)
    end
end
