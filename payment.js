// globals.js must be available at this point

// Initialize the DOM
function init() {
    var quantities = JSON.parse(localStorage.getItem('quantities'));
    if (!bike_selected()) {
        $('.container').html(
            '<div class="block-heading"> \
               <span>You must check out with a bike selection (click <a href="./index.html">here</a> to visit your cart).</span> \
             </div>'
        );
    }
    else {
        var html_string = '';
        var total = 0.0;
        quantities.forEach(function(amt, i) {
            if (amt > 0) {
                var cost = PRODUCT_PRICES[i];
                var price = amt*cost;
                total += price;
                html_string +=
                    '<div class="item"> \
                       <span class="price">$' + price.toFixed(2).toString() + '</span> \
                       <p class="item-name">' + PRODUCT_NAMES[i] + '</p> \
                       <p class="item-description">Cost: $' + cost.toFixed(2).toString() + ' | Quantity: ' + amt.toString() + '</p> \
                     </div>';
            }
        });
        html_string += '<div class="total">Total<span class="price">$' + total.toFixed(2).toString() + '</span></div>';
        $('.products').append(html_string);
    }
}

// Proceed with the transaction
function proceed() {
    // this is where you would check the validity of the credit card details,
    // and if they are valid, proceed with the transaction
}

$(document).ready(function() {
    //localStorage.clear();
    init();

    // Event handlers
    $('.num-only').keyup(function() {
        if (/\D/g.test(this.value))
            this.value = this.value.replace(/\D/g, ''); // filter non-digits from the input value
    });
    $('.date-input').on('input', function() {
        if (!this.value || this.value < 0) this.value = '';
        else if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);
    });
});
