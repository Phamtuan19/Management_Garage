module.exports = {
  root: true,
  env: { browser: true, es2020: true }, //https://eslint.org/docs/latest/use/configure/language-options#specifying-environments
  extends: [ //ESLint của bạn cho biết bạn đang sử dụng cấu hình nào

    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',

    // Cấu hình thêm config-prettier và prettier
    'plugin:prettier/recommended', // ESLint sẽ báo lỗi hoặc cảnh báo cho bạn về việc vi phạm quy tắc Prettier này.
    // 'eslint-config-prettier',
    // "prettier"
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'], // ESLint bỏ qua các tệp và thư mục

  // Định cấu hình Trình phân tích cú pháp tùy chỉnh
  // @typescript-eslint/parser: sử dụng trình phần tích cú pháp của typescript-eslint/parser
  parser: '@typescript-eslint/parser',

  // hỗ trợ sử dụng plugin của bên thứ ba
  plugins: [
    'react-refresh',
    // '@typescript-eslint',
    'prettier',
  ],

  // Cấu hình các quy tắc RULES:
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],

    // Cấu hình thêm prettier
    'prettier/prettier': [
      'warn',
      "error", // cảnh báo cho việc vi phạm quy tắc định dạng
      {
        "singleQuote": true,
        "parser": "flow"
      },
      {
        "arrowParens": "always", //  Luôn đặt dấu ngoặc đơn xung quanh tham số của hàm mũi tên (() => {}).
        "bracketSameLine": false, // Đặt dấu ngoặc { trên cùng một dòng.
        "bracketSpacing": true, // Đặt khoảng trắng sau dấu ngoặc {.
        "embeddedLanguageFormatting": "auto",
        "htmlWhitespaceSensitivity": "css", //  Sử dụng kiểm tra trắng thừa dựa trên quy tắc CSS.
        "insertPragma": false, // Không chèn pragma (chú thích) vào đầu tệp. 
        "jsxSingleQuote": false, // Sử dụng dấu ngoặc kép thay vì dấu ngoặc đơn trong JSX.
        "printWidth": 120, // Độ dài tối đa của một dòng mã.
        "proseWrap": "preserve", // Giữ nguyên định dạng cho các đoạn văn bản (không định dạng lại).
        "quoteProps": "as-needed", // Chỉ định dấu ngoặc đơn cho tên thuộc tính đối tượng chỉ khi cần thiết.
        "requirePragma": false, //  Không yêu cầu pragma (chú thích) để sử dụng Prettier.
        "semi": true, // Thêm dấu chấm phẩy vào cuối các câu lệnh.
        "singleQuote": true, // Sử dụng dấu ngoặc đơn thay vì dấu ngoặc kép cho chuỗi.
        "tabWidth": 3, //  Độ rộng của một tab (thường là 3 dấu cách).
        "trailingComma": "all", // Thêm dấu phẩy cuối cùng trong danh sách các mục (ví dụ: ['a', 'b',]).
        "useTabs": false, // Sử dụng dấu tab thay vì dấu cách.
        "vueIndentScriptAndStyle": false // Không định dạng lại mã trong phần script và style của tệp Vue.
      }
    ]
  },
}
