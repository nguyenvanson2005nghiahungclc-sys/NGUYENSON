let cart = [];

// Định dạng giá tiền VNĐ
function formatPrice(amount) {
    return amount.toLocaleString('vi-VN') + 'đ';
}

// Cập nhật giao diện giỏ hàng
function updateCartUI() {
    const cartCountEl = document.getElementById('cart-count');
    const cartItemsList = document.getElementById('cart-items-list');
    const cartTotalPriceEl = document.getElementById('cart-total-price');

    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountEl.textContent = totalCount;

    cartItemsList.innerHTML = '';
    let totalPrice = 0;

    if (cart.length === 0) {
        cartItemsList.innerHTML = '<p>Giỏ hàng của bạn đang trống.</p>';
    } else {
        cart.forEach(item => {
            totalPrice += item.price * item.quantity;
            const itemEl = document.createElement('div');
            itemEl.className = 'cart-item';
            itemEl.innerHTML = `
                <div>
                    <strong>${item.name}</strong>
                    <div>${formatPrice(item.price)} x ${item.quantity}</div>
                </div>
                <div><strong>${formatPrice(item.price * item.quantity)}</strong></div>
            `;
            cartItemsList.appendChild(itemEl);
        });
    }

    cartTotalPriceEl.textContent = formatPrice(totalPrice);
}

// Thêm sản phẩm vào giỏ
function addToCart(product) {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCartUI();
    alert(`Đã thêm "${product.name}" vào giỏ hàng!`);
}

// Sự kiện bấm nút Thêm giỏ / Mua ngay / Xem chi tiết
document.querySelectorAll('.product-card').forEach(card => {
    const productData = {
        id: card.dataset.id,
        name: card.dataset.name,
        price: parseInt(card.dataset.price),
        img: card.dataset.img,
        desc: card.dataset.desc
    };

    // Bấm Thêm giỏ
    card.querySelector('.btn-add-cart').addEventListener('click', (e) => {
        e.stopPropagation();
        addToCart(productData);
    });

    // Bấm Mua ngay -> Mở chi tiết hoặc giỏ hàng
    card.querySelector('.btn-buy-now').addEventListener('click', (e) => {
        e.stopPropagation();
        addToCart(productData);
        document.getElementById('cart-modal').classList.add('active');
    });

    // Bấm vào ảnh/tên -> Mở Modal Chi tiết
    card.querySelectorAll('.product-thumb, .view-detail').forEach(el => {
        el.addEventListener('click', () => {
            document.getElementById('modal-img').src = productData.img;
            document.getElementById('modal-title').textContent = productData.name;
            document.getElementById('modal-price').textContent = formatPrice(productData.price);
            document.getElementById('modal-desc').textContent = productData.desc;

            const modalAddBtn = document.getElementById('modal-add-cart');
            modalAddBtn.onclick = () => addToCart(productData);

            document.getElementById('product-modal').classList.add('active');
        });
    });
});

// Đóng/mở Modal Giỏ hàng & Chi tiết
document.getElementById('open-cart-btn').addEventListener('click', () => {
    document.getElementById('cart-modal').classList.add('active');
});

document.getElementById('close-cart-modal').addEventListener('click', () => {
    document.getElementById('cart-modal').classList.remove('active');
});

document.getElementById('close-product-modal').addEventListener('click', () => {
    document.getElementById('product-modal').classList.remove('active');
});

// Cuộn lên đầu trang
document.getElementById('scrollTopBtn').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
