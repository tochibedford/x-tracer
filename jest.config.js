module.exports = {
    testMatch: ["**/?(*.)+(spec|test).[t]s?(x)" ],
    preset: "ts-jest",
    testEnvironment: "node",
    resolver: "jest-ts-webcompat-resolver"
}