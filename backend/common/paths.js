"use strict";

// DEPENDENCIES
// ------------
// External
import path from "path";
import url from "url";
// Local


// CONSTANTS
// ---------

const FILENAME = url.fileURLToPath(import.meta.url);
const CATAN_ROOT_DIRECTORY_PATH = path.join(path.dirname(FILENAME), "../..");

const BACKEND_DIRECTORY_PATH = path.join(CATAN_ROOT_DIRECTORY_PATH, "backend");
    const BACKEND_COMMON_DIRECTORY_PATH = path.join(BACKEND_DIRECTORY_PATH, "common");
    const BACKEND_RESOURCES_DIRECTORY_PATH = path.join(BACKEND_DIRECTORY_PATH, "resources");

const FRONTEND_DIRECTORY_PATH = path.join(CATAN_ROOT_DIRECTORY_PATH, "frontend");
    const FRONTEND_STATIC_DIRECTORY_PATH = path.join(FRONTEND_DIRECTORY_PATH, "static");
        const FRONTEND_IMAGES_DIRECTORY_PATH = path.join(FRONTEND_STATIC_DIRECTORY_PATH, "images");
    const FRONTEND_LIQUID_DIRECTORY_PATH = path.join(FRONTEND_DIRECTORY_PATH, "liquid");
        const FRONTEND_INCLUDES_DIRECTORY_PATH = path.join(FRONTEND_LIQUID_DIRECTORY_PATH, "_includes");
        const FRONTEND_LAYOUTS_DIRECTORY_PATH = path.join(FRONTEND_LIQUID_DIRECTORY_PATH, "_layouts");

export default {
    CATAN_ROOT_DIRECTORY_PATH,
    BACKEND_DIRECTORY_PATH,
    BACKEND_COMMON_DIRECTORY_PATH,
    BACKEND_RESOURCES_DIRECTORY_PATH,
    FRONTEND_DIRECTORY_PATH,
    FRONTEND_STATIC_DIRECTORY_PATH,
    FRONTEND_IMAGES_DIRECTORY_PATH,
    FRONTEND_LIQUID_DIRECTORY_PATH,
    FRONTEND_INCLUDES_DIRECTORY_PATH,
    FRONTEND_LAYOUTS_DIRECTORY_PATH,
}
