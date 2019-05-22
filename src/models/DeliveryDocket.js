const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LotSchema = new Schema ({
  variety: { type: String, required: true },
  apiaryNumber: { type: String, required: true },
  waxPitBlock: { type: String, required: false },
  drumPoly: { type: String, required: false },
  ibc: { type: String, required: false },
  pail: { type: String, required: false },
  teSealInPlace: { type: Number, required: false },
  totalCount: { type: Number, required: true },
  yrMonthExtracted: { type: String, required: true },
  nearestTown: { type: String, required: false },
  markingsAndComments: { type: String, required: false },
  otcUsed: { type: Boolean, required: true }
});

const DeclarationSchema = new Schema({
  qaConditions: {type: Boolean, required: true},
  efbEvidence: {type: Boolean, required: true},
  afbEvidence: {type: Boolean, required: true},
  otcTreatment: {type: Boolean, required: true},
  otcTreatmentType: {type: String, required: true},
  otcTreatmentNumber: {type: Number, required: false},
  chemicalExposure: {type: Boolean, required: true},
  chemicalExposureDetail: {type: String, required: false},
  gmoExposure: {type: Boolean, required: true},
  gmoExposureDetail: {type: String, required: false},
  medicalGradeExposure: {type: Boolean, required: true},
  medicalGradeExposureDetail: {type: String, required: false},
  supplementalFeeding: {type: Boolean, required: true},
  supplementalFeedingDetail: {type: String, required: false}
});

const DeliveryDocketSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'user'},
  carrier: {type: String, required: true },
  brandNumber: {type: String, required: true},
  creationDate: {type: Date, required: true },
  lodgementDate: {type: Date, required: false },
  pickUpDate: {type: Date, required: true },
  freightPayableBy: {type: String, required: true },
  receivedByDate: {type: Date, required: false },
  lots: [LotSchema],
  declaration: DeclarationSchema
});

DeliveryDocketSchema.virtual('lotCount').get(function(){
  return this.lots.length;
});

const DeliveryDocket = mongoose.model('deliveryDocket', DeliveryDocketSchema);

module.exports = DeliveryDocket;