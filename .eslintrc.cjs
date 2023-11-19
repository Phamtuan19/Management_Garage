module.exports = {
   root: true, // Dự án gốc, không tìm kiếm các cấu hình trong các thư mục cha
   env: {
      browser: true, // Chỉ định môi trường là trình duyệt
      es2020: true, // Cho biết chúng ta đang sử dụng ES2020
   },
   extends: [
      'eslint:recommended', // Sử dụng các quy tắc mặc định của ESLint
      'plugin:@typescript-eslint/recommended', // Sử dụng cài đặt khuyến nghị từ plugin TypeScript ESLint
      'plugin:react-hooks/recommended', // Sử dụng cài đặt khuyến nghị từ plugin React Hooks ESLint
      'plugin:prettier/recommended', // Kết hợp với cài đặt của Prettier
   ],
   ignorePatterns: ['dist', '.eslintrc.cjs'], // Bỏ qua các tệp và thư mục được liệt kê
   parser: '@typescript-eslint/parser', // Sử dụng trình phân tích cú pháp TypeScript
   parserOptions: {
      ecmaVersion: 2020, // Sử dụng ES2020
      sourceType: 'module', // Sử dụng cú pháp module
      ecmaFeatures: {
         jsx: true, // Cho phép sử dụng JSX
      },
   },
   plugins: ['react-refresh', '@typescript-eslint', 'prettier', 'import'], // Thêm 'import' vào danh sách plugin // Kích hoạt các plugin cần thiết
   rules: {
      'react-hooks/exhaustive-deps': 'off', // Tắt cảnh báo khi useEffect chưa đặt dependencies
      '@typescript-eslint/explicit-module-boundary-types': 'off', // Tắt yêu cầu khai báo kiểu cho tất cả các hàm và phương thức public
      '@typescript-eslint/no-empty-interface': 'off', // Tắt cảnh báo về interface trống
      'prettier/prettier': [
         'warn',
         'error', // Báo cảnh báo và lỗi cho việc vi phạm quy tắc định dạng Prettier
         {
            singleQuote: true, // Sử dụng dấu ngoặc đơn thay vì ngoặc kép cho chuỗi
            parser: 'typescript', // Sử dụng parser TypeScript cho Prettier
            arrowParens: 'always', // Luôn đặt dấu ngoặc đơn xung quanh tham số của hàm mũi tên
            bracketSameLine: false, // Đặt dấu ngoặc { trên cùng một dòng
            bracketSpacing: true, // Đặt khoảng trắng sau dấu ngoặc {
            embeddedLanguageFormatting: 'auto',
            htmlWhitespaceSensitivity: 'css', // Sử dụng kiểm tra trắng thừa dựa trên quy tắc CSS
            insertPragma: false, // Không chèn pragma (chú thích) vào đầu tệp
            jsxSingleQuote: false, // Sử dụng dấu ngoặc đơn thay vì ngoặc kép trong JSX
            printWidth: 120, // Độ dài tối đa của một dòng mã
            proseWrap: 'preserve', // Giữ nguyên định dạng cho các đoạn văn bản (không định dạng lại)
            quoteProps: 'as-needed', // Chỉ định dấu ngoặc đơn cho tên thuộc tính đối tượng chỉ khi cần thiết
            requirePragma: false, // Không yêu cầu pragma (chú thích) để sử dụng Prettier
            semi: true, // Thêm dấu chấm phẩy vào cuối các câu lệnh
            singleQuote: true, // Sử dụng dấu ngoặc đơn thay vì ngoặc kép cho chuỗi
            tabWidth: 3, // Độ rộng của một tab (thường là 3 dấu cách)
            trailingComma: 'all', // Thêm dấu phẩy cuối cùng trong danh sách các mục
            useTabs: false, // Sử dụng dấu tab thay vì dấu cách
            vueIndentScriptAndStyle: false, // Không định dạng lại mã trong phần script và style của tệp Vue
         },
      ],
   },
};
