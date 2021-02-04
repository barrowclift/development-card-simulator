"use strict";

// DEPENDENCIES
// ------------
// External
let path = require("path");
// Local


// CONSTANTS
// ---------

exports.SHELF_ROOT_DIRECTORY_PATH = path.join(__dirname, "../..");

exports.BACKEND_DIRECTORY_PATH = path.join(exports.SHELF_ROOT_DIRECTORY_PATH, "backend");
    exports.BACKEND_COMMON_DIRECTORY_PATH = path.join(exports.BACKEND_DIRECTORY_PATH, "common");
    exports.BACKEND_RESOURCES_DIRECTORY_PATH = path.join(exports.BACKEND_DIRECTORY_PATH, "resources");

exports.FRONTEND_DIRECTORY_PATH = path.join(exports.SHELF_ROOT_DIRECTORY_PATH, "frontend");
    exports.FRONTEND_STATIC_DIRECTORY_PATH = path.join(exports.FRONTEND_DIRECTORY_PATH, "static");
        exports.FRONTEND_IMAGES_DIRECTORY_PATH = path.join(exports.FRONTEND_STATIC_DIRECTORY_PATH, "images");
    exports.FRONTEND_LIQUID_DIRECTORY_PATH = path.join(exports.FRONTEND_DIRECTORY_PATH, "liquid");
        exports.FRONTEND_INCLUDES_DIRECTORY_PATH = path.join(exports.FRONTEND_LIQUID_DIRECTORY_PATH, "_includes");
        exports.FRONTEND_LAYOUTS_DIRECTORY_PATH = path.join(exports.FRONTEND_LIQUID_DIRECTORY_PATH, "_layouts");