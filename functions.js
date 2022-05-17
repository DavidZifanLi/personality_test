const express = require('express');

module.exports = {
    calculate: function (name, birth) {
        var name_code = 0;
        var nameLength = name.length;
        for (var i = 0; i < nameLength; i++) {
            var currCode = name.charCodeAt(i);
            name_code += currCode;
        }
        var name_index = name_code % 10;
        return name_index;
    }
}

