/* eslint-disable no-useless-escape */
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
   phoneVn = /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/;
   characterCharacter = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\|=]/;
   number = /^[1-9]\d*$/;
   cmnd = /^[1-9]{11}\b/g;
   bankNumber = /^(?:\d{10}|\d{19})$/;
   password = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;
   licensePlate = /^[0-9]{2}[A-Z]{1}-[0-9]{4,5}\.[0-9]{1,2}$/;
}

export default new Regexs();
