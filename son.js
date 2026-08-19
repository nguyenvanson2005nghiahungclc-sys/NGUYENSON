const productsData = {
    1: { id: 1, name: "Tôm Càng Xanh Bơi Sống (Size 8-10 con/kg)", price: 285000, img: "https://images.unsplash.com/photo-1559742811-822863c46f43?auto=format&fit=crop&w=600&q=80", desc: "Tôm càng xanh nước ngọt bơi khỏe, thịt chắc ngọt lịm. Đóng oxy giao tận nơi sống 100%." },
    2: { id: 2, name: "Cá Chép Giòn Sông Dày Thịt (Size 2.5 - 3kg/con)", price: 195000, img: "https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&w=600&q=80", desc: "Cá chép giòn nuôi đậu tằm chuẩn sông, thịt giòn sần sật. Hỗ trợ mổ vây sơ chế miễn phí." },
    3: { id: 3, name: "Cua Đồng Xay Hoặc Nguyên Con Giã Tươi", price: 160000, img: "https://images.unsplash.com/photo-1628191010210-a59de33e5941?auto=format&fit=crop&w=600&q=80", desc: "Cua đồng tự nhiên nhiều gạch, ngọt nước. Nhận xay sẵn hoặc giã tươi chia túi tiện lợi." }
};

let cart = [];

function formatVND(amount) {
    return amount.toLocaleString('vi-VN') + 'đ';
}

function updateCartUI() {
    const badge = document.getElementById('cart-badge');
    const itemsContainer = document.getElementById('cart-items');
    const totalPriceEl = document.getElementById('cart-total-price');

    const totalQty = cart.reduce((sum, i) => sum + i.qty, 0);
    badge.textContent = totalQty;

    itemsContainer.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        itemsContainer.innerHTML = '<p style="text-align:center; color:#888;">Giỏ hàng chưa có sản phẩm.</p>';
    } else {
        cart.forEach(item => {
            total += item.price * item.qty;
            itemsContainer.innerHTML += `
                <div class="cart-drawer-item">
                    <div>
                        <strong>${item.name}</strong>
                        <div>${formatVND(item.price)} x ${item.qty}</div>
                    </div>
                    <div><strong>${formatVND(item.price * item.qty)}</strong></div>
                </div>
            `;
        });
    }
    totalPriceEl.textContent = formatVND(total);
}

function addToCart(id, qty = 1) {
    const p = productsData[id];
    const itemIndex = cart.findIndex(i => i.id === id);
    if (itemIndex > -1) {
        cart[itemIndex].qty += qty;
    } else {
        cart.push({ ...p, qty });
    }
    updateCartUI();
    toggleCartDrawer(true);
}

function buyNow(id) {
    addToCart(id, 1);
}

function toggleCartDrawer(open) {
    document.getElementById('cart-drawer').classList.toggle('active', open);
    document.getElementById('cart-drawer-overlay').classList.toggle('active', open);
}

function openProductModal(id) {
    const p = productsData[id];
    document.getElementById('pm-img').src = p.img;
    document.getElementById('pm-title').textContent = p.name;
    document.getElementById('pm-price').textContent = formatVND(p.price) + ' / kg';
    document.getElementById('pm-desc').textContent = p.desc;
    document.getElementById('pm-qty').value = 1;

    document.getElementById('pm-add-btn').onclick = () => {
        const qty = parseInt(document.getElementById('pm-qty').value) || 1;
        addToCart(id, qty);
        closeProductModal();
    };

    document.getElementById('product-modal').classList.add('active');
}

function closeProductModal() {
    document.getElementById('product-modal').classList.remove('active');
}

// Bắt sự kiện click mở giỏ hàng & cuộn trang
document.getElementById('cart-toggle-btn').onclick = () => toggleCartDrawer(true);
document.getElementById('scrollTop').onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
