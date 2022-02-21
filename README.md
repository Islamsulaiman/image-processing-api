# **image-processing-api**

This project is part of advanced full-stack web development nanodegree by Udacity to process images via Express and typescript

# **What the project dose?**

This API take's a jpeg photo from the user and a width and height in px, then resize the original image to the target size.

# **How to setup the project?**

1. pull the repo.
2. run "npm install", to install all the needed dependencies.

# **How to run the API**

1. place your jpeg photo inside "./assets/ful" folder
2. run "npm run start" to start the server.
3. go to "http://localhost:3000/image/?filename=<your_image_name>&width=<target_width>&height=<target_height>"
4. Add your image name without the '.jpeg' extension.
5. after visiting this URL a resized version of your image will apear on your screen.
6. The resized image will be saved inside "./assets/thumb" folder to be cashed when requested twice.
7. run "npm run test" to run jasmine tests.
8. run "npm run lint" to run ESLint.
9. run "npm run prettier" to run prettier.

# **External dependencies**

1. Eslint
2. prettier
3. jasmine
4. TypeScript
5. nodemon
6. sepertest
7. express
8. sharp
9.

# **implementation**

1. index.ts have express and the server with using all the created routes.
2. "mainEndpoint.ts" this contains all the logic for (getting the query string, processing the images, reading the images back)
3. "test" folder, have all the unit testing for all the project using jasmine.
