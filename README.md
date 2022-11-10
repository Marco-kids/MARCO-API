# Marco-API

### `npm run dev`
Runs the API in development mode.\
Open [http://localhost:8080](http://localhost:3000) to view it in your browser.

Requires `.env` file with following parameters:
| Parameter  | Description |
| ------------- | ------------- |
| PORT  | Port to run server on (default is 8080)  |
| DB_URL  | URI of MongoDB instance with DB name |
| MODELS_BUCKET | Name of the bucket to store files |
| DATABASE_NAME  | Name of the database of bucket |

## Models
**Obra**
| Property  | Type | Description |
| ------------- | ------------- | ----------- |
| nombre  | String | Name of art piece |
| autor  | String | Author of art piece |
| descripcion | String | Description of art piece |
| modelo  | String | Model link to download |
| longitud  | String | Location for AR iOS |
| latitud  | String | Location for AR iOS |

## Routes
| CRUD  | HTTP Verb | URL | Description |
| ------------- | ------------- | ----------- | -----------|
| READ  | GET | /api/obra | Returns JSON with all art pieces |
| READ  | GET | /api/models | Returns JSON with all files in Bucket |
| CREATE  | POST | /api/models | Creates an art piece (Obra) |

## Example with endpoint: `/api/obra`
```json
[
    {
        "_id": "636cb41b1495d3cd3e400bae",
        "nombre": "dodecaedro",
        "autor": "joe",
        "descripcion": "marco",
        "modelo": "http://192.168.1.66:8080/api/models/1668068376022-MARCO-KIDS-Dodecaedro.usdz",
        "longitud": "190",
        "latitud": "234",
        "__v": 0
    },
    {
        "_id": "636cb4f9e46a1666dff5d357",
        "nombre": "volcanica",
        "autor": "marco",
        "descripcion": "test",
        "modelo": "http://192.168.1.66:8080/api/models/1668068598227-MARCO-KIDS-Volcanica.usdz",
        "longitud": "190",
        "latitud": "234",
        "__v": 0
    },
    {
        "_id": "636cb549e46a1666dff5d378",
        "nombre": "pirinola",
        "autor": "marco",
        "descripcion": "test",
        "modelo": "http://192.168.1.66:8080/api/models/1668068678961-MARCO-KIDS-Pirinola.usdz",
        "longitud": "190",
        "latitud": "234",
        "__v": 0
    }
]
```
