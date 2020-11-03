# django-react-using-metadata

The main goal of this project is to use django models/serializers to create forms at React level.
The main advantage is that whenever developer changes the attributes of a model at django level, 
those will be automatically update at React. Generally developer need to update at two places
(Django and React). With this approach no need to update at React. For example,
 if developer update the max length of first name at django level,
it will automatically update at first name field in React.

Here React uses the django endpoint to get the form json which has configuration of fields 
like type, required, max_length , readonly .... React uses this information to render the 
appropriate field.

JSON example:
```json spaces=2 
{
  "username": {
    "type":"string",
    "required":true,
    "read_only":false,
    "label":"Username",
    "help_text":"Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.",
    "max_length":150
  },
  "email":{
    "type":"email",
    "required":false,
    "read_only":false,
    "label":"Email address",
    "max_length":254
  }
}
```

## How ro Run
### Django
Install requirements, run migrate and start server
```shell script
pip install -r requirements.txt
python manage.py migrate
python manage.py migrate runserver
```
Access api at 8000


### React
Go to my-app. Install node module and run application
```shell script
npm install
npm run start
```
Access application at 3000

### Using docker-compose
``` shell script
docker-compose build
docker-compose up
```
Access application/api at 8000

Further info contact - srikanth14895@gmail.com

