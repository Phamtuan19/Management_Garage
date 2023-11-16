class Regexs {
   email =
      /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$/;
   uppercaseCharacters = /.*[A-Z].*/;
   phoneVn = /(84|0[35789])[0-9]{8}\b/g;
   characterCharacter = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\|=]/;
   number = /^[1-9]\d*$/;
   cmnd = /^[1-9]{11}\b/g;
}

export default new Regexs();
