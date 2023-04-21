const { validationResult } = require("express-validator");
const agencies = require("../modal/agency");
const clients = require("../modal/clients");

exports.Create = async (req, res) => {
  try {
    const result = validationResult(req);
    const hasErrors = !result.isEmpty();
    if (hasErrors) {
      res.status(400).send({ status: false, message: "errors", errors: result.errors });
    } else {
      agencies.create(req.body).then(async(response) => {
        if (response) {
          console.log(response)
          let ReqData = req.body.Client;
          ReqData.AgencyId=req.body.AgencyId;
          let Response = await CreateClient(ReqData);
          console.log(Response)
          res.status(Response.status).send({ status: true, message: Response.message});
        } else {
          res.status(400).send({ status: false, message: "errors", errors: error });
        }
      }).catch(err => {
        res.status(500).send({ status: false, message: err.message });
      });
    }
  } catch (e) {
    res.status(500).send({ status: false, message: e.message || "Error occurred" });
  }
};

exports.Update = async (req, res) => {
  try {
    const result = validationResult(req);
    const hasErrors = !result.isEmpty();
    if (hasErrors) {
      res.status(400).send({ status: false, message: "errors", errors: result.errors });
    } else {
      let query = {
        "ClientId": req.body.ClientId
      }
      let updatedData = {
        "$set": {
          "Name": req.body.Name,
          "Email": req.body.Email,
          "PhoneNumber": req.body.PhoneNumber,
          "TotalBill": req.body.TotalBill,
          "AgencyId": req.body.AgencyId
        }
      }
      clients.findOneAndUpdate(query, updatedData).then((updatedResponse) => {
        if (updatedResponse) {
          res.status(200).send({ status: true, message: "updated"});
        } else {
          res.status(500).send({ status: false, message: "errors", errors: result.errors });
        }
      })
    }
  } catch (e) {
    res.status(500).send({ status: false, message: e.message || "Error occurred" });
  }
};

exports.GetTopListedAgencies = async (req, res) => {
  try {
      clients.aggregate([
        {$sort:{"TotalBill": -1}},
        {$lookup:{from:"agencies",localField:"AgencyId",foreignField:"AgencyId",as:"agency"}},
        { $unwind : "$agency" },
        {$project:{
          AgencyName: "$agency.Name",
          ClientName: "$Name",
          TotalBill: "$TotalBill",
          _id:0
        }}
      ]).then((response) => {
        if (response) {
          res.status(200).send({ status: true, message: "success", top_clients_list: response});
        } else {
          res.status(500).send({ status: false, message: "errors"});
        }
      });
  } catch (e) {
    res.status(500).send({ status: false, message: e.message || "Error occurred" });
  }
};

async function CreateClient(req){
  return await clients.create(req).then((response) => {
    if (response) {
      return({ status: 200, message: "created"});
    } else {
      return({ status: 500, message: "errors"});
    }
  }).catch(err => {
    return({ status: 500, message: err.message });
  });;
}