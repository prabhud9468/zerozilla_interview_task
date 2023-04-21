const { check } = require("express-validator");

exports.CreateValidadtion = [
    check("AgencyId", "AgencyId Number is requied").not().isEmpty(),
    check("Name", "Name is requied").not().isEmpty(),
    check("Address1", "Address1 is requied").not().isEmpty(),
    check("Address2", "Address2 is requied").not().isEmpty(),
    check("State", "State is requied").not().isEmpty(),
    check("City", "City is required").not().isEmpty(),
    // check("email", "Please enter valid email ID").isEmail().normalizeEmail({ gmail_remove_dots: true }),
    check("PhoneNumber", "Phone Number must be 10 digits").isLength({min: 10, max:10}),
];
exports.ClientValidation = [
    check("ClientId", "ClientId is required").not().isEmpty(),
    check("Name", "Name is required").not().isEmpty(),
    check("Email", "Email is required").not().isEmpty(),
    check("PhoneNumber", "Phone Number must be 10 digits").isLength({min: 10, max:10}),
    check("TotalBill", "TotalBill is required").not().isEmpty(),
    check("AgencyId", "AgencyId is required").not().isEmpty(),
];
