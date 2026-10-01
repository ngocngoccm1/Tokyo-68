# TOKYO68 — Landing page và menu đặt món

Bản này được dựng lại hoàn toàn theo nhịp bố cục của frame Figma được cung cấp,
không kế thừa layout editorial của các bản trước.

## Cấu trúc giao diện

- Hero lớn với ảnh nhà hàng và collage ảnh thật
- Carousel category giống khối Popular Food Items
- Hai promotional banners
- Trust/stats strip
- Full-width dark offer banner
- Product grid có category tabs, tìm kiếm và load more
- Combo section với tab ảnh
- Marquee lớn
- Feature strip màu đỏ
- About section chia đôi
- Hai special banners
- Fruit product feature
- Testimonial
- Order CTA
- Gallery strip
- Contact và footer

## Dữ liệu

Menu đang hiển thị được chép từ hai ảnh khách gửi ngày 30/09/2026 trong
`menu-current.js`: 2 nhóm lớn, 24 món chính và 140 lựa chọn theo chữ a–j.
`menu-data.js` và `Tokysen_Menu_Full.json` là bản cũ, không còn là menu hiển thị.
Không dùng thông tin dị ứng của bản cũ cho menu mới vì ảnh mới không cung cấp
bảng dị ứng. Danh sách đối chiếu 40 ảnh nằm trong `PHOTO_MAPPING_AUDIT.md`.

## Đặt món

- Chọn món
- Chọn option
- Chọn số lượng
- Thêm ghi chú bếp
- Giỏ hàng
- Abholung / Lieferung
- Checkout
- Gửi qua WhatsApp nếu cấu hình số
- Nếu chưa có số WhatsApp, đơn tải xuống thành file `.txt`

## Cấu hình

Mở `config.js` và thay:

```js
address: "...",
phone: "...",
openingHours: "...",
mapsUrl: "...",
reservationUrl: "...",
whatsappNumber: "491701234567"
```

Số WhatsApp không có dấu `+` hoặc khoảng trắng.

## Chạy

Mở `index.html` trực tiếp hoặc dùng VS Code Live Server.

## Ảnh

Toàn bộ ảnh trong `assets/` được xử lý từ ảnh người dùng cung cấp.


## Ảnh và biến thể

Ảnh món trong menu đặt món dùng trực tiếp các file `dish-XX.jpg` hiển thị trong
`PHOTO_MAPPING_AUDIT.md`, theo mã trong `app.js`. Món không có biến thể hiện ảnh cạnh tên;
món có biến thể hiện ảnh ngay cạnh mã/giá của biến thể tương ứng. Ba ảnh trùng mã
được giữ lại trong `assets/` nhưng không hiển thị hai lần.
"# Tokyo-68" 
