# Vịt Học (Duck Learn) - Nền Tảng Học Ngôn Ngữ Thông Minh

Vịt Học là một ứng dụng học ngôn ngữ (Tiếng Anh và Tiếng Trung) hiện đại, được thiết kế với giao diện trực quan, cá nhân hóa trải nghiệm người dùng và hỗ trợ quản trị viên theo dõi tiến độ học tập hiệu quả.

## 🚀 Tính Năng Chính

### 1. Trải Nghiệm Người Dùng Đa Dạng
- **Dành cho Khách (Guest)**: Khám phá các khóa học nổi bật và dùng thử các bài học miễn phí.
- **Dành cho Học Viên (Student)**: 
  - Bảng điều khiển cá nhân hóa theo trình độ.
  - Theo dõi tiến độ học tập trực quan với thanh tiến độ.
  - Nhận mã giảm giá linh hoạt (ENG20, CHI20) khi hoàn thành các khóa học thử.
- **Dành cho Quản Trị Viên (Admin)**:
  - Quản lý danh sách khóa học (CRUD).
  - Hệ thống giám sát độ tập trung (Live Focus Monitor) theo thời gian thực.
  - Báo cáo lỗi sai thường gặp của học viên.
  - Xuất dữ liệu báo cáo ra file CSV dễ dàng.

### 2. Hệ Thống Thanh Toán & Giảm Giá Thông Minh
- Giỏ hàng linh hoạt.
- Áp dụng mã giảm giá riêng biệt cho từng khóa học dựa trên ngôn ngữ (Tiếng Anh/Tiếng Trung).
- Tự động tính toán tổng tiền sau giảm giá.

### 3. Giao Diện & Trải Nghiệm
- Thiết kế theo phong cách hiện đại với Tailwind CSS.
- Hiệu ứng chuyển động mượt mà với Framer Motion.
- Biểu tượng trực quan từ Lucide React.

## 🛠 Công Nghệ Sử Dụng

- **Frontend**: React 18+, Vite
- **Styling**: Tailwind CSS
- **Animation**: motion/react (Framer Motion)
- **Icons**: Lucide React
- **Language**: TypeScript

## 📦 Cài Đặt

1. **Clone repository**:
   ```bash
   git clone <repository-url>
   cd vit-hoc
   ```

2. **Cài đặt dependencies**:
   ```bash
   npm install
   ```

3. **Chạy ở chế độ phát triển**:
   ```bash
   npm run dev
   ```

4. **Build dự án**:
   ```bash
   npm run build
   ```

## 📂 Cấu Trúc Thư Mục

- `src/components/`: Chứa các component giao diện (Auth, Admin, Course, Cart, v.v.)
- `src/lib/`: Các hàm tiện ích (Export CSV, v.v.)
- `src/constants.ts`: Dữ liệu mẫu và các hằng số của hệ thống.
- `src/types.ts`: Định nghĩa Type/Interface cho TypeScript.

---
Phát triển bởi Đội ngũ Vịt Học. Quack Quack! 🦆
