/**
 * Created by jermo on 03.05.2016.
 */
$(function () {
    var table = $('.ingredients_table');

    function loadBootstrapTable(tble) {
        tble.bootstrapTable();
    }

    loadBootstrapTable(table);
    /*table.bootstrapTable({
        /*columns: [
         {
         field: 'ingredient',
         title: 'Ingredient'
         },
         {
         field: 'quantity',
         title: 'Quantity',
         editable: true
         }
         ],
         data: [
         {ingredient: 'Sel', quantity: '500'}
         ]*/
    //});

    $.fn.editable.defaults.ajaxOptions = {type: "PATCH"};
    $('.quantity-editable').editable({
        validate: function(value) {
            if(!$.isNumeric(value)){
                return 'You must enter a numeric value !';
            }
        }
    });

    $('.remove-ingredient').click(function(){
        console.log($(this).data('url'));
        if (window.confirm("Êtes-vous sûr ?")) {
            $.ajax({
                url: $(this).data('url'),
                type: 'DELETE',
                success: function (result) {
                    alert('success');
                },
                error: function (result) {
                    alert('error');
                }
            });
        }
    });

    $('.select-ingredient').select2({
        placeholder: 'Ingredient',
        tags: true,
        maximumSelectionLength: 1,
        minimumResultsForSearch: -1
    });

    $('#select-stock').select2();

    $("form.add-ingredients").on( "submit", function( event ) {
        event.preventDefault();
        var form = $(this).serializeArray();
        var $accordian_body = $(this).closest('div.accordian-body');
        var stock_id = $accordian_body.data('id');
        var $table_ingredients = $(this).closest('div.accordian-body').find('table.ingredients_table');
        var $option = $(this).closest('form').find('option[value='+form[0].value+']');
        var payload = {};
        var $accordian_toggle = $(this).closest('accordion-toggle');

        $.each(form, function () {
            payload[this.name] = this.value
        });

        // New ingredient
        if($option.val() === $option.text()) {
            $.ajax({
                method: "POST",
                url: "/ingredients",
                data: {ingredient:{name : payload.ingredient}},
                dataType: 'json'
            }).done(function (data) {
                $.ajax({
                    method: "POST",
                    url: "/ingredient_stocks",
                    data: {ingredient_stock:{
                        ingredient_id : data.id,
                        stock_id: stock_id,
                        quantity: payload.quantity,
                        quantity_unit: payload.unity
                    }},
                    dataType: 'json'
                }).done(function (data) {
                    /*var tr = "<tr>"+
                                "<td>"+payload.ingredient+"</td>"+
                                "<td><a href='#' data-type='text' data-pk="+data.id+" data-url='/ingredient_stocks/'"+data.id+" class='quantity-editable'>"+data.quantity+"</a></td>"+
                                "<td>"+data.quantity_unit+"</td>"+
                                "<td><a href='#' class='remove-ingredient btn btn-danger btn-sm' data-url='/ingredient_stocks/'"+data.id+">Delete</a></td>"+
                            "</tr>";
                    $table_ingredients.find('tbody').append(tr);*/
                    location.reload(true);
                })
            })
        }
        // Existing ingredient
        else {
            $.ajax({
                method: "POST",
                url: "/ingredient_stocks",
                data: {ingredient_stock:{
                    ingredient_id : payload.ingredient,
                    stock_id: stock_id,
                    quantity: payload.quantity,
                    quantity_unit: payload.unity
                }},
                dataType: 'json'
            }).done(function (data) {
                location.reload(true);
            })
        }
    });

    function sortStocks($listGroup, stocks) {
        stocks.sort(function (a,b) {
            var aDisabled = $(a).hasClass('disabled');
            var bDisabled = $(b).hasClass('disabled');

            if(aDisabled && bDisabled || !aDisabled && !bDisabled) return 0;
            if(aDisabled && !bDisabled) return 1;
            if(!aDisabled && bDisabled) return -1;
        });
        $('#ajax-animator').hide();
        $listGroup.html('');
        for(var i = 0 ; i < stocks.length; ++i) {
            $listGroup.append(stocks[i]);
        }

        $('.list-group-item').click(function (e) {
            e.preventDefault();
            if(!$(this).hasClass('disabled')) {
                $(this).addClass('active');
                $(this).siblings().removeClass('active');
                $('#validate-order').removeClass('disabled');
            }
        });
    }

    var ingredientsInStock = {};
    var inputQuantity = 0;
    function updateStocks($listGroup){
        ingredientsInStock = {};
        $('#validate-order').addClass('disabled');
        $listGroup.html('');
        $('#ajax-animator').show();
        inputQuantity = $('input[type="number"]').val();
        $.ajax({
            method: "GET",
            url: "/ingredient_stocks",
            dataType: 'json'
        }).done(function (ingredientStockData) {
            for(var i = 0 ; i < ingredientStockData.length; ++i) {
                if(ingredientsInStock[ingredientStockData[i].stock_id] === undefined){
                    ingredientsInStock[ingredientStockData[i].stock_id] = [];
                }
                ingredientsInStock[ingredientStockData[i].stock_id].push(ingredientStockData[i]);
            }
            $.ajax({
                method: "GET",
                url: "/stocks",
                dataType: 'json'
            }).done(function (stockData) {
                var stocks = [];
                for(var i = 0; i < stockData.length; ++i) {
                    var listGroupText = "";
                    for(var j = 0; j < ingredients.length; ++j) {
                        var ingredientFound = false;
                        var shortfall = 0;
                        for(var k = 0; k < ingredientsInStock[stockData[i].id].length; ++k) {
                            if(ingredientsInStock[stockData[i].id][k].ingredient_id === ingredients[j].id) {

                                ingredientFound = true;

                                if (ingredientsInStock[stockData[i].id][k].quantity_unit !== quantity_unit[j]) {
                                    shortfall = -quantity[j];
                                } else {
                                    shortfall = ingredientsInStock[stockData[i].id][k].quantity - inputQuantity * quantity[j];
                                }

                                if(shortfall < 0) {
                                    listGroupText += '<p class="list-group-item-text">Il vous manque ' +
                                         Math.abs(shortfall) + ' ' + quantity_unit[j] + ' de l\'ingrédient : ' + ingredients[j].name + '</p>';
                                }

                                break;
                            }
                        }
                        if(!ingredientFound) {
                            listGroupText += '<p class="list-group-item-text">Il vous manque l\'ingrédient : ' + ingredients[j].name + '</p>';
                        }
                    }
                    var link = '<a href="#" class="list-group-item">';
                    if(listGroupText !== "") {
                        link = '<a href="#" class="list-group-item disabled">';
                    }
                    stocks.push(
                        link +
                        '<h4 class="list-group-item-heading" data-id=' + stockData[i].id + '>' + stockData[i].name + ' à ' + stockData[i].location + '</h4>'+
                        listGroupText +
                        '</a>'
                    );
                }
                sortStocks($listGroup, stocks);

            });
        });


    }

    var quantity = [];
    var quantity_unit = [];
    var ingredients = [];
    $('.order-dish').click(function () {
        var dish_name = $(this).closest('tr').find('td.dish-name').text();
        var dish_id = $(this).closest('tr').data('id');
        var $input_dish_ingredient = $(this).closest('tr').find('input[type="hidden"]');
        var $ingredients_list = $('ul.list-unstyled');

        $('h4.modal-title').text('Order some "' + dish_name + '"');
        $('input[type="number"]').val(1);
        $ingredients_list.empty();

        $input_dish_ingredient.each(function (idx) {
            var This = $(this);
            $.ajax({
                method: "GET",
                url: "/ingredients/" + $(this).data('iid'),
                dataType: 'json'
            }).done(function (data) {
                ingredients.push(data);
                quantity.push(This.data('q'));
                quantity_unit.push(This.data('qu'));
                $('ul.list-unstyled').append(
                    '<li><span class="glyphicon glyphicon glyphicon-chevron-right"></span> <strong><span id="quantity-label">' + This.data('q')+'</span> '
                    + This.data('qu') +' </strong>de '+ data.name + '</li>'
                );
                if(idx === $input_dish_ingredient.length - 1) {
                    $('#order').modal('show');
                    updateStocks($('.list-group'));
                }
            });
        });
    });

    $('input[type="number"]').bind('keyup mouseup', function () {
        var $quantity_labels = $('ul.list-unstyled li span#quantity-label');
        var quantity_nbr = $(this).val();

        $quantity_labels.each(function (idx) {
            $(this).text(quantity[idx] * quantity_nbr);
            if(idx === $quantity_labels.length - 1) {
                updateStocks($('.list-group'));
            }
        });
    });

    $('#validate-order').click(function () {
        if (!$(this).hasClass('disabled')) {
            $('input.hide').click();
        }
    });

    $('.modal-body form').submit(function (e) {
        e.preventDefault();
        var stock_choosed = $('.list-group').find('.active');
        var stock_id = $(stock_choosed).find('h4').data('id');
        //console.log(ingredientsInStock);
        console.log(ingredients);
        for(var i = 0; i < ingredients.length; ++i) {
            for(var j = 0; j < ingredientsInStock[stock_id].length; ++j) {
                console.log(ingredients[i].id + ' ' + ingredientsInStock[stock_id][j].ingredient_id);
                if(ingredients[i].id === ingredientsInStock[stock_id][j].ingredient_id) {
                    $.ajax({
                        method: "PATCH",
                        url: "/ingredient_stocks/" + ingredientsInStock[stock_id][j].id,
                        data: {value: ingredientsInStock[stock_id][j].quantity - inputQuantity * quantity[i]}
                    }).done(function (data) {
                       updateStocks($('.list-group'));
                    });
                    break;
                }
            }
        }
    })
});

