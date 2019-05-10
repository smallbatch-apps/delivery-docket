const graphql = require('graphql');
const DeliveryDocket = require('../models/DeliveryDocket');
const User = require('../models/User');

const { GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLBoolean,
  GraphQLList,
  GraphQLNonNull
} = graphql;

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    name: { type: GraphQLString},
    email: { type: GraphQLString},
    phone: { type: GraphQLString},
    address: { type: GraphQLString}
  })
});

const LotType = new GraphQLObjectType({
  name: 'Lot',
  fields: () => ({
    variety: { type: GraphQLString },
    apiaryNumber: { type: GraphQLString },
    waxPitBlock: { type: GraphQLString },
    drumPoly: { type: GraphQLString },
    waxPitBlock: { type: GraphQLString },
    pail: { type: GraphQLString },
    teSealInPlace: { type: GraphQLBoolean },
    totalCount: { type: GraphQLInt },
    yrMonthExtracted: { type: GraphQLString },
    nearestTown: { type: GraphQLString },
    markingsAndComments: { type: GraphQLString },
    otcUsed: { type: GraphQLString },
  })
});

const DeclarationType = new GraphQLObjectType({
  name: 'Declaration',
  fields: () => ({
    qaConditions: {type: GraphQLBoolean},
    efbEvidence: {type: GraphQLBoolean},
    afbEvidence: {type: GraphQLBoolean},
    otcTreatment: {type: GraphQLBoolean},
    otcTreatmentBlanketFed: {type: GraphQLBoolean},
    otcTreatmentSpotFed: {type: GraphQLBoolean},
    otcTreatmentPercentage: {type: GraphQLInt},
    otcTreatmentNumber: {type: GraphQLInt},
    chemicalExposure: {type: GraphQLBoolean},
    chemicalExposureDetail: {type: GraphQLString},
    gmoExposure: {type: GraphQLBoolean},
    gmoExposureDetail: {type: GraphQLString},
    medicalGradeExposure: {type: GraphQLBoolean},
    medicalGradeExposureDetail: {type: GraphQLString},
    supplementalFeeding: {type: GraphQLBoolean},
    supplementalFeedingDetail: {type: GraphQLString}
  })
});

const DocketType = new GraphQLObjectType({
  name: 'Docket',
  fields: () => ({
    _id: { type: GraphQLString },
    carrier: {type: GraphQLString },
    brandNumber: {type: GraphQLString},
    lodgementDate: {type: GraphQLString },
    pickUpDate: {type: GraphQLString },
    freightPayableBy: {type: GraphQLString },
    receivedByDate: {type: GraphQLString },
    lotCount: {type: GraphQLInt},
    lots: {
      type: new GraphQLList(LotType),
      resolve(parentValue) {
        return parentValue.lots;
      }
    },
    declaration: {
      type: DeclarationType,
      resolve(parentValue) {
        return parentValue.declaration;
      }
    }
  })
});

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    addUser: {
      type: UserType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString)},
        email: { type: new GraphQLNonNull(GraphQLString)},
        phone: { type: new GraphQLNonNull(GraphQLString)},
        address: { type: new GraphQLNonNull(GraphQLString)},
      },
      async resolve(parentValue, args) {
        const user = new User(args);
        await user.save();
        return user;
      }
    },
    addDocket: {
      type: DocketType,
      args: {
        carrier: { type: new GraphQLNonNull(GraphQLString) },
        brandNumber: { type: new GraphQLNonNull(GraphQLString) },
        pickUpDate: {type: new GraphQLNonNull(GraphQLString) },
        freightPayableBy: {type: new GraphQLNonNull(GraphQLString) }
      },
      async resolve(parentValue, args) {
        const user = new User(args);
        await user.save();
        return user;
      }
    }
  })
});


const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    docket: {
      type: DocketType,
      args: { id: { type: GraphQLString } },
      async resolve(parentValue, args) {
        return await DeliveryDocket.findById(args.id);
      }
    },
    dockets: {
      type: new GraphQLList(DocketType),
      async resolve(parentValue, args) {
        return await DeliveryDocket.find({});
      }
    },
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      async resolve(parentValue, args) {
        return await User.findById(args.id);
      }
    }
  })
});

module.exports = new GraphQLSchema({query: RootQuery, mutation});