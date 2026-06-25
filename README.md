# TOKYSEN — Figma Layout Rebuild

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

Website sử dụng toàn bộ file `Tokysen_Menu_Full.json`:

- 7 nhóm lớn
- 28 category
- 187 món và đồ uống
- Giá, option, dung tích, khẩu phần
- Allergene và Zusatzstoffe
- Ghi chú menu

`menu-data.js` được tạo trực tiếp từ JSON để website chạy cả khi mở local.

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


## Bản menu không ảnh

- Bỏ hoàn toàn product card và ảnh cho từng món.
- Menu dạng editorial hai cột trên desktop, một cột trên mobile.
- 7 section có màu nhận diện riêng.
- Category heading rõ ràng, đường kẻ mảnh và khoảng trắng lớn.
- Toàn bộ 187 món được render trực tiếp, không cần nút tải thêm.
- Tìm kiếm, chọn option, giỏ hàng và checkout vẫn giữ nguyên.
"# Tokyo-68" 
