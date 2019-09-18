// globals.js must be available at this point

// Initialize local storage and the DOM
function init() {
    // Use local storage to preserve the quantities' states between page reloads
    var quantities = JSON.parse(localStorage.getItem('quantities'));
    if (!quantities) {
        quantities = []; var n = PRODUCT_DATA.length;
        for (var i = 0; i < n; ++i) quantities[i] = 0;
        localStorage.setItem('quantities', JSON.stringify(quantities));
    }

    var html_string = ''; var subtotal = 0.0;
    PRODUCT_DATA.forEach(function(item, i) {
        var quantity = quantities[i]; var cost = item['price'];
        var price = quantity*cost; var price_text = price === 0 ? '$0' : '$'+price.toFixed(2).toString();
        subtotal += price;
        html_string +=
            '<div id="' + item['id'].toString() + '" class="product"> \
               <div class="row"> \
                 <div class="col-md-3"> \
                   <img class="img-fluid mx-auto d-block image" src="' + item['image'] + '"> \
                 </div> \
                 <div class="col-md-8"> \
                   <div class="info"> \
                     <div class="row"> \
                       <div class="col-md-5 product-name"> \
                         <div class="product-name"> \
                           <span>' + item['name'] + '</span> \
                           <div class="product-info"> \
                             <div>Cost: <span class="value product-cost">$' + cost.toFixed(2).toString() + '</span></div> \
                             <div>Type: <span class="value product-type">' + item['product_type'] + '</span></div> \
                           </div> \
                         </div> \
                       </div> \
                       <div class="col-md-4 quantity"> \
                         <label for="quantity">Quantity:</label> \
                         <input type="number" value="' + quantity.toString() + '" min="0" max="99" maxlength="2" class="form-control quantity-input"> \
                       </div> \
                       <div class="col-md-3 price"> \
                         <span>' + price_text + '</span> \
                       </div> \
                     </div> \
                   </div> \
                 </div> \
               </div> \
             </div>';
    });
    $('.items').append(html_string);
    update_totals(subtotal);
}

// Given a float @subtotal, update the UI to reflect the subtotal and the total
function update_totals(subtotal) {
    var subtotal_text = '$'+subtotal.toFixed(2).toString();
    $('#subtotal').text(subtotal_text);
    $('#total').text(subtotal_text); // ignore discount and shipping for now
}

// If at least 1 bike is selected, navigate to the payment page
function checkout() {
    if (bike_selected()) window.location.href = './payment.html';
    else alert('You must check out with a bike selection.');
}

$(document).ready(function() {
    //localStorage.clear();
    init();

    // Event handlers
    $('.quantity-input').on('input', function() {
        var length = this.value.length;
        if (length > 1 && this.value.startsWith('0')) this.value = this.value.slice(1, this.maxLength);
        else if (!this.value || this.value < 0) this.value = 0;
        else if (length > this.maxLength) this.value = this.value.slice(0, this.maxLength);
    });
    $('.quantity-input').on('change paste keyup', function(event) {
        var quantity_div = $(this).parent();
        var price_span = quantity_div.next().find('span');
        var cost_span = quantity_div.prev().find('span.product-cost');

        var quantity = parseInt($(this).val());
        var cost = parseFloat(cost_span.text().substring(1)); // ignore the '$'
        var price = quantity*cost;
        var price_text = price === 0 ? '$0' : '$'+price.toFixed(2).toString();
        price_span.text(price_text);

        var quantities = $.map($('.quantity-input'), function(amt) { return parseInt(amt.value); });
        // Use local storage to preserve the quantities' states between page reloads
        localStorage.setItem('quantities', JSON.stringify(quantities));
        var subtotal = 0.0;
        quantities.forEach(function(amt, i) { subtotal += amt*PRODUCT_PRICES[i]; });
        update_totals(subtotal);

        event.stopPropagation();
        return false;
    });
});
