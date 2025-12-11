# Veo 3 Prompt Architect

Công cụ chuyên nghiệp giúp tạo prompt chuẩn cho mô hình tạo video Google Veo 3.

## Tính năng
- **Chế độ AI (Mặc định):** Nhập ý tưởng thô sơ, AI (Pollinations) sẽ tự động viết lại thành prompt chi tiết chuẩn Veo 3.
- **Chế độ Offline:** Tùy chỉnh thủ công từng thông số như góc máy, ánh sáng, nhân vật.
- **Giao diện:** Neo-Brutalist hiện đại, tối ưu trải nghiệm người dùng.

## Hướng dẫn cài đặt

1.  Cài đặt dependencies:
    ```bash
    npm install
    ```

2.  Chạy môi trường phát triển (Dev):
    ```bash
    npm run dev
    ```

3.  Build cho Production (Vercel):
    ```bash
    npm run build
    ```

## Deploy lên Vercel

Dự án này đã được cấu hình sẵn để deploy lên Vercel. Bạn chỉ cần đẩy code lên GitHub và kết nối với Vercel.
- Framework Preset: **Vite**
- Build Command: `npm run build`
- Output Directory: `dist`

**Lưu ý:** Ứng dụng sử dụng API miễn phí từ Pollinations.ai nên không cần cấu hình API Key.