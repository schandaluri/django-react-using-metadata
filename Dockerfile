FROM node:12-alpine AS static_files
ADD my-app /code
WORKDIR /code
RUN npm install
RUN PUBLIC_URL=/static/ npm run build

FROM python:3.7-alpine
RUN apk update && apk upgrade && apk add bash
ADD requirements.txt /code/requirements.txt
RUN pip install -r /code/requirements.txt
WORKDIR /code
ADD . /code
COPY --from=static_files /code/build /code/my-app/build
RUN python manage.py collectstatic --noinput -c
RUN chmod +x entrypoint.sh
ENTRYPOINT ["sh",  "entrypoint.sh"]
