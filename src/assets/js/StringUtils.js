class StringUtils{

    static isEmpty(content){

      if (content == null || content.length == 0) {
        return true;
      }
      return false
    }
}

export default StringUtils
