# 1. Start from an image that already has Linux + Node 24 installed
FROM node:24-alpine

# 2. Make an /app folder inside the image and cd into it
WORKDIR /app

# 3. Copy ONLY the dependency list first...
COPY package.json package-lock.json ./

# 4. ... and install. Docker caches this step, so it only re-runs
#    when package.json changes
RUN npm ci

# 5. Now copy the rest of your code
COPY . .

# 6. Build the produciton version of the site
RUN npm run build

# 7. Document the app listens on port 3000
EXPOSE 3000

# 8. The command that runs when the container starts
CMD ["npm", "start"]
