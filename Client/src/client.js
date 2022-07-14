import { ApolloClient, InMemoryCache } from "@apollo/client";
import { split } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { HttpLink } from "@apollo/client";
// Setup the network "links"
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
import AsyncStorage from "@react-native-community/async-storage";

const httpLink = new HttpLink({
  uri: "http://localhost:5000",
});

// Create a WebSocket link:
const wsLink = new WebSocketLink({
  uri: "ws://localhost:5000/graphql",
  options: {
    reconnect: true,
    connectionParams: async () => {
      const token = await AsyncStorage.getItem("@ParishAuth:token");
      return {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      };
    },
  },
});

const authLink = setContext((_, { headers }) => {
  // return the headers to the context so httpLink can read them
  // const authToken = async () => {
  //   const token = await AsyncStorage.getItem("@ParishAuth:token");
  //   return {
  //     headers: {
  //       Authorization: token ? `Bearer ${token}` : "",
  //     },
  //   };
  // };
  return {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMjQ0MzRjNWIyYTVkMDBhZGU0MWU3MCIsImVtYWlsIjoicm9kcmlnb3NwaXNpbGFAZ21haWwuY29tIiwicGhvbmUiOiIrNTU0Mjk5OTM0NTYzMyIsImp3dGlkIjoiOTczNzFjNjAtZDcyMy0xMWVhLTllMDEtZjVmOTEzMTBhNWE1IiwiaWF0IjoxNTk2NjM1ODQ0LCJleHAiOjE2MjgxOTM0NDQsImp0aSI6Ijk3MzcxYzYwLWQ3MjMtMTFlYS05ZTAxLWY1ZjkxMzEwYTVhNSJ9.Q5FVkFd4uESUf-c8rqWDjF6iAgDgOXR-9NGmJzBGFPc`,
    },
  };
});

const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link: authLink.concat(link),
  cache: new InMemoryCache(),
  onError: ({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.map(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      );
    if (networkError) console.log(`[Network error]: ${networkError}`);
  },
});

export default client;

// import { ApolloClient, InMemoryCache } from "@apollo/client";
// import { split, HttpLink } from "@apollo/client/link/http";
// import { getMainDefinition } from "@apollo/client/utilities";
// import { WebSocketLink } from "@apollo/client/link/ws";
// import { setContext } from "@apollo/client/link/context";
// import AsyncStorage from "@react-native-community/async-storage";
// import { onError } from "@apollo/client/link/error";

// const httpLink = new HttpLink({
//   uri: "https://agenda-missa-backend.herokuapp.com/graphql",
//   options: {
//     lazy: true,
//     reconnect: true,
//     connectionParams: async () => {
//       const token = await AsyncStorage.getItem("@ParishAuth:token");
//       return {
//         headers: {
//           Authorization: token ? `Bearer ${token}` : "",
//         },
//       };
//     },
//   },
// });

// // const authLink = setContext(async (_, { headers }) => {
// //   // get the authentication token from local storage if it exists
// //   const token = await AsyncStorage.getItem("@ParishAuth:token");
// //   // return the headers to the context so httpLink can read them
// //   return {
// //     headers: {
// //       ...headers,
// //       authorization: token ? `Bearer ${token}` : "",
// //     },
// //   };
// // });

// const wsLink = new WebSocketLink({
//   uri: "wss://agenda-missa-backend.herokuapp.com/graphql",
//   options: {
//     lazy: true,
//     reconnect: true,
//     connectionParams: async () => {
//       const token = await AsyncStorage.getItem("@ParishAuth:token");
//       return {
//         headers: {
//           Authorization: token ? `Bearer ${token}` : "",
//         },
//       };
//     },
//   },
// });

// // const linkAuth = authLink.concat(httpLink);

// // The split function takes three parameters:
// //
// // * A function that's called for each operation to execute
// // * The Link to use for an operation if the function returns a "truthy" value
// // * The Link to use for an operation if the function returns a "falsy" value

// const splitLink = split(
//   ({ query }) => {
//     const definition = getMainDefinition(query);
//     return (
//       definition.kind === "OperationDefinition" &&
//       definition.operation === "subscription"
//     );
//   },
//   wsLink,
//   httpLink
// );
// const client = new ApolloClient({
//   link: splitLink,
//   // link: httpLink,
//   // link: httpLink,
//   cache: new InMemoryCache(),
//   onError: ({ graphQLErrors, networkError }) => {
//     if (graphQLErrors)
//       graphQLErrors.map(({ message, locations, path }) =>
//         console.log(
//           `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
//         )
//       );
//     if (networkError) console.log(`[Network error]: ${networkError}`);
//   },
// });

// export default client;
