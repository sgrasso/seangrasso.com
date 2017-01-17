FROM gcr.io/google_appengine/nodejs

# Copy application code.
COPY ./server /app/

WORKDIR /app/server

# Install dependencies.
RUN npm --unsafe-perm install

# Set listening port
ENV PORT=3500

# Expose the port
EXPOSE 3500

# run the app
ENTRYPOINT ["npm", "start"]