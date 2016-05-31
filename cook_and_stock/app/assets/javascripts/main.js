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
});

