
# Veo 3 Prompt Architect

Công cụ chuyên nghiệp giúp tạo prompt chuẩn cho mô hình tạo video Google Veo 3.

## Tính năng
- **Chế độ AI (Mặc định):** Nhập ý tưởng thô sơ, AI (Groq Compound) sẽ tự động viết lại thành prompt chi tiết chuẩn Veo 3 bao gồm cả mô tả hình ảnh và kịch bản âm thanh.
- **Chế độ Offline:** Tùy chỉnh thủ công từng thông số như góc máy, ánh sáng, nhân vật dành cho những người muốn kiểm soát hoàn toàn.
- **Giao diện:** Neo-Brutalist hiện đại, tối ưu trải nghiệm người dùng với các hiệu ứng tương tác mạnh mẽ.

## Hướng dẫn cài đặt & Cấu hình

1.  **Cài đặt dependencies:**
    ```bash
    npm install
    ```

2.  **Cấu hình API Key:**
    Ứng dụng yêu cầu một API Key từ [Groq Cloud](https://console.groq.com/).
    - Tạo file `.env` ở thư mục gốc.
    - Thêm dòng sau: `API_KEY=your_groq_api_key_here`

3.  **Chạy môi trường phát triển (Dev):**
    ```bash
    npm run dev
    ```

4.  **Build cho Production:**
    ```bash
    npm run build
    ```

## Deploy lên Vercel/Netlify

Khi deploy lên các nền tảng đám mây:
1. Kết nối với repo GitHub của bạn.
2. Trong phần **Environment Variables**, thêm biến `API_KEY` với giá trị là Groq API Key của bạn.
3. Ứng dụng sẽ tự động nhận diện và hoạt động một cách an toàn.

**Lưu ý:** Mã nguồn này hoàn toàn sạch, không chứa API Key, đảm bảo an toàn tuyệt đối cho tài khoản của bạn.
