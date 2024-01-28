/**
 * @constant extends - cấu hình quy tắc commit theo git conventional
 * @constant rules - các quy tắc commitlint được phép
 * @param 2 - là mức độ nghiêm trọng của lỗi
 */

module.exports = {
   extends: ['@commitlint/config-conventional'],
   rules: {
      'type-enum': [2, 'always', ['feat', 'fix', 'refactor']],
   },
};
