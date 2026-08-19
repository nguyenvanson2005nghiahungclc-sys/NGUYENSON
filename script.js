```javascript
/* =====================================================
   THỦY SẢN MIỀN QUÊ
   SCRIPT.JS
===================================================== */


/* ================= PRODUCTS ================= */

const products = [

    /* ===== CÁ ===== */

    {
        id: 1,
        name: "Cá lóc đồng",
        category: "ca",
        price: 120000,
        unit: "kg",
        image: "images/ca/ca-loc.jpg"
    },

    {
        id: 2,
        name: "Cá trắm cỏ",
        category: "ca",
        price: 95000,
        unit: "kg",
        image: "images/ca/ca-tram.jpg"
    },

    {
        id: 3,
        name: "Cá chép",
        category: "ca",
        price: 85000,
        unit: "kg",
        image: "images/ca/ca-chep.jpg"
    },

    {
        id: 4,
        name: "Cá rô đồng",
        category: "ca",
        price: 110000,
        unit: "kg",
        image: "images/ca/ca-ro.jpg"
    },

    {
        id: 5,
        name: "Cá trê đồng",
        category: "ca",
        price: 100000,
        unit: "kg",
        image: "images/ca/ca-tre.jpg"
    },

    {
        id: 6,
        name: "Cá mè",
        category: "ca",
        price: 75000,
        unit: "kg",
        image: "images/ca/ca-me.jpg"
    },

    {
        id: 7,
        name: "Cá diêu hồng",
        category: "ca",
        price: 90000,
        unit: "kg",
        image: "images/ca/dieu-hong.jpg"
    },

    {
        id: 8,
        name: "Cá chim trắng",
        category: "ca",
        price: 85000,
        unit: "kg",
        image: "images/ca/ca-chim.jpg"
    },

    {
        id: 9,
        name: "Cá rô phi",
        category: "ca",
        price: 70000,
        unit: "kg",
        image: "images/ca/ca-ro-phi.jpg"
    },

    {
        id: 10,
        name: "Cá quả",
        category: "ca",
        price: 130000,
        unit: "kg",
        image: "images/ca/ca-qua.jpg"
    },


    /* ===== TÔM ===== */

    {
        id: 11,
        name: "Tôm càng xanh",
        category: "tom",
        price: 280000,
        unit: "kg",
        image: "images/tom/tom-cang-xanh.jpg"
    },

    {
        id: 12,
        name: "Tôm đồng",
        category: "tom",
        price: 220000,
        unit: "kg",
        image: "images/tom/tom-dong.jpg"
    },

    {
        id: 13,
        name: "Tôm đất",
        category: "tom",
        price: 180000,
        unit: "kg",
        image: "images/tom/tom-dat.jpg"
    },

    {
        id: 14,
        name: "Tôm sông",
        category: "tom",
        price: 200000,
        unit: "kg",
        image: "images/tom/tom-song.jpg"
    },


    /* ===== CUA ===== */

    {
        id: 15,
        name: "Cua đồng",
        category: "cua",
        price: 150000,
        unit: "kg",
        image: "images/cua/cua-dong.jpg"
    },

    {
        id: 16,
        name: "Cua ruộng",
        category: "cua",
        price: 140000,
        unit: "kg",
        image: "images/cua/cua-ruong.jpg"
    },

    {
        id: 17,
        name: "Cua sông",
        category: "cua",
        price: 170000,
        unit: "kg",
        image: "images/cua/cua-song.jpg"
    },


    /* ===== ỐC ===== */

    {
        id: 18,
        name: "Ốc bươu",
        category: "oc",
        price: 90000,
        unit: "kg",
        image: "images/oc/oc-buou.jpg"
    },

    {
        id: 19,
        name: "Ốc nhồi",
        category: "oc",
        price: 120000,
        unit: "kg",
        image: "images/oc/oc-nhoi.jpg"
    },

    {
        id: 20,
        name: "Ốc vặn",
        category: "oc",
        price: 70000,
        unit: "kg",
        image: "images/oc/oc-van.jpg"
    }

];


/* ================= VARIABLES ================= */

let currentCategory = "all";

let currentProducts = [...products];

let cart = JSON.parse(
    localStorage.getItem("thuySanCart")
) || [];


/* ================= CATEGORY NAME ================= */

function getCategoryName(category) {

    switch (category) {

        case "ca":
            return "CÁ NƯỚC NGỌT";

        case "tom":
            return "TÔM";

        case "cua":
            return "CUA";

        case "oc":
            return "ỐC";

        default:
            return "THỦY SẢN";

    }

}


/* ================= FORMAT PRICE ================= */

function formatPrice(price) {

    return price.toLocaleString("vi-VN") + "đ";

}


/* ================= DISPLAY PRODUCTS ================= */

function displayProducts(data) {

    const productList =
        document.getElementById("product-list");

    productList.innerHTML = "";


    if (data.length === 0) {

        productList.innerHTML = `
            <div class="empty-products">
                <h3>Không tìm thấy sản phẩm</h3>
                <p>Hãy thử tìm với từ khóa khác.</p>
            </div>
        `;

        updateProductResult(0);

        return;
    }


    data.forEach(product => {

        const card =
            document.createElement("div");

        card.className = "product-card";


        card.innerHTML = `

            <div class="product-image">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                    onerror="this.src='images/banner.jpg'">

                <span class="product-category-label">
                    ${getCategoryName(product.category)}
                </span>

                <button
                    class="quick-cart"
                    onclick="addToCart(${product.id})"
                    title="Thêm vào giỏ">

                    🛒

                </button>

            </div>


            <div class="product-info">

                <p class="product-category">
                    ${getCategoryName(product.category)}
                </p>

                <h3>
                    ${product.name}
                </h3>

                <div class="product-bottom">

                    <span class="product-price">

                        ${formatPrice(product.price)}
                        / ${product.unit}

                    </span>

                    <button
                        class="add-cart-button"
                        onclick="addToCart(${product.id})">

                        THÊM GIỎ

                    </button>

                </div>

            </div>
        `;


        productList.appendChild(card);

    });


    updateProductResult(data.length);

}


/* ================= PRODUCT COUNT ================= */

function updateProductResult(count) {

    const result =
        document.getElementById("product-result");

    if (result) {

        result.textContent =
            `${count} sản phẩm`;

    }

}


/* ================= FILTER ================= */

function filterProducts(category) {

    currentCategory = category;


    document
        .querySelectorAll(".category")
        .forEach(button => {

            button.classList.remove("active");

            if (
                button.dataset.category === category
            ) {

                button.classList.add("active");

            }

        });


    if (category === "all") {

        currentProducts = [...products];

    } else {

        currentProducts =
            products.filter(
                product =>
                    product.category === category
            );

    }


    document.getElementById("sort").value =
        "default";


    displayProducts(currentProducts);

}


/* ================= SORT ================= */

function sortProducts() {

    const type =
        document.getElementById("sort").value;


    let sorted =
        [...currentProducts];


    if (type === "low") {

        sorted.sort(
            (a, b) =>
                a.price - b.price
        );

    }


    if (type === "high") {

        sorted.sort(
            (a, b) =>
                b.price - a.price
        );

    }


    if (type === "name") {

        sorted.sort(
            (a, b) =>
                a.name.localeCompare(
                    b.name,
                    "vi"
                )
        );

    }


    displayProducts(sorted);

}


/* ================= SEARCH ================= */

function openSearch() {

    document
        .getElementById("search-modal")
        .classList.add("show");


    setTimeout(() => {

        document
            .getElementById("search-input")
            .focus();

    }, 100);

}


function closeSearch() {

    document
        .getElementById("search-modal")
        .classList.remove("show");

}


function handleSearchKey(event) {

    if (event.key === "Enter") {

        performSearch();

    }

}


function performSearch() {

    const keyword =
        document
            .getElementById("search-input")
            .value
            .trim()
            .toLowerCase();


    closeSearch();


    if (!keyword) {

        filterProducts(currentCategory);

        return;

    }


    currentProducts =
        products.filter(product =>

            product.name
                .toLowerCase()
                .includes(keyword)

        );


    displayProducts(currentProducts);


    document
        .getElementById("products")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* ================= CART ================= */

function addToCart(id) {

    const product =
        products.find(
            item => item.id === id
        );


    if (!product) {

        return;

    }


    const existing =
        cart.find(
            item => item.id === id
        );


    if (existing) {

        existing.quantity++;

    } else {

        cart.push({

            ...product,

            quantity: 1

        });

    }


    saveCart();

    updateCart();


    showToast(
        `${product.name} đã được thêm vào giỏ hàng`
    );

}


/* ================= SAVE CART ================= */

function saveCart() {

    localStorage.setItem(
        "thuySanCart",
        JSON.stringify(cart)
    );

}


/* ================= UPDATE CART ================= */

function updateCart() {

    const count =
        cart.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );


    const cartCount =
        document.getElementById(
            "cart-count"
        );


    cartCount.textContent = count;

}


/* ================= OPEN CART ================= */

function openCart() {

    renderCart();

    document
        .getElementById("cart-modal")
        .classList.add("show");

}


function closeCart() {

    document
        .getElementById("cart-modal")
        .classList.remove("show");

}


/* ================= RENDER CART ================= */

function renderCart() {

    const container =
        document.getElementById(
            "cart-items"
        );


    container.innerHTML = "";


    if (cart.length === 0) {

        container.innerHTML = `

            <div class="empty-cart">

                <div style="font-size:50px">
                    🛒
                </div>

                <h3>
                    Giỏ hàng đang trống
                </h3>

                <p>
                    Hãy chọn sản phẩm bạn muốn mua.
                </p>

            </div>

        `;


        document
            .getElementById(
                "cart-total-price"
            )
            .textContent = "0đ";


        return;

    }


    let total = 0;


    cart.forEach(item => {

        const subtotal =
            item.price *
            item.quantity;


        total += subtotal;


        const element =
            document.createElement("div");


        element.className =
            "cart-item";


        element.innerHTML = `

            <img
                class="cart-item-image"
                src="${item.image}"
                alt="${item.name}"
                onerror="this.src='images/banner.jpg'">


            <div class="cart-item-info">

                <h4>
                    ${item.name}
                </h4>

                <p>
                    ${formatPrice(item.price)}
                    / ${item.unit}
                </p>


                <div class="quantity-control">

                    <button
                        onclick="changeQuantity(${item.id}, -1)">
                        −
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button
                        onclick="changeQuantity(${item.id}, 1)">
                        +
                    </button>

                    <button
                        class="remove-item"
                        onclick="removeFromCart(${item.id})">

                        Xóa

                    </button>

                </div>

            </div>


            <div class="cart-item-price">

                ${formatPrice(subtotal)}

            </div>

        `;


        container.appendChild(element);

    });


    document
        .getElementById(
            "cart-total-price"
        )
        .textContent =
            formatPrice(total);

}


/* ================= CHANGE QUANTITY ================= */

function changeQuantity(id, change) {

    const item =
        cart.find(
            product => product.id === id
        );


    if (!item) {

        return;

    }


    item.quantity += change;


    if (item.quantity <= 0) {

        cart =
            cart.filter(
                product =>
                    product.id !== id
            );

    }


    saveCart();

    updateCart();

    renderCart();

}


/* ================= REMOVE ================= */

function removeFromCart(id) {

    cart =
        cart.filter(
            item => item.id !== id
        );


    saveCart();

    updateCart();

    renderCart();

}


/* ================= CHECKOUT ================= */

function openCheckout() {

    if (cart.length === 0) {

        showToast(
            "Giỏ hàng đang trống"
        );

        return;

    }


    closeCart();


    document
        .getElementById(
            "checkout-modal"
        )
        .classList.add("show");

}


function closeCheckout() {

    document
        .getElementById(
            "checkout-modal"
        )
        .classList.remove("show");

}


/* ================= SUBMIT ORDER ================= */

function submitOrder() {

    const name =
        document
            .getElementById(
                "customer-name"
            )
            .value
            .trim();


    const phone =
        document
            .getElementById(
                "customer-phone"
            )
            .value
            .trim();


    const address =
        document
            .getElementById(
                "customer-address"
            )
            .value
            .trim();


    const note =
        document
            .getElementById(
                "customer-note"
            )
            .value
            .trim();


    if (!name || !phone || !address) {

        alert(
            "Vui lòng nhập đầy đủ họ tên, số điện thoại và địa chỉ."
        );

        return;

    }


    let total = 0;


    let orderText =
        "ĐƠN HÀNG THỦY SẢN MIỀN QUÊ\n\n";


    orderText +=
        `Khách hàng: ${name}\n`;

    orderText +=
        `SĐT: ${phone}\n`;

    orderText +=
        `Địa chỉ: ${address}\n`;

    orderText +=
        `Ghi chú: ${note || "Không có"}\n\n`;

    orderText +=
        "SẢN PHẨM:\n";


    cart.forEach(item => {

        const subtotal =
            item.price *
            item.quantity;


        total += subtotal;


        orderText +=
            `- ${item.name}: ` +
            `${item.quantity}kg - ` +
            `${formatPrice(subtotal)}\n`;

    });


    orderText +=
        `\nTỔNG TIỀN: ${formatPrice(total)}`;


    /*
       HIỆN TẠI:
       Hiển thị đơn hàng để kiểm tra.

       Sau này có thể kết nối:
       - Google Sheets
       - Firebase
       - PHP/MySQL
       - API
    */


    console.log(orderText);


    alert(
        "Đặt hàng thành công!\n\n" +
        "Chúng tôi sẽ liên hệ với bạn để xác nhận đơn hàng."
    );


    cart = [];

    saveCart();

    updateCart();

    closeCheckout();


    document
        .getElementById(
            "customer-name"
        )
        .value = "";

    document
        .getElementById(
            "customer-phone"
        )
        .value = "";

    document
        .getElementById(
            "customer-address"
        )
        .value = "";

    document
        .getElementById(
            "customer-note"
        )
        .value = "";

}


/* ================= CONTACT ================= */

function sendContact() {

    const name =
        document
            .getElementById(
                "contact-name"
            )
            .value
            .trim();


    const phone =
        document
            .getElementById(
                "contact-phone"
            )
            .value
            .trim();


    const message =
        document
            .getElementById(
                "contact-message"
            )
            .value
            .trim();


    if (!name || !phone) {

        alert(
            "Vui lòng nhập họ tên và số điện thoại."
        );

        return;

    }


    alert(
        "Cảm ơn " +
        name +
        "! Chúng tôi sẽ liên hệ với bạn sớm."
    );


    document
        .getElementById(
            "contact-name"
        )
        .value = "";

    document
        .getElementById(
            "contact-phone"
        )
        .value = "";

    document
        .getElementById(
            "contact-message"
        )
        .value = "";

}


/* ================= MOBILE MENU ================= */

function toggleMobileMenu() {

    document
        .getElementById(
            "mobile-menu"
        )
        .classList.toggle("show");

}


document
    .querySelectorAll(
        ".mobile-menu a"
    )
    .forEach(link => {

        link.addEventListener(
            "click",
            () => {

                document
                    .getElementById(
                        "mobile-menu"
                    )
                    .classList.remove(
                        "show"
                    );

            }
        );

    });


/* ================= SCROLL ================= */

function scrollToProducts() {

    document
        .getElementById("products")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* ================= TOAST ================= */

function showToast(message) {

    const oldToast =
        document.querySelector(
            ".toast"
        );


    if (oldToast) {

        oldToast.remove();

    }


    const toast =
        document.createElement("div");


    toast.className = "toast";

    toast.textContent = message;


    document.body.appendChild(toast);


    setTimeout(() => {

        toast.classList.add("show");

    }, 10);


    setTimeout(() => {

        toast.classList.remove("show");

        setTimeout(() => {

            toast.remove();

        }, 300);

    }, 2500);

}


/* ================= CLOSE MODALS ================= */

window.addEventListener(
    "click",
    function(event) {

        const searchModal =
            document.getElementById(
                "search-modal"
            );

        const cartModal =
            document.getElementById(
                "cart-modal"
            );

        const checkoutModal =
            document.getElementById(
                "checkout-modal"
            );


        if (
            event.target === searchModal
        ) {

            closeSearch();

        }


        if (
            event.target === cartModal
        ) {

            closeCart();

        }


        if (
            event.target === checkoutModal
        ) {

            closeCheckout();

        }

    }
);


/* ================= ESC KEY ================= */

document.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Escape") {

            closeSearch();

            closeCart();

            closeCheckout();

        }

    }
);


/* ================= START WEBSITE ================= */

displayProducts(products);

updateCart();
```
