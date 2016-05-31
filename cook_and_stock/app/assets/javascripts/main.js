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

    var quantity = [];
    $('.order-dish').click(function () {
        var dish_name = $(this).closest('tr').find('td.dish-name').text();
        var dish_id = $(this).closest('tr').data('id');
        var $input_dish_ingredient = $(this).closest('tr').find('input[type="hidden"]');
        var $ingredients_list = $('ul.list-unstyled');

        $('h4.modal-title').text('Order some "' + dish_name + '"');
        $('input[type="number"]').val(1);
        $ingredients_list.empty();

        var ingredients = [];
        $input_dish_ingredient.each(function (idx) {
            var This = $(this);
            $.ajax({
                method: "GET",
                url: "/ingredients/" + $(this).data('iid'),
                dataType: 'json'
            }).done(function (data) {
                ingredients.push(data);
                quantity.push(This.data('q'));
                $('ul.list-unstyled').append(
                    '<li><span class="glyphicon glyphicon glyphicon-chevron-right"></span> <strong><span id="quantity-label">' + This.data('q')+'</span> '
                    + This.data('qu') +' </strong>de '+data.name+'</li>'
                );
                if(idx === $input_dish_ingredient.length - 1) {
                    $('#order').modal('show');
                }
            });
        });

        // TODO Mise à jour dynamique des quantités ingrédients sur le onChange d'un input type Number, continuez selon la feuille A4


    });

    $('input[type="number"]').bind('keyup mouseup', function () {
        var $quantity_labels = $('ul.list-unstyled li span#quantity-label');
        var quantity_nbr = $(this).val();

        $quantity_labels.each(function (idx) {
           $(this).text(quantity[idx] * quantity_nbr);
        });
    });
});

