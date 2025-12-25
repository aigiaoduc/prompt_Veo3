
# Veo 3 Prompt Architect (Groq Edition)

Công cụ chuyên nghiệp giúp tạo prompt chuẩn cho mô hình tạo video Google Veo 3 sử dụng Groq Compound.

## Cách Deploy lên Vercel

1. **Đẩy mã nguồn lên GitHub.**
2. **Truy cập Vercel Dashboard**, chọn **Add New Project** và kết nối với Repo này.
3. Ở bước **Configure Project**, mở phần **Environment Variables**.
4. Thêm biến mới:
   - **Key:** `API_KEY`
   - **Value:** (Dán mã Groq API Key của bạn vào đây - bắt đầu bằng `gsk_`)
5. Nhấn **Deploy**.

## Chạy dưới máy cục bộ (Local)

1. `npm install`
2. Tạo file `.env` từ `.env.example`.
3. Điền `API_KEY=gsk_...` của bạn vào file `.env`.
4. `npm run dev`

## Lưu ý về Bảo mật
Vì đây là ứng dụng Single Page Application (SPA), API Key sẽ được gửi từ trình duyệt của người dùng. Nếu bạn deploy công khai, hãy đảm bảo giới hạn (Usage Limit) Key của bạn trên Groq để tránh phát sinh chi phí ngoài ý muốn.
