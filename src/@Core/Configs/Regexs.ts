/*
 * Created Date: 17-11-2023
 * Author: Phạm anh tuấn
 * Email: ....
 * -----
 * Last Modified:
 * Modified By:
 * -----
 * -----
 * HISTORY:
 * Date      	By	Comments
 * ----------	---	----------------------------------------------------------
 */

/**
 * @param email => định dạng email.
 * @param uppercaseCharacters => chuỗi phải có ít nhất 1 chuỗi hoa.
 * @param phoneVn => Định dạng số điện thoại việt nam.
 * @param characterCharacter => Chuỗi phải có ít nhất 1 ký tự đặc biệt
 * @param number => Định dạng số.
 */

class Regexs {
   integer = /[^0-9]/g;
   string = /[^a-zA-ZÀ-Ỹà-ỹĂăÂâĐđÊêÔôƠơƯư]/g;
   email =
      /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$/;
   uppercaseCharacters = /.*[A-Z].*/;
   phoneVn = /(84|0[35789])[0-9]{8}\b/g;
   characterCharacter = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\|=]/;
   number = /^[1-9]\d*$/;
   cmnd = /^[1-9]{11}\b/g;
   bankNumber = /^(?:\d{10}|\d{19})$/;
}

export default new Regexs();
