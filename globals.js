// Global variables and functions to be used in the other JS files
const PRODUCT_DATA = [
    {
        "id": 1,
        "name": "Adult Male Bike",
        "price": 20.50,
        "image": "http://via.placeholder.com/250x250?text=Adult%20Male%20Bike",
        "product_type": "bike"
    },
    {
        "id": 2,
        "name": "Adult Female Bike",
        "price": 20.50,
        "image": "http://via.placeholder.com/250x250?text=Adult%20Female%20Bike",
        "product_type": "bike"
    },
    {
        "id": 3,
        "name": "Kids Unisex Bike",
        "price": 12.75,
        "image": "http://via.placeholder.com/250x250?text=Kids%20Unisex%20Bike",
        "product_type": "bike"
    },
    {
        "id": 4,
        "name": "Adult Unisex Helmet",
        "price": 4.00,
        "image": "http://via.placeholder.com/250x250?text=Adult%20Unisex%20Helmet",
        "product_type": "accessory"
    },
    {
        "id": 5,
        "name": "Kids Unisex Helmet",
        "price": 3.50,
        "image": "http://via.placeholder.com/250x250?text=Kids%20Unisex%20Helmet",
        "product_type": "accessory"
    },
    {
        "id": 6,
        "name": "Insurance",
        "price": 9.99,
        "image": "http://via.placeholder.com/250x250?text=Insurance",
        "product_type": "addon"
    }
];
const PRODUCT_NAMES = $.map(PRODUCT_DATA, function(item) { return item['name']; });
const PRODUCT_PRICES = $.map(PRODUCT_DATA, function(item) { return item['price']; });

// If at least 1 bike is selected, return true (else return false)
function bike_selected() {
    var quantities = JSON.parse(localStorage.getItem('quantities'));
    if (!quantities) return false;
    var n = quantities.length;
    for (var i = 0; i < n; ++i)
        if (quantities[i] > 0 && PRODUCT_DATA[i]['product_type'] === 'bike') return true;
    return false;
}
