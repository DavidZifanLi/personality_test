module.exports = {
    calculate_per1: function (name) {
        var charLength = name.length;
        var char_code = 0;

        for (var i = 0; i < charLength; i++) {
            var currCode = name.charCodeAt(i);
            char_code += currCode;
        }

        return char_code % 3;
    },

    calculate_per2: function (birth) {
        var charLength = birth.length;
        var char_code = 0;

        for (var i = 0; i < charLength; i++) {
            var currCode = birth.charCodeAt(i);
            char_code += currCode;
        }

        return char_code % 3;
    },

    calculate_per3: function (name, gender) {
        var newChar = name + gender;
        var charLength = newChar.length;
        var char_code = 0;

        for (var i = 0; i < charLength; i++) {
            var currCode = newChar.charCodeAt(i);
            char_code += currCode;
        }

        return char_code % 3;
    },

    get_category: function (birth) {
        var year = Number(birth.slice(6, 10));
        var month = Number(birth.slice(0, 2));

        return (year + month) % 3;
    }
}

