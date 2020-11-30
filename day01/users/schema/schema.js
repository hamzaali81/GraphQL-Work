const graphql = require('graphql');
// const _= require('lodash')
const axios = require('axios');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema
} = graphql;

// const users = [
//     {id: '21', firstName: 'hamza',age: 34},
//     {id: '22', firstName: 'ali', age: 9},
//     {id: '23', firstName: 'ahmed',age: 12}

// ]

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: {
        id: {type: GraphQLString},
        firstName: {type: GraphQLString},
        age: {type: GraphQLInt}
    }

})



const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: {id: { type:GraphQLString }},
            resolve(parentValue, args){
                // return _.find(users, {id: args.id});

                return axios.get(`http://localhost:3000/users/${args.id}`)
                // .then(response => console.log(response)) // {data: {firstName: 'hamza'}}
                .then(resp => resp.data) // {data: {firstName: 'hamza'}}
            }
        }
    }
})


module.exports =  new GraphQLSchema ({
    query: RootQuery
})