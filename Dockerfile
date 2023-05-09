# Use a smaller base image
FROM node:17.4-alpine as base
WORKDIR /app
COPY package.json ./
COPY index.html ./
ARG REACT_APP_API_BASE_URL 
ENV REACT_APP_API_BASE_URL=$REACT_APP_API_BASE_URL
RUN npm install --production

# Copy only the necessary files for runtime
FROM base as runtime
COPY --from=base /app /app
ENV NODE_ENV=production \
    PORT=3000 \
    # Add other environment variables here
    # ...
    USER=node
USER $USER
CMD ["npm", "start"]