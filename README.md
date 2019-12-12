# ElasticSearch Builder
A TypeScript builder for ElasticSearch (search body, index creation, etc.).


## :warning: IN DEVELOPMENT, DO NOT USE IN PRODUCTION :warning:
_This project currently does not support all versions of ElasticSearch or contain all the possible variables for building a complete and valid ES JSON output._

## Installation
```bash
npm i @convergence-finance/elasticsearch-builder
```

## Examples


### Search Query Body
```typescript
import ElasticSearchBuilder from "@convergence-finance/elasticsearch-builder"

const searchBody = ElasticSearchBuilder.instance()
    .buildSearchBody()
    .query()
        .bool()
            .mustNot()
                .match("isActive", true)
                .match("status", 10)
            .end()
        .end()
    .end()
    .build()
```

Output of `searchBody`:
```json
{
    "query": {
        "bool": {
            "must_not": [
                {
                    "match": {
                        "isActive": true
                    }
                },
                {
                    "match": {
                        "status": 10
                    }
                }
            ]
        }
    }
}
```

## Tests
```bash
npm run test
```


## License
This project is open-sourced software licensed under the [MIT](https://opensource.org/licenses/MIT) license.