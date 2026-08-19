// DỮ LIỆU 20 SẢN PHẨM (10 CÁ, 4 TÔM, 3 CUA, 3 ỐC)
const products = [
    // 10 LOẠI CÁ NƯỚC NGỌT
    { id: 1, name: "Cá lóc đồng", category: "ca", price: 120000, unit: "kg", icon: "🐟", image: "images/ca/ca-loc.jpg" },
    { id: 2, name: "Cá trắm đen", category: "ca", price: 150000, unit: "kg", icon: "🐟", image: "images/ca/ca-tram.jpg" },
    { id: 3, name: "Cá chép giòn", category: "ca", price: 180000, unit: "kg", icon: "🐟", image: "images/ca/ca-chep.jpg" },
    { id: 4, name: "Cá rô đồng", category: "ca", price: 110000, unit: "kg", icon: "🐟", image: "images/ca/ca-ro.jpg" },
    { id: 5, name: "Cá trê vàng", category: "ca", price: 90000, unit: "kg", icon: "🐟", image: "images/ca/ca-tre.jpg" },
    { id: 6, name: "Cá mè hoa", category: "ca", price: 65000, unit: "kg", icon: "🐟", image: "images/ca/ca-me.jpg" },
    { id: 7, name: "Cá diêu hồng", category: "ca", price: 85000, unit: "kg", icon: "🐟", image: "images/ca/dieu-hong.jpg" },
    { id: 8, name: "Cá chim trắng", category: "ca", price: 75000, unit: "kg", icon: "🐟", image: "images/ca/ca-chim.jpg" },
    { id: 9, name: "Cá rô phi", category: "ca", price: 55000, unit: "kg", icon: "🐟", image: "images/ca/ca-ro-phi.jpg" },
    { id: 10, name: "Cá quả (Cá chuối)", category: "ca", price: 130000, unit: "kg", icon: "🐟", image: "images/ca/ca-qua.jpg" },

    // 4 LOẠI TÔM
    { id: 11, name: "Tôm càng xanh", category: "tom", price: 280000, unit: "kg", icon: "🦐", image: "images/tom/tom-cang-xanh.jpg" },
    { id: 12, name: "Tôm đồng tươi", category: "tom", price: 190000, unit: "kg", icon: "🦐", image: "images/tom/tom-dong.jpg" },
    { id: 13, name: "Tôm đất nước ngọt", category: "tom", price: 210000, unit: "kg", icon: "🦐", image: "images/tom/tom-dat.jpg" },
    { id: 14, name: "Tôm sông tự nhiên", category: "tom", price: 240000, unit: "kg", icon: "🦐", image: "images/tom/tom-song.jpg" },

    // 3 LOẠI CUA
    { id: 15, name: "Cua đồng giã/xay sẵn", category: "cua", price: 140000, unit: "kg", icon: "🦀", image: "images/cua/cua-dong.jpg" },
    { id: 16, name: "Cua ruộng nguyên con", category: "cua", price: 130000, unit: "kg", icon: "🦀", image: "images/cua/cua-ruong.jpg" },
    { id: 17, name: "Cua sông tự nhiên", category: "cua", price: 170000, unit: "kg", icon: "🦀", image: "images/cua/cua-song.jpg" },

    // 3 LOẠI ỐC
    { id: 18, name: "Ốc bươu đen", category: "oc", price: 90000, unit: "kg", icon: "🐚", image: "images/oc/oc-buou.jpg" },
    { id: 19, name: "Ốc nhồi đồng", category: "oc", price: 120000, unit: "kg", icon: "🐚", image: "images/oc/oc-nhoi.jpg" },
    { id: 20, name: "Ốc vặn/ốc đá", category: "oc", price: 70000, unit: "kg", icon: "🐚", image: "images/oc/oc-van.jpg" }
];

// BIẾN QUẢN LÝ
let currentProducts = [...products];
let cart = [];

// KHỞI TẠO TRANG
document.addEventListener("DOMContentLoaded", () => {
    displayProducts(currentProducts);
});

// THỦ THUẬT ĐỊNH DẠNG GIÁ VIỆT NAM DỒNG
function formatPrice(price) {
    return price.toLocaleString('vi-VN') + 'đ';
}

// HIỂN THỊ SẢN PHẨM RA LƯỚI
function displayProducts(items) {
    const productList = document.getElementById("product-list");
    const countDisplay = document.getElementById("product-count-display");
    
    productList.innerHTML = "";
    countDisplay.textContent = `Hiển thị ${items.length} sản phẩm`;

    if (items.length === 0) {
        productList.innerHTML = `<p style="grid-column: 1/-1; text-align: center; padding: 40px; color: #777;">Không tìm thấy sản phẩm phù hợp.</p>`;
        return;
    }

    items.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";
        
        card.innerHTML = `
            <div class="product-image">
                <!-- Trường hợp không load được ảnh sẽ hiện Icon -->
                <img src="${product.image}" alt="${product.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                <div class="img-placeholder-card" style="display:none;">${product.icon}</div>
            </div>
            <div class="product-info">
                <span class="product-category">${getCategoryLabel(product.category)}</span>
                <h3>${product.name}</h3>
                <div class="product-bottom">
                    <span class="product-price">${formatPrice(product.price)} / ${product.unit}</span>
                    <button class="btn-add-cart" onclick="addToCart(${product.id})">Thêm giỏ</button>
                </div>
            </div>
        `;
        productList.appendChild(card);
    });
}

// ĐỔI MÃ CATEGORY THÀNH TÊN HIỂN THỊ
function getCategoryLabel(cat) {
    switch(cat) {
        case 'ca': return 'Cá Nước Ngọt';
        case 'tom': return 'Tôm tươi';
        case 'cua': return 'Cua đồng';
        case 'oc': return 'Ốc tươi';
        default: return 'Thủy sản';
    }
}

// LỌC THEO DANH MỤC
function filterCategory(category, element) {
    // Cập nhật trạng thái Active nút
    if (element) {
        document.querySelectorAll(".category-btn").forEach(btn => btn.classList.remove("active"));
        element.classList.add("active");
    }

    if (category === 'all') {
        currentProducts = [...products];
    } else {
        currentProducts = products.filter(p => p.category === category);
    }
    
    // reset sắp xếp về mặc định khi chuyển danh mục
    document.getElementById("sort-select").value = "default";
    displayProducts(currentProducts);
}

// SẮP XẾP SẢN PHẨM
function sortProducts() {
    const sortValue = document.getElementById("sort-select").value;

    if (sortValue === "low") {
        currentProducts.sort((a, b) => a.price - b.price);
    } else if (sortValue === "high") {
        currentProducts.sort((a, b) => b.price - a.price);
    } else {
        currentProducts.sort((a, b) => a.id - b.id);
    }

    displayProducts(currentProducts);
}

// TÌM KIẾM SẢN PHẨM
function handleSearch(event) {
    if (event.key === "Enter") {
        triggerSearch();
    }
}

function triggerSearch() {
    const query = document.getElementById("search-input").value.trim().toLowerCase();
    const searchResults = products.filter(p => p.name.toLowerCase().includes(query));
    displayProducts(searchResults);
}

// CHỨC NĂNG GIỎ HÀNG
function addToCart(productId) {
    const item = products.find(p => p.id === productId);
    const existingIndex = cart.findIndex(p => p.id === productId);

    if (existingIndex > -1) {
        cart[existingIndex].quantity += 1;
    } else {
        cart.push({ ...item, quantity: 1 });
    }

    updateCartUI();
    alert(`Đã thêm "${item.name}" vào giỏ hàng!`);
}

function changeQuantity(productId, delta) {
    const index = cart.findIndex(p => p.id === productId);
    if (index > -1) {
        cart[index].quantity += delta;
        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
        }
    }
    updateCartUI();
}

function updateCartUI() {
    const cartCount = document.getElementById("cart-count");
    const cartContainer = document.getElementById("cart-items-container");
    const cartTotalDisplay = document.getElementById("cart-total-price");

    // Tính tổng số lượng
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    // Render danh sách trong Modal
    cartContainer.innerHTML = "";
    let totalPrice = 0;

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p style='text-align:center;'>Giỏ hàng đang trống.</p>";
    } else {
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            totalPrice += itemTotal;

            const div = document.createElement("div");
            div.className = "cart-item";
            div.innerHTML = `
                <div>
                    <strong>${item.name}</strong><br>
                    <small>${formatPrice(item.price)} / ${item.unit}</small>
                </div>
                <div class="cart-item-controls">
                    <button onclick="changeQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="changeQuantity(${item.id}, 1)">+</button>
                    <span style="width: 80px; text-align: right; font-weight: bold;">${formatPrice(itemTotal)}</span>
                </div>
            `;
            cartContainer.appendChild(div);
        });
    }

    cartTotalDisplay.textContent = formatPrice(totalPrice);
}

// BẬT / TẮT MODAL GIỎ HÀNG
function openCartModal() {
    updateCartUI();
    document.getElementById("cart-modal").style.display = "flex";
}

function closeCartModal() {
    document.getElementById("cart-modal").style.display = "none";
}

// XỬ LÝ ĐẶT HÀNG
function handleCheckout(event) {
    event.preventDefault();
    
    if (cart.length === 0) {
        alert("Giỏ hàng của bạn đang trống!");
        return;
    }

    const name = document.getElementById("customer-name").value;
    const phone = document.getElementById("customer-phone").value;
    const address = document.getElementById("customer-address").value;

    alert(`Cảm ơn bạn ${name}!\nĐơn hàng đã được ghi nhận. Chúng tôi sẽ liên hệ tới SĐT ${phone} để giao hàng sớm nhất!`);

    // Reset giỏ hàng
    cart = [];
    updateCartUI();
    document.getElementById("checkout-form").reset();
    closeCartModal();
}

// CUỘN TRANG MƯỢT
function scrollToProducts() {
    document.getElementById("products").scrollIntoView({ behavior: 'smooth' });
}
