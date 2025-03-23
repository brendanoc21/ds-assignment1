## Serverless REST Assignment - Distributed Systems.

__Name:__ Brendan O'Connor

__Demo:__ ... link to your YouTube video demonstration ......

### Context.

State the context you chose for your web API and detail the attributes of the DynamoDB table items, e.g.

Context: Movie Cast

Table item attributes:
+ MovieID - number  (Partition key)
+ ActorID - number  (Sort Key)
+ RoleName - string
+ RoleDescription - string
+ AwardsWon - List<string>
+ etc

### App API endpoints.

[ Provide a bullet-point list of the app's endpoints (excluding the Auth API) you have successfully implemented. ]
e.g.
 
+ POST /thing - add a new 'thing'.
+ GET /thing/{partition-key}/ - Get all the 'things' with a specified partition key.
+ GEtT/thing/{partition-key}?attributeX=value - Get all the 'things' with a specified partition key value and its attributeX satisfying the condition .....
+ etc


### Features.

#### Translation persistence (if completed)

[ Explain briefly your solution to the translation persistence requirement - no code excerpts required. Show the structure of a table item that includes review translations, e.g.

+ MovieID - number  (Partition key)
+ ActorID - number  (Sort Key)
+ RoleName - string
+ RoleDescription - string
+ AwardsWon - List<string>
+ Translations - ?
]

#### Custom L2 Construct (if completed)

[State briefly the infrastructure provisioned by your custom L2 construct. Show the structure of its input props object and list the public properties it exposes, e.g. taken from the Cognito lab,

Construct Input props object:
~~~
type AuthApiProps = {
 userPoolId: string;
 userPoolClientId: string;
}
~~~
Construct public properties
~~~
export class MyConstruct extends Construct {
 public  PropertyName: type
 etc.
~~~
 ]

#### Multi-Stack app (if completed)

[Explain briefly the stack composition of your app - no code excerpts required.]

#### Lambda Layers (if completed)

[Explain briefly where you used the Layers feature of the AWS Lambda service - no code excerpts required.]


#### API Keys. (if completed)

[Explain briefly how to implement API key authentication to protect API Gateway endpoints. Include code excerpts from your app to support this. ][]

~~~ts
// This is a code excerpt markdown 
let foo : string = 'Foo'
console.log(foo)
~~~

###  Extra (If relevant).

[ State any other aspects of your solution that use CDK/serverless features not covered in the lectures ]