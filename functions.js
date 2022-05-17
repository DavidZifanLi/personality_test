module.exports = {
    calculate: function (name, birth) {
        var newChar = name + birth;
        var char_code = 0;
        var charLength = newChar.length;
        for (var i = 0; i < charLength; i++) {
            var currCode = newChar.charCodeAt(i);
            char_code += currCode;
        }
        return char_code % 10;
    }
}

