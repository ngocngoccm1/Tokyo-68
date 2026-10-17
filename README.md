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

Menu đang hiển thị trong `menu-current.js`: 3 nhóm lớn, 86 món và
140 lựa chọn theo chữ a–j cho các món nóng. Phần món nóng gồm 24 món,
chép từ hai ảnh khách gửi ngày 30/09/2026. Phần sushi gồm 62 món,
chép từ ảnh khách gửi ngày 17/10/2026: Nigiri, Maki, Crispy Maki, Sashimi,
hai nhóm Uramaki, Special Roll, Crispy Rolls, Sushi Sandwich và Menü Sushi.
Giữ mã M1/M2 trùng nhau giữa Uramaki và combo như ảnh gốc; mỗi món có ID
riêng theo nhóm để tìm kiếm và giỏ hàng phân biệt chính xác.
Tên S4 “Vegan” và thành phần Frischkäse giữ theo ảnh gốc, không gắn nhãn VEGAN.
`menu-data.js` và `Tokysen_Menu_Full.json` là bản cũ, không còn là menu hiển thị.
Không dùng thông tin dị ứng của bản cũ cho menu mới vì ảnh mới không cung cấp
bảng dị ứng. Danh sách đối chiếu ảnh nằm trong `PHOTO_MAPPING_AUDIT.md`.

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

Ảnh món trong menu đặt món dùng các file trong `assets/menu-photos/`, theo mã
trong `app.js` và bảng `PHOTO_MAPPING_AUDIT.md`. Bảy ảnh JPEG bổ sung được gắn
vào mã `4`, `5`, `7`, `8`, `20a`, `40a` và `40b`.
Món không có biến thể hiện ảnh cạnh tên; món có biến thể hiện ảnh ngay cạnh
mã/giá của biến thể tương ứng. Ảnh số 40 đang chờ xác nhận mã món.
"# Tokyo-68" 
